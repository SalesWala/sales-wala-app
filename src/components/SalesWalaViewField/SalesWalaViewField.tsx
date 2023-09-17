import {StyleSheet, View} from 'react-native';
import SalesWalaText from '../SalesWalaText/SalesWalaText';
import {useGetColor} from '@src/hooks/useTheme';
import FormInput from '../FormComponents/FormInput';

interface SalesWalaViewFieldProps {
  title: string;
  value: string;
}
const SalesWalaViewField = (props: SalesWalaViewFieldProps) => {
  const textSubtle = useGetColor('textSubtle');
  return (
    <View
      style={{
        // borderBottomColor: textSubtle,
        // borderBottomWidth: 0.3,
        marginTop: 8,
      }}>
      <SalesWalaText fontSize={14} fontWeight="500" style={{marginBottom:5}}>
        {props.title}
      </SalesWalaText>

      <FormInput editable={false} value={props.value} style={[styles.input]} />
      {/* <SalesWalaText>{props.value}</SalesWalaText> */}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    
    fontWeight: '600',
    fontSize: 16,
    marginTop: 5,
  },
});
export default SalesWalaViewField
