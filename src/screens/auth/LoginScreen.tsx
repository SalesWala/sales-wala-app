import Bubbles from '@src/assets/svgs/Bubbles';
import WhatsAppIcon from '@src/assets/svgs/WhatsappIcon';
import FormInput, {
  FormPasswordInput,
} from '@src/components/FormComponents/FormInput';
import SalesWalaButton from '@src/components/SalesWalaButton';
import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import config from '@src/config/config';
import {useSalesWalaUser} from '@src/hooks/user/userHooks';
import {validateEmail} from '@src/utils';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import {useToast} from 'react-native-toast-notifications';

function LoginScreen({navigation}: any) {
  const toast = useToast();

  const [email, setEmail] = useState<string>('test@test.com');
  const [password, setPassword] = useState<string>('Test@123');

  const [isLoading, setLoading] = useState(false);

  const {performLogin} = useSalesWalaUser();

  const validate = () => {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      return {
        error: 'Enter Valid Email',
        isValid: false,
      };
    }

    const isPasswordValid = password;
    if (!isPasswordValid) {
      return {
        error: 'Enter Valid Password',
        isValid: false,
      };
    }

    return {
      error: '',
      isValid: true,
    };
  };

  const handleLogin = async () => {
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
        await performLogin(email, password);
      } catch (err) {
        // @ts-ignore
        toast.show(err.toString(), {
          type: 'danger',
          placement: 'bottom',
          duration: 2000,
          animationType: 'slide-in',
        });
      }
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
          <View
            style={{
              width: '100%',
              marginTop: 20,
            }}>
            <SalesWalaText
              style={{
                textAlign: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}>
              Sign In
            </SalesWalaText>

            <Bubbles
              style={{
                alignContent: 'flex-end',
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
                position: 'absolute',
              }}
            />
          </View>

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
              Welcome Back
            </SalesWalaText>

            <SalesWalaText fontSize={14} fontWeight="400" color="textSubtle">
              Please enter your email address{'\n'}and password for login
            </SalesWalaText>

            <View style={{marginTop: 30}}>
              <FormInput
                placeholder="Your Email"
                onChangeText={setEmail}
                value={email}
              />

              <FormPasswordInput
                placeholder="**********"
                onChangeText={setPassword}
                value={password}
              />

              <TouchableOpacity
                onPress={() => {
                  navigation.push('ForgotPasswordScreen');
                }}
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  // alignContent: "flex-end",
                  alignItems: 'flex-end',
                }}>
                <SalesWalaText fontSize={14} fontWeight="400" color="primary">
                  Forgot Password?
                </SalesWalaText>
              </TouchableOpacity>

              <SalesWalaButton
                isLoading={isLoading}
                text="Sign in"
                onPress={() => {
                  handleLogin();
                }}
              />
            </View>

            <View
              style={{
                marginTop: 20,
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <SalesWalaText fontSize={14} fontWeight="400" color="primary">
                Don't Have{' '}
                <SalesWalaText fontSize={14} fontWeight="700" color="primary">
                  SalesWala
                </SalesWalaText>{' '}
                for your organisation?
              </SalesWalaText>

              <View
                style={{
                  width: '100%',
                }}>
                <SalesWalaButton
                  secondary
                  text="Create Organisation"
                  onPress={() => {
                    const url = 'https://saleswala.co/register';
                    Linking.openURL(url);
                  }}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                const url = `https://wa.me/${config.WHATSAPP_NUMBER}`;
                Linking.openURL(url);
              }}
              style={{
                flexDirection: 'row',
              }}>
              <WhatsAppIcon
                style={{
                  // backgroundColor: "red",
                  flexWrap: 'wrap',
                  height: 20,
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  width: 20,
                }}
              />
              <SalesWalaText
                fontSize={14}
                fontWeight="400"
                style={{
                  textDecorationLine: 'underline',
                }}
                color="primary">
                Contact{' '}
                <SalesWalaText fontSize={14} fontWeight="700" color="primary">
                  SalesWala
                </SalesWalaText>{' '}
                for more information
              </SalesWalaText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                const url = 'https://saleswala.co';
                Linking.openURL(url);
              }}
              style={{
                flexDirection: 'row',
                marginTop: 8,
              }}>
              <SalesWalaText
                fontSize={14}
                fontWeight="400"
                style={{
                  textAlign: 'left',
                }}
                color="primary">
                Or Visit{' '}
                <SalesWalaText
                  fontSize={14}
                  fontWeight="700"
                  style={{
                    textDecorationLine: 'underline',
                  }}
                  color="primary">
                  www.saleswala.co
                </SalesWalaText>
              </SalesWalaText>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

export default LoginScreen;
