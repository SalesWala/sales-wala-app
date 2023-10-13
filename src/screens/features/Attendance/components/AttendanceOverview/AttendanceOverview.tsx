import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import { useThemeColors } from '@src/hooks/useTheme';
import { useSalesWalaSelector } from '@src/redux/store';
import { TouchableOpacity, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow'


interface OneAttendanceOverviewCardProps {
  title: string;
  value: number | string;
  darkColor: string;
  lightColor: string;
}
const OneAttendanceOverviewCard = (props: OneAttendanceOverviewCardProps) => {
  return (
    <View style={{}}>
      <DropShadow
        style={{
          backgroundColor: props.lightColor,
          borderRadius: 25,
          borderWidth: 2,
          borderColor: '#fff',
          paddingHorizontal: 25,
          paddingVertical: 25,
          shadowColor: props.lightColor,
          shadowOffset: {
            width: 1,
            height: 0,
          },
          shadowOpacity: 0.4,
          shadowRadius: 3,
        }}>
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              height: 50,
              width: 50,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              borderWidth: 1,
              borderColor: props.darkColor,
            }}>
            <SalesWalaText
              fontSize={18}
              fontWeight="500"
              color={props.darkColor}>
              {props.value}
            </SalesWalaText>
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            width: '100%',
            borderBottomColor: props.darkColor,
            borderBottomWidth: 3,
            padding: 10,
            bottom: 0,
            justifyContent: 'center',
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        />
      </DropShadow>

      <SalesWalaText
        fontSize={14}
        style={{
          textAlign: 'center',
          marginTop: 5,
        }}>
        {props.title}
      </SalesWalaText>
    </View>
  );
};




interface AttendanceOverviewProps {
  present: number
  absent: number
  leave: number


}
const AttendanceOverview = ({ present, absent, leave }: AttendanceOverviewProps) => {

  const colors = useThemeColors();

  return (
    <View
      style={{
        marginTop: 10,
        marginBottom: 10,
      }}>
      <SalesWalaText fontSize={16}>Monthly Overview</SalesWalaText>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>

        <View
          style={
            {
              // flex: 1,
              // width:"50%"
              flexDirection: "row",
              flex: 1,
            }
          }>
          <View style={{ flex: 1 }}>
            <OneAttendanceOverviewCard
              title='Present'
              value={present ? present : "-"}

              darkColor={colors.presentColor}
              lightColor='rgba(218, 255, 208, 1)'
            />
          </View>

          <View style={{ flex: 1, marginHorizontal: 5 }}>
            <OneAttendanceOverviewCard
              title='Absent'
              value={absent ? absent : "-"}

              darkColor={colors.absentColor}
              lightColor='rgba(255, 227, 227, 1)'
            />
          </View>


          <View style={{ flex: 1 }}>
            <OneAttendanceOverviewCard
              title='Leave'
              value={leave ? leave : "-"}
              darkColor={colors.leaveColor}

              lightColor='rgba(192, 196, 197, 1)'
            />
          </View>

        </View>



      </View>
    </View>
  );
};

export default AttendanceOverview
