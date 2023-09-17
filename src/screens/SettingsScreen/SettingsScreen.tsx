import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import ScreenHeader from '@src/components/ScreenHeader';
import {useGetColor} from '@src/hooks/useTheme';
import {useSalesWalaUser} from '@src/hooks/user/userHooks';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';

const SettingsScreen = () => {
  const {performLogout} = useSalesWalaUser();

  const handleLogout = async () => {
    await performLogout();
  };

  const primaryColor = useGetColor('primary');
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',

      }}>
      <ScreenHeader title="Settings" />

      <View
        style={{
          paddingHorizontal: 15,
          marginTop: 10,
        }}>
        <TouchableOpacity

                onPress={handleLogout}
          style={{
            paddingVertical: 5,
            borderBottomColor: primaryColor,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}>
          <SalesWalaText color="danger" fontSize={16} fontWeight="600">
            Logout
          </SalesWalaText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
