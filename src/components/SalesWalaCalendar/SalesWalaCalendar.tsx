import { useGetColor, useThemeColors } from '@src/hooks/useTheme';
import { Alert, TouchableOpacity, View } from 'react-native';
import moment, { Moment } from 'moment';
import calendarJs from 'calendar-js';
import SalesWalaText from '../SalesWalaText/SalesWalaText';
import BackIcon from '@src/assets/svgs/BackIcon';
import { AttendanceModal } from '@src/realm/models/AttendanceModal';

interface SalesWalaCalendarProps {

  currentMonthData: AttendanceModal[]
  currentCalendarDate:Moment
  
  onGoBack: () => void
  onGoAhead: () => void


}

interface OneDateItemProps {
  day: number;
  status: 'ABSENT' | 'LEAVE' | 'PRESENT' | 'HOLIDAY' | null
}

const CalandarIndicator = () => {
  const colors = useThemeColors();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
      }}>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            alignSelf: 'center',
            marginRight: 3,
            backgroundColor: colors.presentColor,
            height: 10,
            width: 10,
            borderRadius: 100,
          }}
        />
        <SalesWalaText
          fontSize={10}
          fontWeight="700"
          color="#fff"
          style={{
            textAlign: 'center',
          }}>
          Present
        </SalesWalaText>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            alignSelf: 'center',
            marginRight: 3,
            backgroundColor: colors.absentColor,
            height: 10,
            width: 10,
            borderRadius: 100,
          }}
        />
        <SalesWalaText
          fontSize={10}
          fontWeight="700"
          color="#fff"
          style={{
            textAlign: 'center',
          }}>
          Absent
        </SalesWalaText>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            alignSelf: 'center',
            marginRight: 3,
            backgroundColor: colors.leaveColor,
            height: 10,
            width: 10,
            borderRadius: 100,
          }}
        />
        <SalesWalaText
          fontSize={10}
          fontWeight="700"
          color="#fff"
          style={{
            textAlign: 'center',
          }}>
          Leave
        </SalesWalaText>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            alignSelf: 'center',
            marginRight: 3,
            backgroundColor: colors.holidayColor,
            height: 10,
            width: 10,
            borderRadius: 100,
          }}
        />
        <SalesWalaText
          fontSize={10}
          fontWeight="700"
          color="#fff"
          style={{
            textAlign: 'center',
          }}>
          Holiday
        </SalesWalaText>
      </View>
    </View>
  );
};

const OneDateItem = (props: OneDateItemProps) => {
  const rawDay = props.day.toString();
  const colors = useThemeColors();
  let finalDay = rawDay;
  if (rawDay.length == 1) {
    finalDay = `0${finalDay}`;
  }




  let dateColor = '';
  switch (props.status) {
    case 'ABSENT':
      dateColor = colors.absentColor;
      break;
    case 'HOLIDAY':
      dateColor = colors.holidayColor;
      break;
    case 'LEAVE':
      dateColor = colors.leaveColor;
      break;
    case 'PRESENT':
      dateColor = colors.presentColor;
      break;

  }

  return (
    <View
      style={{
        paddingVertical: 5,
        backgroundColor: dateColor,
        padding: 5,
        borderRadius: 7,
        flex: 1,
        margin: 5,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        opacity: finalDay === '00' ? 0 : 1,

      }}>
      <SalesWalaText fontSize={12} fontWeight="700" color="#fff" style={{}}>
        {finalDay}
      </SalesWalaText>
    </View>
  );
};


const SalesWalaCalendar = ({currentCalendarDate,currentMonthData,onGoAhead,onGoBack}: SalesWalaCalendarProps) => {
  const primaryColor = useGetColor('primary');

  const getAttendanceByDay = (day: number): AttendanceModal | undefined => {
    const attendance = currentMonthData.find(attendance => {
      return moment(attendance.createdAt).date() === day && moment(attendance.createdAt).month() ===currentCalendarDate.month()
    } );

    return attendance
  }



  

  const getCalandarData = () => {
    const datesData = calendarJs().of(currentCalendarDate.year(), currentCalendarDate.month() );
    return datesData.calendar;
  };

  const handleGoBack = () => {
    onGoBack()
    
  };

  const handleGoAhead = () => {
    onGoAhead()
  
  };

  return (
    <View
      style={{
        backgroundColor: primaryColor,
        borderRadius: 14,
        padding: 20,
        
        marginVertical: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <SalesWalaText color="#fff" fontSize={14}>
          {`${calendarJs().months()[currentCalendarDate.month()]} ${currentCalendarDate.year()}`}
        </SalesWalaText>

        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={handleGoBack} style={{}}>
            <BackIcon stroke={'#fff'} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleGoAhead}
            style={{
              transform: [{ rotate: '180deg' }],
              marginLeft: 10,
            }}>
            <BackIcon stroke={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 15,
        }}>
        {calendarJs()
          .weekdaysAbbr()
          .map((item: string, index: number) => {
            return (
              <SalesWalaText key={`week=-${index}`} color="#fff" fontSize={12}>
                {item}
              </SalesWalaText>
            );
          })}
      </View>

      <View
        style={{
          // flexDirection: "row",
          justifyContent: 'space-between',
          marginTop: 5,
          marginBottom: 10,
        }}>
        {getCalandarData().map((rows: number[], index: number) => {
          return (
            <View
              key={`row-${index}`}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              {rows.map((day: number, index: number) => {
                const attendance = getAttendanceByDay(day);
                let status;
                if (attendance) {
                  status = attendance.attendanceStatus;
                }

                return (
                  <OneDateItem
                    // @ts-ignore
                    status={status}
                    day={day}
                    key={`${day}-${index}`}
                  />
                )
              })}
            </View>
          )
        })}
      </View>

      <CalandarIndicator />
    </View>
  )
};

export default SalesWalaCalendar
