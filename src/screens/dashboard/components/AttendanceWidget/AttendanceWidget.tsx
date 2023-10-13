import { useNavigation } from '@react-navigation/native';
import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import { useGetColor } from '@src/hooks/useTheme';
import { AttendanceModal } from '@src/realm/models/AttendanceModal';
import { useSalesWalaSelector } from '@src/redux/store';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PunchOutModal from './PunchOutModal';
import { parseServerDateToMoment } from '@src/utils';

interface PunchOutViewProps {
  punchInData: AttendanceModal
}


interface PunchInViewProps {
  punchInData: AttendanceModal

}


function formatElapsedTime(duration: any) {
  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.asMinutes()) % 60;
  const seconds = Math.floor(duration.asSeconds()) % 60;

  return `${padZero(hours)} H ${padZero(minutes)} M ${padZero(seconds)} S`;
}

function padZero(num: number) {
  return num < 10 ? `0${num}` : num;
}

const PunchedOutView = (props: PunchInViewProps) => {
  const primary = useGetColor('primary');
  const { punchInTime } = props.punchInData
  const [startTime] = useState(parseServerDateToMoment(punchInTime)); // Set the start time when the component mounts
  const [currentTime, setCurrentTime] = useState(moment());
  const [isPunchOutModalVisible, setPunchOutModalVisible] = useState(false);
  const elapsedTime = moment.duration(currentTime.diff(startTime));
  const formattedTimePassed = formatElapsedTime(elapsedTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const handlePunch = () => {
    setPunchOutModalVisible(true)
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={handlePunch}
          style={{
            flex: 1,
            borderRadius: 8,
            backgroundColor: 'rgba(249, 102, 102, 1)',
            paddingHorizontal: 20,
            justifyContent: 'center',
          }}>
          <SalesWalaText fontSize={12} color="#fff" fontWeight="500" style={{}}>
            Punch Out
          </SalesWalaText>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            borderRadius: 8,
            backgroundColor: primary,
            paddingVertical: 5,
            paddingHorizontal: 20,
            // alignContent: "center",
            alignItems: 'flex-end',
          }}>
          <View>
            <SalesWalaText
              fontSize={10}
              color="rgba(190, 190, 190, 1)"
              fontWeight="500"
              style={{
                textAlign: 'left',
                alignContent: 'flex-start',
              }}>
              In Time
            </SalesWalaText>
            <SalesWalaText fontSize={12} color="#fff" fontWeight="500">
              {parseServerDateToMoment(punchInTime).format("hh:mm a")}
            </SalesWalaText>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          position: 'absolute',
          borderRadius: 8,
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: -4,
          backgroundColor: primary,
          borderWidth: 1,
          borderColor: 'rgba(190, 190, 190, 1)',
          paddingVertical: 8,
          paddingHorizontal: 20,
        }}>
        <View style={{}}>
          <SalesWalaText
            fontSize={9}
            color="rgba(190, 190, 190, 1)"
            fontWeight="500"
            style={{
              textAlign: 'center',
            }}>
            Total Duration
          </SalesWalaText>
          <View style={{
            flexDirection: 'row', alignContent: "center", alignItems: "center",
            alignSelf: "center", justifyContent: "center",

          }}>
            <SalesWalaText
              fontSize={12}
              color="#fff"
              fontWeight="500"
              style={{

              }}>
              {formattedTimePassed}
            </SalesWalaText>


          </View>
        </View>
      </View>

      <SalesWalaText
        fontSize={10}
        color={primary}
        style={{
          marginTop: 8,
          alignSelf: 'center',
        }}>
        You are Punched In
      </SalesWalaText>
      {isPunchOutModalVisible && <PunchOutModal
        punchInData={props.punchInData}
        isVisible={isPunchOutModalVisible} onClose={() => {
          setPunchOutModalVisible(false)
        }} />}
    </View>
  );
};

const PunchedInView = () => {
  const primary = useGetColor('primary');
  const subtleGreen = useGetColor('subtleGreen');

  const navigator = useNavigation();
  const lastAttendace = useSalesWalaSelector((state) => state.attendance.lastAttendance);
  const [lastTime, setLastTime] = useState("-")
  const [lastPunchDuration, setLastPunchDuration] = useState("-")


  useEffect(() => {
    if (lastAttendace) {
      setLastTime(parseServerDateToMoment(lastAttendace.punchOutTime).format("hh:mm a"))
      const startTime = parseServerDateToMoment(lastAttendace.punchInTime);
      const elapsedTime = moment.duration(parseServerDateToMoment(lastAttendace.punchOutTime).diff(startTime));
      const formattedTimePassed = formatElapsedTime(elapsedTime);

      setLastPunchDuration(formattedTimePassed)
    }
  }, [lastAttendace])


  const handlePunch = () => {
    //@ts-ignore
    navigator.navigate('MarkAttendanceScreen');
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={handlePunch}
          style={{
            flex: 1,
            borderRadius: 8,
            backgroundColor: subtleGreen,
            paddingHorizontal: 20,
            justifyContent: 'center',
          }}>
          <SalesWalaText fontSize={12} color="#fff" fontWeight="600" style={{}}>
            Punch In
          </SalesWalaText>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            borderRadius: 8,
            backgroundColor: '#f4f4f5',
            paddingVertical: 5,
            paddingHorizontal: 20,
            // alignContent: "center",
            alignItems: 'flex-end',
          }}>
          <View>
            <SalesWalaText
              fontSize={10}
              color={primary}
              fontWeight="600"
              style={{
                textAlign: 'left',
                alignContent: 'flex-start',
              }}>
              Last Time 
            </SalesWalaText>
            <SalesWalaText fontSize={12} color="primary" fontWeight="600">
              {lastTime}
            </SalesWalaText>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          position: 'absolute',
          borderRadius: 8,
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: -4,
          backgroundColor: primary,
          // borderWidth: 0.3,
          // borderColor: borderColor,
          paddingVertical: 8,
          paddingHorizontal: 20,
        }}>
        <View style={{}}>
          <SalesWalaText
            fontSize={9}
            color="rgba(190, 190, 190, 1)"
            fontWeight="600"
            style={{
              textAlign: 'center',
            }}>
            Last Punch Duration
          </SalesWalaText>
          <View style={{
            flexDirection: 'row', alignContent: "center",
            alignItems: "center",
            alignSelf: "center"
          }}>
            <SalesWalaText
              fontSize={12}
              color="#fff"
              fontWeight="600"
              style={{
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
                textAlign: "center",

              }}>
              {lastPunchDuration}
            </SalesWalaText>

          </View>
        </View>
      </View>

      <SalesWalaText
        fontSize={10}
        fontWeight='500'
        color={"textSubtle"}
        style={{
          marginTop: 8,
          alignSelf: 'center',
        }}>
        You are Punched Out
      </SalesWalaText>


    </View>
  );
};

const AttendanceWidget = () => {

  const currentPunchIn = useSalesWalaSelector((state) => state.attendance.currentPunchIn)
  return !currentPunchIn ? (
    //@ts-ignore
    <PunchedInView/>
  ) : (
    //@ts-ignore
    <PunchedOutView punchInData={currentPunchIn} />
  );
};

export default AttendanceWidget;
