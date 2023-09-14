import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '@src/screens/dashboard/DashboardScreen';
import AttendanceScreen from '@src/screens/features/Attendance/AttendanceScreen';
import MarkAttendanceScreen from '@src/screens/features/Attendance/MarkAttendanceScreen';
import PartiesScreen from '@src/screens/features/Parties/PartiesScreen';
import AddOrUpdatePartyScreen from '@src/screens/features/Parties/AddOrUpdatePartyScreen';
import SettingsScreen from '@src/screens/SettingsScreen/SettingsScreen';
import ViewVendorScreen from '@src/screens/features/Parties/ViewVendorScreen';
import DataLoader from '@src/dataloader';
import ProductScreen from '@src/screens/features/Products/ProductScreen';
import ViewProductScreen from '@src/screens/features/Products/ViewProductScreen';
import AddOrUpdateQuotationScreen from '@src/screens/features/Quotation/AddOrUpdateQuotationScreen';
import QuotationsScreen from '@src/screens/features/Quotation/QuotationsScreen';
import ViewQuotationScreen from '@src/screens/features/Quotation/ViewQuotationScreen';

const Stack = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />

        <Stack.Screen name="Home" component={DashboardScreen} />


        <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />
        <Stack.Screen
          name="MarkAttendanceScreen"
          component={MarkAttendanceScreen}
        />



        <Stack.Screen name="PartiesScreen" component={PartiesScreen} />
        <Stack.Screen
          name="AddOrUpdatePartyScreen"
          component={AddOrUpdatePartyScreen}
        />
        <Stack.Screen name="ViewVendorScreen" component={ViewVendorScreen} />






        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="ViewProductScreen" component={ViewProductScreen} />



        <Stack.Screen name="AddOrUpdateQuotationScreen" component={AddOrUpdateQuotationScreen} />        
        <Stack.Screen name="QuotationsScreen" component={QuotationsScreen} />
        <Stack.Screen name="ViewQuotationScreen" component={ViewQuotationScreen} />



      </Stack.Navigator>

      <DataLoader />
    </>
  );
}

export default AuthRoutes;
