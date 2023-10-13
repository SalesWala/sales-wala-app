import ScreenHeader from '@src/components/ScreenHeader';
import { Alert, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import SalesWalaButton from '@src/components/SalesWalaButton';
import { Key, Ref, createRef, useEffect, useRef, useState } from 'react';
import { useGetColor } from '@src/hooks/useTheme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CreateQuotation, UpdateQuotation } from '@src/apollo/queries/backend-queries';
import { useObject, useRealm } from '@realm/react';
import { useDispatch } from 'react-redux';
import { addVendor, updateVendor } from '@src/redux/slices/vendorSlice';
import { useToast } from 'react-native-toast-notifications';
import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useSalesWalaSelector } from '@src/redux/store';
import PlusIcon from '@src/assets/svgs/PlusIcon';
import InvoiceItemView from '@src/components/InvoiceItemView/InvoiceItemView';
import { formatToCurrencyNumber, genUID } from '@src/utils';
import { QuotationModal } from '@src/realm/models/QuotationModal';
import AddIcon from '@src/assets/svgs/AddIcon';








const AddOrUpdateQuotationScreen = () => {
  const route = useRoute();

  // @ts-ignore
  const isForCreate = route.params.isCreate;

  const [isLoading, setLoading] = useState(false);

  //@ts-ignore
  const quotation = route.params.data;
  const quotationDbObject = quotation && useObject(QuotationModal, quotation.id);
  const realm = useRealm();
  const dispatch = useDispatch();
  const toast = useToast();
  const navigator = useNavigation();
  const parties = useSalesWalaSelector((state) => state.vendors.data)

  const partiesSugesstion = parties.map(item => ({
    id: item.id,

    //@ts-ignore
    title: item.metadata.businessName
  }))

  const [selectedClientId, setSelectedClientId] = useState<string>()
  const infoColor = useGetColor("info")
  const borderColor = useGetColor("borderColor")
  const primaryColor = useGetColor("primary")

  const [clientInputError, setClientInputError] = useState("")

  const [createQuotationMutation] = useMutation(CreateQuotation, {
    errorPolicy: 'all',
  });

  const [updateQuotationMutation] = useMutation(UpdateQuotation, {
    errorPolicy: 'all',
  });


  const [totalAmountSum, setTotalAmountSum] = useState(0)
  const preSelectedClientId: string | object = quotation && quotation.vendorId ? quotation.vendorId : ""




  const [invoiceItems, setInvoiceItems] = useState<any>([])

  const [deletedParticularsIds, setDeletedParticularsIds] = useState<string[]>([])

  useEffect(() => {
    if (!isForCreate && quotation) {
      setSelectedClientId(quotation.vendorId);

      const _invoiceItems: any = [];

      for (const quotationParticular of quotation.quotationParticulars) {
        const totalAmount = Number(quotationParticular.metadata.quantity) * Number(quotationParticular.metadata.price)
        _invoiceItems.push({
          ...quotationParticular,
          reference: createRef(),
          product: quotationParticular.productId,
          quantity: quotationParticular.metadata.quantity,
          price: quotationParticular.metadata.price,
          totalAmount: totalAmount.toString(),

        })
      }

      setInvoiceItems([..._invoiceItems])
    } else {

      setInvoiceItems([{
        id: genUID(5),
        reference: createRef(),
        product: "",
        quantity: "0",
        price: "0",
        totalAmount: "0"
      }])
    }
  }, [isForCreate, quotation])



  const validateForm = () => {
    let isValid = true

    if (!selectedClientId) {
      setClientInputError("Please Select Party");
      return false
    }
    for (let item of invoiceItems) {
      //@ts-ignore
      isValid = item.reference.current.validate()
      if (!isValid) {
        return
      }

    }
    return isValid
  };

  const addOrUpdateQuotationToDB = async (data: any, isAdd: boolean) => {
    if (isAdd) {
      realm.write(() => {
        const payload = {
          ...data
        }

        payload.quotationParticulars = JSON.stringify(payload.quotationParticulars)
        realm.create('Quotation', payload);
        // dispatch(addVendor(JSON.stringify(data)));
        toast.show(`Successfully Created Quotation`, {
          type: 'success',
          placement: 'bottom',
          duration: 2000,
          animationType: 'slide-in',
        });

        navigator.goBack();
      });
    } else if (quotation) {
      realm.write(() => {

        // @ts-ignore
        quotationDbObject.updatedAt = data.updatedAt;
        quotationDbObject.metadata = data.metadata;
        quotationDbObject.createdAt = data.createdAt;
        quotationDbObject.vendorId = data.vendorId;
        quotationDbObject.hasConvertedToOrder = data.hasConvertedToOrder?data.hasConvertedToOrder:false;
        quotationDbObject.orderState = data.orderState;
        quotationDbObject.quotationParticulars = JSON.stringify(data.quotationParticulars)

        toast.show(`Successfully Updated Quotation`, {
          type: 'success',
          placement: 'bottom',
          duration: 2000,
          animationType: 'slide-in',
        });

        // dispatch(updateVendor(JSON.stringify(data)));

        navigator.goBack();
      });
    }
  };

  const handleCreateQuotation = async (data: any) => {
    const resp = await createQuotationMutation({
      variables: {
        ...data,
      },
    });
    if (resp.errors) {
      //handle error todo
      console.error('handleCreateQuotationError', resp.errors);
    } else {
      const data = resp.data.createQuotation;
      delete data.__typename;
      await addOrUpdateQuotationToDB(data, true);
    }
  };

  const handleUpdateQuotation = async (data: any) => {
    const resp = await updateQuotationMutation({
      variables: {
        ...data,
      },
    });

    console.log("handleUpdateQuotation", JSON.stringify(resp.data))
    if (resp.errors) {
      //handle error todo
      console.error('handleUpdateQuotationError', JSON.stringify(resp.errors));
    } else {
      const data = resp.data.updateQuotation;
      delete data.__typename;
      await addOrUpdateQuotationToDB(data, false);
    }
  };

  const handleSubmit = async () => {
    const isValid = validateForm();

    if (isValid) {
      setLoading(true)

      try {
        const quotationParticulars: any[] = []

        for (let quotationItem of invoiceItems) {
          const payload = {
            id: quotationItem.id ? quotationItem.id : "",
            productId: quotationItem.product,
            metadata: JSON.stringify({
              quantity: quotationItem.quantity,
              price: quotationItem.price,
            })
          }
          quotationParticulars.push(payload)
        }


        if (isForCreate) {
          const data = {
            metadata: JSON.stringify({}),
            vendorId: selectedClientId,
            quotationParticulars
          }
          await handleCreateQuotation(data)

        } else {

          const finalModifiedParticulars: any[] = [];
          const finalAddedParticulars: any[] = [];
          for (const quotationParticular of quotationParticulars) {
            if (quotationParticular.id.length === 5) {
              finalAddedParticulars.push(quotationParticular)
            } else {
              finalModifiedParticulars.push(quotationParticular)
            }
          }

          const data = {
            id: quotation.id,
            metadata: JSON.stringify({}),
            deletedParticularsIds,
            modifiedParticulars: finalModifiedParticulars,
            addedParticulars: finalAddedParticulars
          }

          await handleUpdateQuotation(data)
        }
      } catch (err) {
        console.error("handleSubmit,quotation", err)
      }
      setLoading(false)

    }


  };

  const handleUpdateInvoiceData = (id: string, price: string, finalAmount: string, quantity: string, selectedProductId: string | null) => {

    let totalSum = 0;
    const items = [...invoiceItems]
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        items[i].price = price;
        items[i].totalAmount = finalAmount;
        items[i].quantity = quantity;
        items[i].product = selectedProductId
      }
      totalSum += Number(items[i].totalAmount)

    }

    setTotalAmountSum(totalSum)
    setInvoiceItems(items)
  }




  const handleAddInvoiceItem = () => {
    const invoiceItem = {
      id: genUID(5),
      product: "",
      quantity: "0",
      price: "0",
      reference: createRef(),
      totalAmount: "0",

    }

    setInvoiceItems([...invoiceItems, invoiceItem])
  }


  const handleDeleteInvoiceItem = (id: string) => {
    const items = [...invoiceItems]


    if (items.length == 1) {
      Alert.alert("Can't Delete Last Item")
      return
    }
    const finalArray: any[] = []
    let totalSum = 0;

    for (let item of items) {
      if (item.id !== id) {
        finalArray.push(item)
        totalSum += Number(item.totalAmount)
      }
    }
    setDeletedParticularsIds([...deletedParticularsIds, id])
    setTotalAmountSum(totalSum)
    setInvoiceItems(finalArray)
  }


  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <ScreenHeader
        title={
          isForCreate
            ? 'Create Quotation'
            : `Update Quotation`
        }
      />
      <ScrollView
        style={{
          paddingHorizontal: 20,
          // flex: 1,
          height: "100%",
          marginVertical: 15
        }}>




        <View style={{ marginTop: 10 }}>

          <View>
            <SalesWalaText fontSize={12} fontWeight='500' style={{ marginBottom: 4 }}
            >
              Select Party
            </SalesWalaText>

            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={false}

              renderItem={(item) => {
                return <SalesWalaText fontWeight='500' fontSize={14} style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 12,
                }}>{item.title}</SalesWalaText>
              }}

              textInputProps={{
                placeholder: 'Select Party',
                autoCorrect: false,
                autoCapitalize: 'none',
                style: {
                  fontWeight: "600",
                  paddingLeft: 18,
                  fontFamily: 'inter',

                },
              }}

              EmptyResultComponent={<TouchableOpacity
                onPress={() => {
                  //@ts-ignore
                  navigator.navigate('AddOrUpdatePartyScreen', {
                    isCreate: true,
                  });
                }}
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  flexDirection: "row"
                }}>

                <PlusIcon height={20} width={20} stroke={infoColor} strokeWidth={2} />
                <SalesWalaText
                  fontSize={14} fontWeight='600' color='info'>
                  Add Party
                </SalesWalaText>
              </TouchableOpacity>}

              inputContainerStyle={{
                borderRadius: 10,

                backgroundColor: "#fff",
                borderWidth: .5,
                borderStyle: "solid",
                borderColor: borderColor

              }}
              onSelectItem={(client) => {
                if (client) {
                  setSelectedClientId(client.id)
                  setClientInputError("")
                }
              }}
              initialValue={preSelectedClientId}
              dataSet={partiesSugesstion}
            />

            <SalesWalaText fontSize={12} fontWeight="700" color="danger">
              {clientInputError}
            </SalesWalaText>
          </View>



          <View style={{ marginTop: 10 }}>


            {
              invoiceItems.map((item: {
                product: string | null; id: any | undefined; reference: Ref<unknown> | undefined; quantity: string; price: string; totalAmount: string;
              },) => {
                return <InvoiceItemView
                  key={item.id}
                  ref={item.reference}
                  onUpdateData={handleUpdateInvoiceData}
                  onPressDelete={handleDeleteInvoiceItem}
                  id={item.id}
                  preProductId={item.product}
                  qtyValue={item.quantity}
                  priceValue={item.price}
                  totalAmountValue={item.totalAmount}
                />
              })
            }



          </View>
          <TouchableOpacity

            onPress={handleAddInvoiceItem}
            style={{
              alignContent: "flex-end",
              alignItems: "flex-end",
              marginLeft: 5,
              backgroundColor: primaryColor,
              alignSelf: "flex-end",
              marginTop: 5,
              borderRadius: 50,

            }}>
            <AddIcon height={25} width={25} stroke={"#fff"} color="#fff" strokeWidth={2} />
          </TouchableOpacity>


        </View>
      </ScrollView>
      <View style={{
        marginHorizontal: 10,
        marginVertical: 10
      }}>
        <SalesWalaText fontSize={12} fontWeight='600' style={{
          alignContent: "flex-end",
          alignSelf: "flex-end",
          marginRight: 10,
        }}>
          Total Amount : {formatToCurrencyNumber(totalAmountSum)}
        </SalesWalaText>
        <SalesWalaButton

          isLoading={isLoading}
          text={isForCreate ? 'Create Quotation' : 'Update Quotation'}
          onPress={() => {
            handleSubmit();
          }}
        />


      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    fontWeight: '400',
    fontSize: 16,
    marginTop: 10,
  },
});
export default AddOrUpdateQuotationScreen
