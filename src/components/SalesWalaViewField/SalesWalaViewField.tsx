import {View} from 'react-native';
import SalesWalaText from '../SalesWalaText/SalesWalaText';
import {useGetColor} from '@src/hooks/useTheme';

interface SalesWalaViewFieldProps {
  title: string;
  value: string;
}
const SalesWalaViewField = (props: SalesWalaViewFieldProps) => {
  const textSubtle = useGetColor('textSubtle');
  return (
    <View
      style={{
        borderBottomColor: textSubtle,
        borderBottomWidth: 0.3,
        marginTop: 8,
      }}>
      <SalesWalaText fontSize={12} fontWeight="400" color={textSubtle}>
        {props.title}
      </SalesWalaText>

      <SalesWalaText>{props.value}</SalesWalaText>
    </View>
  );
};

export default SalesWalaViewField
