import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import {useGetColor} from '@src/hooks/useTheme';
import {useSalesWalaSelector} from '@src/redux/store';
import {View} from 'react-native';

const Greetings = () => {
  const user = useSalesWalaSelector(state => state.user.userData);

  const getGreetings = () => {
    const timeNow = new Date().getHours();
    return timeNow >= 5 && timeNow < 12
      ? 'Good Morning'
      : timeNow >= 12 && timeNow < 18
      ? 'Good Afternoon'
      : 'Good Evening';
  };
  return (
    <View
      style={{
        marginVertical: 10,
    }}>
      <SalesWalaText fontWeight="400" fontSize={16} color={"textSubtle"}>
        {getGreetings()},{'\n'}
        <SalesWalaText color={"primary"} fontWeight="600" fontSize={22}>
          {user && `${user.firstname} ${user.lastname}`}
        </SalesWalaText>
      </SalesWalaText>
    </View>
  );
};

export default Greetings;
