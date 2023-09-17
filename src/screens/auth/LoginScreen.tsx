import SalesWalaIcon from '@src/assets/svgs/SalesWalaIcon';
import WhatsAppIcon from '@src/assets/svgs/WhatsappIcon';
import FormInput, {
  FormPasswordInput,
} from '@src/components/FormComponents/FormInput';
import SalesWalaButton from '@src/components/SalesWalaButton';
import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import config from '@src/config/config';
import { useSalesWalaUser } from '@src/hooks/user/userHooks';
import { validateEmail } from '@src/utils';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { useToast } from 'react-native-toast-notifications';

function LoginScreen({ navigation }: any) {
  const toast = useToast();

  const [email, setEmail] = useState<string>('test@test.com');
  const [password, setPassword] = useState<string>('Test@123');

  const [isLoading, setLoading] = useState(false);

  const { performLogin } = useSalesWalaUser();

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
    const { error, isValid } = validate();

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
        backgroundColor:"#fff"

      }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
        style={{
          flex: 1,
        }}>
        <SafeAreaView

          style={{
            flex: 1,
            height: "100%",
          }}>
          <View
            style={{
              width: '100%',
              marginTop: 12,
            }}>
            <SalesWalaText
              fontWeight='700'
              style={{
                textAlign: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}>
              Sign In
            </SalesWalaText>

          </View>




          <View style={{
            // justifyContent: "center",
            // backgroundColor: "blue",
            flex: 1,
            marginTop: 25

          }}>
            <View>
              <View
                style={{
                  marginHorizontal: 20,
                  // marginVertical: 40,

                }}>


                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  <View style={{}}>
                    <SalesWalaIcon height={80} width={120} />
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <SalesWalaText
                      fontWeight="800"
                      fontSize={25}
                      style={{
                        // marginBottom: 4,
                      }}>
                      Welcome Back
                    </SalesWalaText>

                    <SalesWalaText fontSize={14} fontWeight="400" color="textSubtle">
                      Please enter your email address{'\n'}and password for login
                    </SalesWalaText>

                  </View>
                </View>
                <View style={{ marginTop: 16 }}>
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
                      marginTop: 12,
                      marginBottom: 12,
                      // alignContent: "flex-end",
                      alignItems: 'flex-end',
                    }}>
                    <SalesWalaText fontSize={14}
                      style={{
                        textDecorationLine: 'underline',
                      }}
                      fontWeight="400" color="textSubtle">
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
                    marginTop: 22,
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <SalesWalaText fontSize={14} fontWeight="400"  color="textSubtle">
                    Don't Have{' '}
                    <SalesWalaText fontSize={14} fontWeight="600" color="primary">
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
            </View>

        
          </View>
          <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
              marginTop: 8,
                marginBottom:8,
                // backgroundColor:"red",
                justifyContent:"flex-end"
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
                  fontWeight="500"
                  style={{
                    textDecorationLine: 'underline',
                  }}
                   color="textSubtle">
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
                  color="textSubtle">
                  Or Visit{' '}
                  <SalesWalaText
                    fontSize={14}
                    fontWeight="600"
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
