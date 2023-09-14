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
import {useEffect, useState} from 'react';
import {useGetColor} from '@src/hooks/useTheme';
import AddFabButton from '@src/components/AddFabButton/AddFabButton';
import NoContent from '@src/components/NoContent/NoContent';
import {useNavigation} from '@react-navigation/native';
import {VendorModal} from '@src/realm/models/VendorModal';

import {useRealm, useQuery as useRealmQuery} from '@realm/react';
import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import {useSelector} from 'react-redux';
import {useAppSelector} from '@src/redux/store';
import SalesWalaAccordion from '@src/components/SalesWalaAccordion/SalesWalaAccordion';
import BackIcon from '@src/assets/svgs/BackIcon';
import ShowIcon from '@src/assets/svgs/ShowIcon';
import EditIcon from '@src/assets/svgs/EditIcon';
import BoxIcon from '@src/assets/svgs/BoxIcon';
import WhatsAppIcon from '@src/assets/svgs/WhatsappIcon';
import PhoneIcon from '@src/assets/svgs/PhoneIcon'



interface PartiesListProps {
  data: VendorModal[];
}

interface OnePartyItemProps {
  data: VendorModal;
  isExpanded?: boolean;
}

const OnePartyItemSecondaryView = ({data}: OnePartyItemProps) => {
  const metadata: any = data.metadata;

  const primary = useGetColor('primary');
  const successColor = useGetColor('success');

  const navigator = useNavigation();

  return (
    <View
      style={{
        borderTopWidth: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderWidth: 1.5,
        borderRadius: 20,

        borderColor: successColor,
      }}>
      <View
        style={{
          borderTopColor: 'rgba(0, 0, 0, 0.25)',
          borderTopWidth: 0.5,
          paddingVertical: 8,
          marginHorizontal: 5,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            //@ts-ignore
            navigator.navigate('ViewVendorScreen', {
              data,
            });
          }}
          style={{
            borderRadius: 8,
            borderColor: 'rgba(0, 0, 0, 0.25)',
            borderWidth: 0.5,
            padding: 5,
            flex: 1,
            marginHorizontal: 5,

            alignSelf: 'baseline',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <ShowIcon color={successColor} />
          <SalesWalaText color={successColor} fontSize={12} fontWeight="500">
            View Party
          </SalesWalaText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            //@ts-ignore
            navigator.navigate('AddOrUpdatePartyScreen', {
              isCreate: false,
              data,
            });
          }}
          style={{
            borderRadius: 8,
            borderColor: 'rgba(0, 0, 0, 0.25)',
            borderWidth: 0.5,
            flex: 1,
            marginHorizontal: 5,
            padding: 5,
            alignSelf: 'baseline',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <EditIcon color={successColor} />
          <SalesWalaText color={successColor} fontSize={12} fontWeight="500">
            Edit Party
          </SalesWalaText>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderRadius: 8,
            borderColor: 'rgba(0, 0, 0, 0.25)',
            borderWidth: 0.5,
            flex: 1,
            marginHorizontal: 5,

            padding: 5,
            alignSelf: 'baseline',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <BoxIcon color={successColor} />
          <SalesWalaText color={successColor} fontSize={12} fontWeight="500">
            Orders
          </SalesWalaText>
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderTopColor: 'rgba(0, 0, 0, 0.25)',
          borderTopWidth: 0.5,
          paddingVertical: 8,
          marginHorizontal: 5,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            const url = `tell://${metadata.contactNumber}`;
            Linking.openURL(url);
          }}
          style={{
            borderRadius: 8,
            borderColor: 'rgba(0, 0, 0, 0.25)',
            borderWidth: 0.5,
            padding: 5,
            flex: 1,
            marginHorizontal: 5,

            alignSelf: 'baseline',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <PhoneIcon height={25} width={25} style={{}} />
          <SalesWalaText color={successColor} fontSize={12} fontWeight="500">
            Call
          </SalesWalaText>
        </TouchableOpacity>

        <TouchableOpacity

                onPress={() => {
            const url = `https://wa.me/${metadata.contactNumber}`;
            Linking.openURL(url);
          }}
          style={{
            borderRadius: 8,
            borderColor: 'rgba(0, 0, 0, 0.25)',
            borderWidth: 0.5,
            flex: 1,
            marginHorizontal: 5,

            padding: 5,
            alignSelf: 'baseline',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <WhatsAppIcon
            style={{
              height: 25,
              width: 25,
            }}
          />
          <SalesWalaText color={successColor} fontSize={12} fontWeight="500">
            Whatsapp
          </SalesWalaText>
        </TouchableOpacity>


            <View style={{ flex: 1 }} />
      </View>
    </View>
  );
};

const OnePartyItemPrimaryView = ({data, isExpanded}: OnePartyItemProps) => {
  const metadata: any = data.metadata;

  const primary = useGetColor('primary');
  const successColor = useGetColor('success');

  const expandedStyle = {
    borderWidth: 1.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: successColor,
  };

  const nonExpandedStyle = {
    borderWidth: 0.5,
    borderRadius: 20,
  };

  return (
    <View
      style={[
        {
          padding: 8,
          marginTop: 5,
          borderColor: 'rgba(0, 0, 0, 0.25)',

          flexDirection: 'row',
        },
        isExpanded ? expandedStyle : nonExpandedStyle,
      ]}>
      <View
        style={{
          backgroundColor: primary,
          borderRadius: 10,
          // padding:8,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          height: 50,
          width: 50,
        }}>
        <SalesWalaText color="#fff" fontWeight="600" fontSize={25}>
          {metadata.businessName[0]}
        </SalesWalaText>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
        <View style={{justifyContent: 'center'}}>
          <SalesWalaText
            color="rgba(36, 36, 36, 1)"
            fontWeight="600"
            fontSize={16}>
            {metadata.businessName}
          </SalesWalaText>

          <SalesWalaText
            color="rgba(36, 36, 36, 1)"
            fontWeight="500"
            fontSize={10}>
            {metadata.contactPersonName}
          </SalesWalaText>

          <SalesWalaText color={primary} fontWeight="400" fontSize={10}>
            Address: {metadata.address}
          </SalesWalaText>
          <SalesWalaText color={primary} fontWeight="400" fontSize={10}>
            Phone: {metadata.contactNumber}
          </SalesWalaText>
        </View>
      </View>

      <View
        style={{
          transform: [{rotate: isExpanded ? '90deg' : '270deg'}],
          alignContent: 'flex-end',
          // alignItems: "flex-end",
          justifyContent: 'center',
          marginRight: 5,
        }}>
        <BackIcon stroke={'#242424'} />
      </View>
    </View>
  );
};

const OnePartyItem = ({data}: OnePartyItemProps) => {
  const metadata: any = data.metadata;

  const primary = useGetColor('primary');

  const [isExpanded, setIsExpanded] = useState(false);
  const navigator = useNavigation();

  return (
    <SalesWalaAccordion
      onExpandChange={setIsExpanded}
      primaryContent={
        <OnePartyItemPrimaryView data={data} isExpanded={isExpanded} />
      }
      secondaryContent={<OnePartyItemSecondaryView data={data} />}
    />
  );
};
const PartiesList = ({data}: PartiesListProps) => {
  return (
    <FlatList
      data={data}
      style={{
        marginHorizontal: 20,
        marginBottom: 20,
      }}
      renderItem={({item}) => <OnePartyItem data={item} />}
      keyExtractor={item => item.id}
    />
  );
};


const PartiesScreen = () => {
  const navigator = useNavigation();

  const items = useAppSelector(state => state.vendors.data);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <ScreenHeader title="Parties" />

      {items.length == 0 ? (
        <NoContent contentName="Parties" />
      ) : (
        <PartiesList data={items} />
      )}

      <AddFabButton
        onPress={() => {
          // @ts-ignore
          navigator.navigate('AddOrUpdatePartyScreen', {
            isCreate: true,
          });
        }}
      />
    </SafeAreaView>
  );
};

export default PartiesScreen;

