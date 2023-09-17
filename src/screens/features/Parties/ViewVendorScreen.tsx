// @ts-nocheck

import ScreenHeader from '@src/components/ScreenHeader';
import {
  FlatList,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SalesWalaButton from '@src/components/SalesWalaButton';
import { useEffect, useState } from 'react';
import { useGetColor } from '@src/hooks/useTheme';
import AddFabButton from '@src/components/AddFabButton/AddFabButton';
import NoContent from '@src/components/NoContent/NoContent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VendorModal } from '@src/realm/models/VendorModal';

import { useRealm, useQuery as useRealmQuery } from '@realm/react';
import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import SalesWalaViewField from '@src/components/SalesWalaViewField/SalesWalaViewField';
import WhatsAppLine from '@src/assets/svgs/WhatsAppLine';
import PhoneIcon from '@src/assets/svgs/PhoneIcon'


const ViewVendorScreen = () => {
  const route = useRoute();

  const navigator = useNavigation();

  //@ts-ignore
  const data: VendorModal = route.params?.data;

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <ScreenHeader title={data.metadata.businessName} />

      <ScrollView
        style={{
          paddingHorizontal: 20,
          marginTop: 10,
        }}>
        <SalesWalaViewField
          title="Business Name"
          value={data.metadata.businessName}
        />

        <SalesWalaViewField
          title="Contact Person Name"
          value={data.metadata.contactPersonName}
        />



        <SalesWalaViewField title="Address" value={data.metadata.address} />

        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: "space-between"
          }}>
          <View
            style={{
            }}>
            <SalesWalaViewField title="City" value={data.metadata.city} />
          </View>

          <SalesWalaViewField title="Pincode" value={data.metadata.pincode} />

          <SalesWalaViewField
            title="Contact Number"
            value={data.metadata.contactNumber}
          />
        </View>
        {data.metadata.email && (
          <SalesWalaViewField title="Email" value={data.metadata.email} />
        )}


        <View style={{marginTop:8}}>
          <SalesWalaText fontSize={14} fontWeight="500" >
            Direct Contact
          </SalesWalaText>
        <View
          style={{
            flexDirection: "row",
              marginBottom: 5,
            
            // justifyContent: "center",
            marginTop:8
          }}>
          

          <TouchableOpacity
            onPress={() => {
              const url = `https://wa.me/${data.metadata.contactNumber}`;
              Linking.openURL(url);
            }}
            style={{
              justifyContent: 'flex-end',
              marginLeft: 10,

            }}>
            <WhatsAppLine
              height={30}
              width={30}
              style={{
                flexWrap: 'wrap',

                justifyContent: 'flex-end',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const url = `tell://${data.metadata.contactNumber}`;
              Linking.openURL(url);
            }}
            style={{
              justifyContent: 'center',
              marginLeft: 10,
              // flex:1,

            }}>
            <PhoneIcon
              strokeWidth={2}
              height={25}
              width={25}
              style={{
                flexWrap: 'wrap',

                justifyContent: 'center'
              }}
            />
          </TouchableOpacity>
        </View>
    </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewVendorScreen;

