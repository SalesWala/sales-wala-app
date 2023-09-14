import ScreenHeader from '@src/components/ScreenHeader';
import {
  Button,
  FlatList,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {useGetColor} from '@src/hooks/useTheme';
import NoContent from '@src/components/NoContent/NoContent';
import {useNavigation} from '@react-navigation/native';

import {useRealm, useQuery as useRealmQuery} from '@realm/react';
import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import {useDispatch, useSelector} from 'react-redux';
import {useAppSelector} from '@src/redux/store';
import SalesWalaAccordion from '@src/components/SalesWalaAccordion/SalesWalaAccordion';
import BackIcon from '@src/assets/svgs/BackIcon';
import ShowIcon from '@src/assets/svgs/ShowIcon';
import EditIcon from '@src/assets/svgs/EditIcon';
import BoxIcon from '@src/assets/svgs/BoxIcon';
import WhatsAppIcon from '@src/assets/svgs/WhatsappIcon';
import PhoneIcon from '@src/assets/svgs/PhoneIcon';
import {ProductModal} from '@src/realm/models/ProductModal';
import Modal from 'react-native-modal';
import {MenuType} from '@src/components/MenuModal/MenuModal';
import ModalLoading from '@src/components/ModalLoading/ModalLoading';
import {useToast} from 'react-native-toast-notifications';
import {GETALLPRODUCTS} from '@src/apollo/queries/backend-queries';
import {useLazyQuery} from '@apollo/client';
import {setProductData} from '@src/redux/slices/productSlice';
import AddFabButton, {
  UpdateFabButton,
} from '@src/components/AddFabButton/AddFabButton';

interface ProductListProps {
  data: ProductModal[];
}

interface OneProductProps {
  data: ProductModal;
  isExpanded?: boolean;
}

const OneProductItem = ({data}: OneProductProps) => {
  const primary = useGetColor('primary');

  const [isExpanded, setIsExpanded] = useState(false);
  const navigator = useNavigation();

  const metadata: any = data.metadata;

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
          {metadata.name[0]}
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
            {metadata.name}
          </SalesWalaText>

          <SalesWalaText
            color="rgba(36, 36, 36, 1)"
            fontWeight="500"
            fontSize={10}>
            {metadata.description}
          </SalesWalaText>

          <SalesWalaText color={primary} fontWeight="400" fontSize={10}>
            Units: {metadata.unit}
          </SalesWalaText>
          <SalesWalaText color={primary} fontWeight="400" fontSize={10}>
            Price: Rs.{data.metadata?.price}
          </SalesWalaText>
        </View>
      </View>
    </View>
  );
};

const ProductsList = ({data}: ProductListProps) => {
  return (
    <FlatList
      data={data}
      style={{
        marginHorizontal: 20,
        marginBottom: 20,
      }}
      renderItem={({item}) => <OneProductItem data={item} />}
      keyExtractor={item => item.id}
    />
  );
};




const ProductScreen = () => {
  const realm = useRealm();

  const navigator = useNavigation();
  const toast = useToast();

  const productsFromDb = useRealmQuery(ProductModal);
  const [isRefreshModalVisible, setRefreshModalVisible] = useState(false);
  const items = useAppSelector(state => state.products.data);
  const [fetchProductsFromBackend] = useLazyQuery(GETALLPRODUCTS, {
    errorPolicy: 'all',
  });
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const _products = await fetchProductsFromServer();

    realm.write(() => {
      realm.delete(productsFromDb);
      for (let product of _products) {
        realm.create('Product', product);
      }
    });

    dispatch(setProductData(JSON.stringify(_products)));
  };

  const fetchProductsFromServer = async () => {
    const products = [];
    const serverResp = await fetchProductsFromBackend();
    if (serverResp.error) {
      // todo - handle
    }
    const data = serverResp.data.getProducts;

    for (let item of data) {
      const payload = {
        ...item,
      };
      delete payload.__typename;

      products.push(payload);
    }

    return products;
  };

  const refreshProducts = async () => {
    setRefreshModalVisible(true);

    try {
      await fetchProducts();
      toast.show('Successfully Refreshed Products List', {
        type: 'success',
        placement: 'bottom',
        duration: 2000,
        animationType: 'slide-in',
      });
    } catch (err) {
      console.log('sasasasa', err);
    }

    setRefreshModalVisible(false);
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <ScreenHeader title="Products" />
      {items.length == 0 ? (
        <NoContent
          contentName="Products"
          description="Try Refreshing the Product List By Clicking Three-Dots Menu"
        />
      ) : (
        <ProductsList data={items} />
      )}
      <ModalLoading
        title="Refreshing Products"
        visible={isRefreshModalVisible}
      />

      <UpdateFabButton onPress={refreshProducts} />
    </SafeAreaView>
  );
};

export default ProductScreen;

