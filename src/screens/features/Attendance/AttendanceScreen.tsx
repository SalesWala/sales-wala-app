import ScreenHeader from '@src/components/ScreenHeader';
import { Alert, SafeAreaView, ScrollView, View } from 'react-native';
import AttendanceOverview from './components/AttendanceOverview/AttendanceOverview';
import SalesWalaCalendar from '@src/components/SalesWalaCalendar/SalesWalaCalendar';
import SalesWalaButton from '@src/components/SalesWalaButton';
import { useEffect, useState } from 'react';
import { useGetColor } from '@src/hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@src/redux/store';
import PunchOutModal from '@src/screens/dashboard/components/AttendanceWidget/PunchOutModal';
import moment from 'moment';

interface MarkAttendanceButtonProps {
  hasAttendanceMarked: boolean
  onPress: () => void
}
const MarkAttendanceButton = (props: MarkAttendanceButtonProps) => {



  const buttonColor = !props.hasAttendanceMarked
    ? useGetColor('success')
    : useGetColor('danger');

  return (
    <>
      <SalesWalaButton
        color={buttonColor}
        fontWeight="600"
        text={props.hasAttendanceMarked ? 'Punch Out' : 'Punch In'}
        onPress={() => {
          props.onPress()
          //@ts-ignore

        }}
      />


    </>
  )
};
const AttendanceScreen = () => {
  const todayDate = moment().set("D", 1);

  const attendances = useAppSelector((state) => state.attendance.data);




  const [currentCalendarDate, setCurrentCalandarDate] = useState(moment().set("D", 1));

  const currentMonthData = attendances.filter(attendance => {
    const _date = new Date(attendance.createdAt);
    return _date.getUTCMonth() === currentCalendarDate.get("month") && _date.getUTCFullYear() === currentCalendarDate.get("year")
  });


  const lastYear = 2022;
  const lastMonth = 4;
  const bottomDate = moment()

  bottomDate.set('year', lastYear);
  bottomDate.set('month', lastMonth);
  bottomDate.set('date', 1);

  
  const totalAbsent = currentMonthData.filter((attendance) => {
    if (attendance.attendanceStatus) {
      return attendance.attendanceStatus === "ABSENT"
    }
  }).length;


  const totalLeave = currentMonthData.filter((attendance) => {
    if (attendance.attendanceStatus) {
      return attendance.attendanceStatus === "LEAVE"
    }
  }).length;


  const totalPresent = currentMonthData.filter((attendance) => {
    if (attendance.attendanceStatus) {
      return attendance.attendanceStatus === "PRESENT"
    }
  }).length;



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
        <AttendanceOverview present={totalPresent} leave={totalLeave} absent={totalAbsent} />

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
