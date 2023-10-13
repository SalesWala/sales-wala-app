import ScreenHeader from '@src/components/ScreenHeader';
import { Alert, SafeAreaView, ScrollView, View } from 'react-native';
import AttendanceOverview from './components/AttendanceOverview/AttendanceOverview';
import SalesWalaCalendar from '@src/components/SalesWalaCalendar/SalesWalaCalendar';
import SalesWalaButton from '@src/components/SalesWalaButton';
import { useEffect, useState } from 'react';
import { useGetColor } from '@src/hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { useSalesWalaSelector } from '@src/redux/store';
import PunchOutModal from '@src/screens/dashboard/components/AttendanceWidget/PunchOutModal';
import moment from 'moment';
import { parseServerDateToMoment } from '@src/utils';
import { AttendanceModal } from '@src/realm/models/AttendanceModal';

interface MarkAttendanceButtonProps {
  hasAttendanceMarked: boolean
  onPress: () => void
}

export type ParsedAttendance = {
  createdAt: string;
  updatedAt: string;
  id: string;
  metadata?: string;
  punchOutTime?: string;
  punchInTime?: string;
  attendanceStatus?: string;
  createdAtMoment: moment.Moment
}

const AttendanceScreen = () => {
  const todayDate = moment().set("D", 1);

  const attendances = useSalesWalaSelector((state) => state.attendance.data);

  const parsedAttendances: ParsedAttendance[] = attendances.map((item) => {
    return {
      ...item,
      createdAtMoment: parseServerDateToMoment(item.createdAt)
    };
  })



  const [currentCalendarDate, setCurrentCalandarDate] = useState(moment().set("D", 1));

  const currentMonthData = parsedAttendances.filter(attendance => {
    const _date = attendance.createdAtMoment.toDate();
    return _date.getUTCMonth() === currentCalendarDate.get("month") && _date.getUTCFullYear() === currentCalendarDate.get("year")
  });

 


  const absents: { [key: string]: boolean } = {}
  const presents: { [key: string]: boolean } = {}
  const leaves: { [key: string]: boolean } = {}

  currentMonthData.forEach(item => {
    const date = item.createdAtMoment.format("DD-MM-YYYY");
    if (item.attendanceStatus === "ABSENT") {
      absents[date] = true;
    } else if (item.attendanceStatus === "PRESENT") {
      presents[date] = true;
    } else if (item.attendanceStatus === "LEAVE") {
      leaves[date] = true;
    }
  })

 


 
  
  



  const lastYear = 2022;
  // todo remove this
  const lastMonth = 4;
  const bottomDate = moment()

  bottomDate.set('year', lastYear);
  bottomDate.set('month', lastMonth);
  bottomDate.set('date', 1);







  




  const handleGoAhead = () => {

    const newDate = currentCalendarDate.clone().add(1, "M");

    if (newDate.isSameOrBefore(todayDate)) {
      setCurrentCalandarDate(newDate)
    } else {
      Alert.alert('Latest Date Reached');
    }
  }

  const handleGoBack = () => {


    const newDate = currentCalendarDate.clone().subtract(1, "M");

    if (newDate.isSameOrAfter(bottomDate)) {
      setCurrentCalandarDate(newDate)

    } else {
      Alert.alert('Last Date Reached');
    }


  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',

      }}>
      <ScreenHeader title="Attendance" />

      <ScrollView
        style={{
          marginHorizontal: 18,

        }}>
        <AttendanceOverview present={Object.keys(presents).length}
          leave={Object.keys(leaves).length} absent={Object.keys(absents).length} />

        <SalesWalaCalendar
          currentMonthData={currentMonthData}
          currentCalendarDate={currentCalendarDate}
          onGoBack={handleGoBack}
          onGoAhead={handleGoAhead}
        />
      </ScrollView>



    </SafeAreaView>
  );
};

export default AttendanceScreen
