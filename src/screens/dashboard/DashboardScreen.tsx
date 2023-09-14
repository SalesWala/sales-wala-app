import {View, SafeAreaView} from 'react-native';
import Header from './components/Header';
import Greetings from './components/Greetings/Greetings';
import AttendanceWidget from './components/AttendanceWidget/AttendanceWidget';
import Features from './components/Features/Features';
import {ScrollView} from 'moti';

function DashboardScreen() {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <SafeAreaView>
        <ScrollView style={{paddingHorizontal: 15}}>
          <Header />
          <Greetings />
          <AttendanceWidget />
          <Features />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default DashboardScreen;
