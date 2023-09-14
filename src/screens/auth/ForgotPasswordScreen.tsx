import Bubbles from '@src/assets/svgs/Bubbles';
import FormInput from '@src/components/FormComponents/FormInput';
import GoBack from '@src/components/GoBack';
import SalesWalaButton from '@src/components/SalesWalaButton';
import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import ScreenHeader from '@src/components/ScreenHeader';
import {validateEmail} from '@src/utils';
import {useState} from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import {useToast} from 'react-native-toast-notifications';

function ForgotPasswordScreen() {
  const toast = useToast();

  const [email, setEmail] = useState<string>('');

  const [isLoading, setLoading] = useState(false);

  const validate = () => {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      return {
        error: 'Enter Valid Email',
        isValid: false,
      };
    }

    return {
      error: '',
      isValid: true,
    };
  };

  const handleForgotPassword = () => {
    console.log('dsds');

    const {error, isValid} = validate();

    if (!isValid) {
      toast.show(error, {
        type: 'danger',
        placement: 'bottom',
        duration: 2000,
        animationType: 'slide-in',
      });
    }
    if (isValid) {
      setLoading(true);
      try {
      } catch (err) {}
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView>
        <SafeAreaView
          style={{
            flex: 1,
          }}>
          <ScreenHeader title="Forgot Password" />

          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 40,
            }}>
            <SalesWalaText
              fontWeight="600"
              fontSize={25}
              style={{
                marginBottom: 10,
              }}>
              Reset Password
            </SalesWalaText>

            <SalesWalaText fontSize={14} fontWeight="400" color="textSubtle">
              Please enter your email address{'\n'}to receive password reset
              link in your email inbox
            </SalesWalaText>

            <View style={{marginTop: 30}}>
              <FormInput
                placeholder="Your Email"
                onChangeText={setEmail}
                value={email}
              />

              <SalesWalaButton
                isLoading={isLoading}
                text="Sign in"
                onPress={() => {
                  handleForgotPassword();
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

export default ForgotPasswordScreen;
