import { View, SafeAreaView } from 'react-native';
import Header from './components/Header';
import Greetings from './components/Greetings/Greetings';
import AttendanceWidget from './components/AttendanceWidget/AttendanceWidget';
import Features from './components/Features/Features';
import { ScrollView } from 'moti';

function DashboardScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff"

      }}>
      <SafeAreaView style={{flex:1}}>
        <View style={{ paddingHorizontal: 12,flex:1 }}>
            <Header />
            <Greetings />
            <AttendanceWidget />
                   <Features />

        </View>
      </SafeAreaView>
    </View>
  );
}

export default DashboardScreen;
