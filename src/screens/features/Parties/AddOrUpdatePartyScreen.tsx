// @ts-nocheck
import ScreenHeader from '@src/components/ScreenHeader';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import SalesWalaButton from '@src/components/SalesWalaButton';
import { useState } from 'react';
import FormInput from '@src/components/FormComponents/FormInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';
import { CreateVendor, UpdateVendor } from '@src/apollo/queries/backend-queries';
import { useObject, useRealm } from '@realm/react';
import { useDispatch } from 'react-redux';
import { addVendor, updateVendor } from '@src/redux/slices/vendorSlice';
import { useToast } from 'react-native-toast-notifications';
import { VendorModal } from '@src/realm/models/VendorModal';
import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';

const AddOrUpdatePartyScreen = () => {
  const route = useRoute();

  // @ts-ignore
  const isForCreate = route.params.isCreate;

  const [isLoading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    businessNameError: '',
    contactPersonNameError: '',
    contactNumberError: '',
    addressError: '',
    cityError: '',
    pincodeError: '',
  });

  const vendor = route.params.data;

  const vendorDbObject = vendor && useObject(VendorModal, vendor.id);

  const [formInput, setFormInput] = useState({
    businessName: vendor ? vendor.metadata.businessName : '',
    contactPersonName: vendor ? vendor.metadata.contactPersonName : '',
    contactNumber: vendor ? vendor.metadata.contactNumber : '',
    address: vendor ? vendor.metadata.address : '',
    city: vendor ? vendor.metadata.city : '',
    pincode: vendor ? vendor.metadata.pincode : '',
    email: vendor ? vendor.metadata.email : '',
  });

  const [createVendorMutation] = useMutation(CreateVendor, {
    errorPolicy: 'all',
  });

  const [updateVendorMutation] = useMutation(UpdateVendor, {
    errorPolicy: 'all',
  });

  const realm = useRealm();
  const dispatch = useDispatch();
  const toast = useToast();
  const navigator = useNavigation();

  const validateForm = () => {
    let isErrorFound = false;
    const errors = {
      businessNameError: '',
      contactPersonNameError: '',
      contactNumberError: '',
      addressError: '',
      cityError: '',
      pincodeError: '',
    };

    if (!formInput.businessName) {
      errors.businessNameError = 'Please Enter Business Name';
      isErrorFound = true;
    }

    if (!formInput.contactNumber) {
      errors.contactNumberError = 'Please Enter Contact Number';
      isErrorFound = true;
    }
    if (!formInput.contactPersonName) {
      errors.contactPersonNameError = 'Please Enter Contact Person Name';
      isErrorFound = true;
    }
    if (!formInput.city) {
      errors.cityError = 'Please Enter City';
      isErrorFound = true;
    }
    if (!formInput.pincode) {
      errors.pincodeError = 'Please Enter Pincode';
      isErrorFound = true;
    }
    if (!formInput.address) {
      errors.addressError = 'Please Enter Address';
      isErrorFound = true;
    }

    setFormErrors(errors);
    return isErrorFound;
  };

  const addOrUpdateVendorToDB = async (data: any, isAdd: boolean) => {
    if (isAdd) {
      realm.write(() => {
        realm.create('Vendor', data);
        dispatch(addVendor(JSON.stringify(data)));
        toast.show(`Successfully added ${formInput.businessName}`, {
          type: 'success',
          placement: 'bottom',
          duration: 2000,
          animationType: 'slide-in',
        });

        navigator.goBack();
      });
    } else if (vendor) {
      realm.write(() => {
        // @ts-ignore
        vendorDbObject.updatedAt = data.updatedAt;
        vendorDbObject.metadata = data.metadata;
        toast.show(`Successfully Updated ${formInput.businessName}`, {
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

  const handleCreateVendor = async (data: any) => {
    const resp = await createVendorMutation({
      variables: {
        ...data,
      },
    });
    if (resp.errors) {
      //handle error todo
      console.log('handleCreateVendorError', resp.errors);
    } else {
      const data = resp.data.createVendor;
      delete data.__typename;
      await addOrUpdateVendorToDB(data, true);
    }
  };

  const handleUpdateVendor = async (data: any) => {
    const resp = await updateVendorMutation({
      variables: {
        ...data,
        id: vendor.id,
      },
    });

    if (resp.errors) {
      //handle error todo
      console.log('handleUpdateVendorError', JSON.stringify(resp.errors));
    } else {
      const data = resp.data.updateVendor;
      delete data.__typename;
      await addOrUpdateVendorToDB(data, false);
    }
  };

  const handleSubmit = async () => {
    const isErrorFound = validateForm();
    if (!isErrorFound) {
      setLoading(true);
      try {
        const data = {
          metadata: JSON.stringify(formInput),
        };

        if (isForCreate) {
          await handleCreateVendor(data);
        } else {
          await handleUpdateVendor(data);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <ScreenHeader
        title={
          isForCreate
            ? 'Create Party'
            : `Update ${vendor.metadata.businessName}`
        }
      />
      <ScrollView
        style={{
          paddingHorizontal: 20,
          flex: 1,
          marginVertical: 20
        }}>
        <SalesWalaText fontSize={14} fontWeight='500' style={{}}>
          Business Name
        </SalesWalaText>
        <FormInput
          placeholder="Enter Business Name*"
          style={[styles.input]}
          value={formInput.businessName}
          error={formErrors.businessNameError}
          containerStyles={{
            marginTop: 5,

          }}
          onChangeText={e => {
            setFormInput({ ...formInput, businessName: e });
          }}
        />

        <View style={{
          marginTop: 8
        }}>
          <SalesWalaText fontSize={14} fontWeight='500' style={{}}>
            Contract Person Name
          </SalesWalaText>
          <FormInput
            placeholder="Enter Contact Person Name*"
            style={[styles.input]}
            value={formInput.contactPersonName}
            error={formErrors.contactPersonNameError}
            containerStyles={{
              marginTop: 5,

            }}
            onChangeText={e => {
              setFormInput({ ...formInput, contactPersonName: e });
            }}
          />
        </View>


        <View style={{
          marginTop: 8
        }}>
          <SalesWalaText fontSize={14} fontWeight='500' style={{}}>
            Contract Number
          </SalesWalaText>
          <FormInput
            placeholder="Enter Contact Number*"
            style={[styles.input]}
            inputMode="tel"
            error={formErrors.contactNumberError}
            containerStyles={{
              marginTop: 5,

            }}
            value={formInput.contactNumber}
            onChangeText={e => {
              setFormInput({ ...formInput, contactNumber: e });
            }}
          />
        </View>



        <View style={{
          marginTop: 8
        }}>
          <SalesWalaText fontSize={14} fontWeight='500' style={{}}>
            Address
          </SalesWalaText>
          <FormInput
            placeholder="Enter Address*"
            style={[styles.input]}
            value={formInput.address}
            error={formErrors.addressError}
            containerStyles={{
              marginTop: 5,
            }}
            onChangeText={e => {
              setFormInput({ ...formInput, address: e });
            }}
          />
        </View>




        <View style={{ flexDirection: 'row', marginTop: 5 }}>

          <View style={{
            marginTop: 8,
            flex: 1,

          }}>
            <SalesWalaText fontSize={14} fontWeight='500' style={{}}>
              City
            </SalesWalaText>
            <FormInput
              placeholder="Enter City*"
              error={formErrors.cityError}
              style={[styles.input]}
              containerStyles={{
                marginTop: 5,

              }}
              value={formInput.city}
              onChangeText={e => {
                setFormInput({ ...formInput, city: e });
              }}
            />
          </View>



          <View style={{
            marginTop: 8,
            flex: 1,
            marginLeft: 5

          }}>
            <SalesWalaText fontSize={14} fontWeight='500' style={{}}>
              PinCode
            </SalesWalaText>
            <FormInput
              placeholder="Enter Pincode*"
              style={[styles.input]}
              inputMode="numeric"
              error={formErrors.pincodeError}
              value={formInput.pincode}
              onChangeText={e => {
                setFormInput({ ...formInput, pincode: e });
              }}
              containerStyles={{
                marginTop: 5,



              }}
            />
          </View>



        </View>


        <View style={{
          marginTop: 8,
          flex: 1,
          marginLeft: 5

        }}>
          <SalesWalaText fontSize={14} fontWeight='500' style={{}}>
            Email
          </SalesWalaText>
          <FormInput
            placeholder="Enter Email (Optional)"
            inputMode="email"
            style={[styles.input]}
            value={formInput.email}
            containerStyles={{
              marginTop: 5,
            }}
            onChangeText={e => {
              setFormInput({ ...formInput, email: e });
            }}
          />
        </View>


        <SalesWalaButton
          isLoading={isLoading}
          text={isForCreate ? 'Create Party' : 'Update Party'}
          onPress={() => {
            handleSubmit();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 10,
  },
});
export default AddOrUpdatePartyScreen
