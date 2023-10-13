//@ts-nocheck
import ScreenHeader from '@src/components/ScreenHeader';
import {
  FlatList,
  Image,
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
import quotationIcon from "@src/assets/pngs/quotation.png"

import {useObject, useRealm, useQuery as useRealmQuery} from '@realm/react';
import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import {useSelector} from 'react-redux';
import {useSalesWalaSelector} from '@src/redux/store';
import SalesWalaAccordion from '@src/components/SalesWalaAccordion/SalesWalaAccordion';
import BackIcon from '@src/assets/svgs/BackIcon';
import ShowIcon from '@src/assets/svgs/ShowIcon';
import EditIcon from '@src/assets/svgs/EditIcon';
import TrashIcon from '@src/assets/svgs/TrashIcon';

import BoxIcon from '@src/assets/svgs/BoxIcon';
import WhatsAppIcon from '@src/assets/svgs/WhatsappIcon';
import PhoneIcon from '@src/assets/svgs/PhoneIcon'
import { QuotationModal } from '@src/realm/models/QuotationModal';
import { VendorModal } from '@src/realm/models/VendorModal';
import { parseServerDateToMoment } from '@src/utils';



interface PartiesListProps {
  data: QuotationModal[];
}

interface OnePartyItemProps {
  data: QuotationModal;
  isExpanded?: boolean;
}

const OnePartyItemSecondaryView = ({data}: OnePartyItemProps) => {
  const metadata: any = data.metadata;

  const primary = useGetColor('primary');
  const successColor = useGetColor('success');
  const dangerColor = useGetColor('danger');

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
            navigator.navigate('ViewQuotationScreen', {
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
            View 
          </SalesWalaText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            //@ts-ignore
            navigator.navigate('AddOrUpdateQuotationScreen', {
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
            Edit
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
          <TrashIcon stroke={dangerColor}  height={28} width={28}/>
          <SalesWalaText color={dangerColor} fontSize={12} fontWeight="500">
            Delete
          </SalesWalaText>
        </TouchableOpacity>


        
   
      </View>

  
    </View>
  );
};

const OnePartyItemPrimaryView = ({ data, isExpanded }: OnePartyItemProps) => {
  const { id, metadata,vendorId,createdAt } = data;
  // const vendor = useRe
  const vendors = useSalesWalaSelector(state => state.vendors.data);
  const vendor = vendors.find(item => item.id === vendorId);

  const vendorMetadata = vendor?.metadata
  const primary = useGetColor('primary');
  const borderColor = useGetColor("borderColor")
  const successColor = useGetColor('success');
  const shortUUID = id.split('-').slice(1, 4).join('-');

  const expandedStyle = {
    borderWidth: 1.5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: successColor,
  };

  const nonExpandedStyle = {
    borderWidth: 0.5,
    borderRadius: 6,
  };

  return (
    <View
      style={[
        {
          padding: 8,
          marginTop: 5,
          borderColor: borderColor,

          flexDirection: 'row',
        },
        isExpanded ? expandedStyle : nonExpandedStyle,
      ]}>
      <View
        style={{
          backgroundColor: borderColor,
          borderRadius: 10,
          // padding:8,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          height: 50,
          width: 50,
        }}>
       <Image source={quotationIcon}  style={{
                height: 30,
                width: 30
              }}/>
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
            fontWeight="800"
            fontSize={16}>
              {vendorMetadata?.businessName}
          </SalesWalaText>

          <SalesWalaText
            color="rgba(36, 36, 36, 1)"
            fontWeight="500"
            fontSize={10}>
            {parseServerDateToMoment(createdAt).format(("DD MMM YYYY hh:mm a"))}
          </SalesWalaText>

          
          <SalesWalaText color={primary} fontWeight="400" fontSize={10}>
            Quotation ID: {shortUUID}
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
        <BackIcon stroke={isExpanded?successColor:'#242424'} />
      </View>
    </View>
  );
};

const OnePartyItem = ({data}: OnePartyItemProps) => {


  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SalesWalaAccordion
      onExpandChange={setIsExpanded}
      minHeight={80}
      primaryContent={
        <OnePartyItemPrimaryView data={data} isExpanded={isExpanded} />
      }
      secondaryContent={<OnePartyItemSecondaryView data={data} />}
    />
  );
};
const QuotationList = ({data}: PartiesListProps) => {
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


const QuotationsScreen = () => {
  const navigator = useNavigation();
  const items = useSalesWalaSelector(state => state.quotations.data);
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <ScreenHeader title="Quotations" />

      {items.length == 0 ? (
        <NoContent contentName="Quotations" />
      ) : (
        <QuotationList data={items} />
      )}

      <AddFabButton
        onPress={() => {
          // @ts-ignore
          navigator.navigate('AddOrUpdateQuotationScreen', {
            isCreate: true,
          });
        }}
      />
    </SafeAreaView>
  );
};

export default QuotationsScreen;

