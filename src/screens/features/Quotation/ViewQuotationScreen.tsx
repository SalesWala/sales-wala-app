// @ts-nocheck

import ScreenHeader from '@src/components/ScreenHeader';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import SalesWalaButton from '@src/components/SalesWalaButton';
import { useGetColor } from '@src/hooks/useTheme';
import { useNavigation, useRoute } from '@react-navigation/native';

import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import WhatsAppIcon from '@src/assets/svgs/WhatsappIcon';
import PhoneIcon from '@src/assets/svgs/PhoneIcon'

import EditIcon from '@src/assets/svgs/EditIcon'
import TrashIcon from '@src/assets/svgs/TrashIcon';

import DownloadIcon from '@src/assets/svgs/DownloadIcon'
import { QuotationModal } from '@src/realm/models/QuotationModal';
import { formatToCurrencyNumber, parseServerDateToMoment } from '@src/utils';
import { useSalesWalaSelector } from '@src/redux/store';
import ModalLoading from '@src/components/ModalLoading/ModalLoading';
import { useState } from 'react';


const QuotationParticularView = ({ data }) => {

  const { productId, metadata } = data;
  const {
    price, quantity
  } = metadata

  const products = useSalesWalaSelector(state => state.products.data);
  const product = products.find(item => item.id === productId);
  return <View style={{ flexDirection: "row", }}>

    <SalesWalaText fontSize={12} fontWeight='500' style={{
      flex: 1,
      textAlign: "center",

    }}>
      {product?.metadata.name}
    </SalesWalaText>

    <SalesWalaText fontSize={12} fontWeight='500' style={{
      flex: 1,
      textAlign: "center",

    }}>
      {quantity} {product?.metadata.unit}
    </SalesWalaText>


    <SalesWalaText fontSize={12} fontWeight='500' style={{
      textAlign: "center",
      flex: 1,
    }}>
      {formatToCurrencyNumber(price)}
    </SalesWalaText>
  </View>
}

const ViewQuotationScreen = () => {
  const route = useRoute();




  //@ts-ignore
  const data: QuotationModal = route.params?.data;
  const { id, createdAt, vendorId } = data
  const vendors = useSalesWalaSelector(state => state.vendors.data);
  const vendor = vendors.find(item => item.id === vendorId);
  const shortUUID = id.split('-').slice(1, 4).join('-');

  //@ts-ignore
  const vendorMetadata = vendor?.metadata
  const { businessName, address, contactNumber } = vendorMetadata

  const primaryColor = useGetColor("primary")
  const borderColor = useGetColor("borderColor")
  const dangerColor = useGetColor("danger")
  // todo remove this 
  const TAX_PERCENT = 18;
  const navigator = useNavigation();

  const subTotal = data.quotationParticulars.reduce((accumulator, quotationParticular) => {
    const { price, quantity } = quotationParticular.metadata
    const sum = Number(price) * Number(quantity);
    return accumulator + sum
  }, 0);

  const taxTotal = TAX_PERCENT * subTotal / 100

  const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false);
  
  const [loadingMessage, setLoadingMessage] = useState("Converting To Order");

  const handleDownloadInvoice = () => {

  }

  const handleDeleteInvoice = () => {

  }

  const handleEditInvoice = () => {
    navigator.navigate('AddOrUpdateQuotationScreen', {
      isCreate: false,
      data,
    });
  }

  const handleConvertToOrder = () => {
    setIsLoadingModalVisible(true)

    // todo add convert to order
    setLoadingMessage("Converting To Order")
    setIsLoadingModalVisible(false)
  }


  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <ScreenHeader title={`Quotation`} />

      <ScrollView
        style={{

          marginTop: 10,
          paddingHorizontal: 20,
        }}>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <SalesWalaText fontSize={12} fontWeight='700' color='primary'>
              {parseServerDateToMoment(createdAt).format("MMM. DD,YYYY hh:mm a")}
            </SalesWalaText>
            <SalesWalaText fontSize={12} style={{ marginTop: 4 }} fontWeight='700' color='primary'>
              Invoice No. {shortUUID}
            </SalesWalaText>
          </View>

          <View style={{
            flexDirection: "row",
            
          }}>
            <TouchableOpacity onPress={handleDownloadInvoice}>
              <DownloadIcon stroke={primaryColor} strokeWidth={1.5} />

            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginHorizontal:5
              }}
              onPress={handleEditInvoice}>
              <EditIcon
                height={25}
                width={25}
                stroke={primaryColor} strokeWidth={1.1} />

            </TouchableOpacity>

            <TouchableOpacity onPress={handleDeleteInvoice}>
              <TrashIcon stroke={dangerColor} height={24} width={24}/>

            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <SalesWalaText fontSize={12} style={{ marginTop: 4 }} fontWeight='700' color='primary'>
            To: {businessName}
          </SalesWalaText>

          <SalesWalaText fontSize={12} style={{ marginTop: 4 }} fontWeight='700' color='primary'>
            Add: {address}
          </SalesWalaText>

          <View style={{ flexDirection: "row" }}>

            <SalesWalaText fontSize={12} style={{ marginTop: 4 }} fontWeight='700' color='primary'>
              Phone: {contactNumber}
            </SalesWalaText>

            <TouchableOpacity
              onPress={() => {
                const url = `https://wa.me/${contactNumber}`;
                Linking.openURL(url);
              }}
              style={{
                justifyContent: 'flex-end',
                marginLeft: 10,
              }}>
              <WhatsAppIcon
                style={{
                  flexWrap: 'wrap',
                  height: 15,
                  width: 15,
                  justifyContent: 'flex-end',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                const url = `tell://${contactNumber}`;
                Linking.openURL(url);
              }}
              style={{
                justifyContent: 'flex-end',
                marginLeft: 2,
                // flex:1,
              }}>
              <PhoneIcon
                height={12}
                width={12}
                style={{
                  height: 12,
                  width: 12,
                }}
              />
            </TouchableOpacity>

          </View>




        </View>

        <View style={{
          backgroundColor: primaryColor,
          height: 2,
          marginVertical: 20,
          width: "100%"
        }} />


        <View>
          <View style={{
            flexDirection: "row",
            backgroundColor: borderColor,
            paddingVertical: 2,
            borderRadius: 2,
            paddingHorizontal: 5,
            marginBottom: 5
          }}>
            <SalesWalaText fontSize={12} fontWeight='600' style={{
              flex: 1,
              textAlign: "center",

            }}>
              Particular
            </SalesWalaText>

            <SalesWalaText fontSize={12} fontWeight='600' style={{
              flex: 1,
              textAlign: "center",

            }}>
              Quantity
            </SalesWalaText>
            <SalesWalaText fontSize={12} fontWeight='600' style={{
              flex: 1,
              textAlign: "center",

            }}>
              Price
            </SalesWalaText>
          </View>
          <View style={{
            paddingHorizontal: 5,
          }}>

            {data.quotationParticulars.map((item, index) => {
              return <QuotationParticularView data={item} key={index} />
            })}
          </View>
        </View>

      </ScrollView>


      <View style={{
        paddingHorizontal: 20,
        marginVertical: 20
      }}>
        <View style={{
          backgroundColor: primaryColor,
          height: 2,
          marginVertical: 20,
          width: "100%"
        }} />

        <View style={{
          flexDirection: "row",
          marginTop: 5,

          justifyContent: "space-between"
        }}>
          <SalesWalaText fontSize={16} fontWeight='700'>
            Subtotal
          </SalesWalaText>

          <SalesWalaText fontSize={16} fontWeight='800'>
            {formatToCurrencyNumber(subTotal)}
          </SalesWalaText>
        </View>


        <View style={{
          flexDirection: "row",
          marginTop: 5,

          justifyContent: "space-between"
        }}>
          <SalesWalaText fontSize={16} fontWeight='700'>
            Tax @ {TAX_PERCENT}%
          </SalesWalaText>

          <SalesWalaText fontSize={16} fontWeight='800'>
            {formatToCurrencyNumber(taxTotal)}
          </SalesWalaText>
        </View>


        <View style={{
          backgroundColor: borderColor,
          height: 1,
          marginVertical: 5,
          width: "100%"
        }} />
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",

        }}>
          <SalesWalaText fontSize={20} fontWeight='700'>
            Total
          </SalesWalaText>

          <SalesWalaText fontSize={20} fontWeight='800'>
            {formatToCurrencyNumber(taxTotal + subTotal)}
          </SalesWalaText>
        </View>


        <SalesWalaButton
          onPress={handleConvertToOrder}
          text={"Convert To Order"} />

      </View>

      <ModalLoading
        title={loadingMessage}
        visible={isLoadingModalVisible}
      />

    </SafeAreaView>
  );
};

export default ViewQuotationScreen;

