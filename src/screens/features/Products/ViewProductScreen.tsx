// @ts-nocheck

import ScreenHeader from '@src/components/ScreenHeader';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRoute} from '@react-navigation/native';
import {VendorModal} from '@src/realm/models/VendorModal';
import SalesWalaViewField from '@src/components/SalesWalaViewField/SalesWalaViewField';
import WhatsAppIcon from '@src/assets/svgs/WhatsappIcon';
import PhoneIcon from '@src/assets/svgs/PhoneIcon'


const ViewProductScreen = () => {
  const route = useRoute();


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

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}>
          <View style={{flex: 1}}>
            <SalesWalaViewField
              title="Contact Number"
              value={data.metadata.contactNumber}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
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
              <WhatsAppIcon
                style={{
                  flexWrap: 'wrap',
                  height: 40,
                  width: 40,
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
                justifyContent: 'flex-end',
                marginLeft: 10,
                // flex:1,
              }}>
              <PhoneIcon
                style={{
                  flexWrap: 'wrap',
                  height: 40,
                  width: 40,
                  justifyContent: 'flex-end',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <SalesWalaViewField title="Address" value={data.metadata.address} />

        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            // justifyContent:"space-between"
          }}>
          <View
            style={{
              marginRight: 15,
            }}>
            <SalesWalaViewField title="City" value={data.metadata.city} />
          </View>

          <SalesWalaViewField title="Pincode" value={data.metadata.pincode} />
        </View>
        {data.metadata.email && (
          <SalesWalaViewField title="Email" value={data.metadata.email} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewProductScreen;

