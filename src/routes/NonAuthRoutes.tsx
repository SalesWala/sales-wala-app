import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@src/screens/auth/LoginScreen';
import WelcomeSlideScreen from '@src/screens/auth/WelcomeSlideScreen';
import ForgotPasswordScreen from '@src/screens/auth/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

function NonAuthRoutes() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="WelcomeSlideScreen">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="WelcomeSlideScreen"
          component={WelcomeSlideScreen}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
      </Stack.Navigator>
    </>
  );
}

export default NonAuthRoutes;
