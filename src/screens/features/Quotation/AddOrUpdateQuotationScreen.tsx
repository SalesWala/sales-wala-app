import ScreenHeader from '@src/components/ScreenHeader';
import { Alert, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import SalesWalaButton from '@src/components/SalesWalaButton';
import { createRef, useEffect, useRef, useState } from 'react';
import { useGetColor } from '@src/hooks/useTheme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CreateQuotation, CreateVendor, UpdateVendor } from '@src/apollo/queries/backend-queries';
import { useObject, useRealm } from '@realm/react';
import { useDispatch } from 'react-redux';
import { addVendor, updateVendor } from '@src/redux/slices/vendorSlice';
import { useToast } from 'react-native-toast-notifications';
import { VendorModal } from '@src/realm/models/VendorModal';
import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useAppSelector } from '@src/redux/store';
import PlusIcon from '@src/assets/svgs/PlusIcon';
import InvoiceItemView from '@src/components/InvoiceItemView/InvoiceItemView';
import { genUID } from '@src/utils';
import { QuotationModal } from '@src/realm/models/QuotationModal';








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
  const parties = useAppSelector((state) => state.vendors.data)

  const partiesSugesstion = parties.map(item => ({
    id: item.id,

    //@ts-ignore
    title: item.metadata.businessName
  }))
  const [selectedClientId, setSelectedClientId] = useState<string>()
  const infoColor = useGetColor("info")
  const subtleColor = useGetColor("textSubtle")

  const [clientInputError, setClientInputError] = useState("")

  const [createQuotationMutation] = useMutation(CreateQuotation, {
    errorPolicy: 'all',
  });

  const [updateVendorMutation] = useMutation(UpdateVendor, {
    errorPolicy: 'all',
  });



  const [invoiceItems, setInvoiceItems] = useState([{
    id: genUID(5),
    reference: createRef(),
    product: "",
    quantity: "0",
    price: "0",
    totalAmount: "0"
  }])

  const [totalAmountSum, setTotalAmountSum] = useState(0)

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });

  const validateForm = () => {
    let isValid = true

    if (!selectedClientId) {
      setClientInputError("Please Select Party");
      return false
    }
    for (let item of invoiceItems) {
      //@ts-ignore
      isValid = item.reference.current.validate()
      console.log({ isValid })
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

        payload.quotationParticulars = JSON.stringify(payload.quotationParticulars )
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
        toast.show(`Successfully Updated Quotation`, {
          type: 'success',
          placement: 'bottom',
          duration: 2000,
          animationType: 'slide-in',
        });

        dispatch(updateVendor(JSON.stringify(data)));

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
      console.log("handleCreateQuotation",data)
      await addOrUpdateQuotationToDB(data, true);
    }
  };

  const handleUpdateQuotation = async (data: any) => {
    const resp = await updateVendorMutation({
      variables: {
        ...data,
        id: vendor.id,
      },
    });

    if (resp.errors) {
      //handle error todo
      console.log('handleUpdateQuotationError', JSON.stringify(resp.errors));
    } else {
      const data = resp.data.updateVendor;
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
            productId: quotationItem.product,
            metadata: JSON.stringify({
              quantity: quotationItem.quantity,
              price:quotationItem.price,
            })
          }
          quotationParticulars.push(payload)
        }
        const data = {
          metadata: JSON.stringify({}),
          vendorId: selectedClientId,
          quotationParticulars
        }
        
        await handleCreateQuotation(data)
      } catch (err) {
        console.error("saasasass")
      }
      setLoading(false)

    }

  
  };

  const handleUpdateInvoiceData = (id: string, price: string, finalAmount: string, quantity: string, selectedProductId: string) => {

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
            <SalesWalaText fontSize={14} fontWeight='600'>
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
                  paddingLeft: 18,
                  fontFamily: "poppins"
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
                <SalesWalaText fontSize={14} fontWeight='600' color='info'>
                  Add Party
                </SalesWalaText>
              </TouchableOpacity>}
              inputContainerStyle={{
                borderRadius: 10,
                backgroundColor: "#f5f5f5",
                borderWidth: .5,
                borderStyle: "solid",
                borderColor: subtleColor

              }}
              onSelectItem={(client) => {
                if (client) {
                  setSelectedClientId(client.id)
                  setClientInputError("")
                }
              }}
              dataSet={partiesSugesstion}
            />

            <SalesWalaText fontSize={12} fontWeight="700" color="danger">
              {clientInputError}
            </SalesWalaText>
          </View>



          <View style={{ marginTop: 10 }}>


            {
              invoiceItems.map((item,) => {
                return <InvoiceItemView key={item.id}
                  ref={item.reference}
                  onUpdateData={handleUpdateInvoiceData}
                  onPressDelete={handleDeleteInvoiceItem} id={item.id} product={null} quantity={0} price={0} totalAmount={0} />
              })
            }



          </View>
          <TouchableOpacity

            onPress={handleAddInvoiceItem}
            style={{
              alignContent: "flex-end",
              alignItems: "flex-end",
              marginLeft: 5,
              backgroundColor: infoColor,
              alignSelf: "flex-end",
              marginTop: 5,
              borderRadius: 50,

            }}>
            <PlusIcon height={25} width={25} stroke={"#fff"} strokeWidth={2} />
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
          Total Amount : {USDollar.format(totalAmountSum)}
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
