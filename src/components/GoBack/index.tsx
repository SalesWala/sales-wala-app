import {useNavigation} from '@react-navigation/native';
import BackIcon from '@src/assets/svgs/BackIcon';
import {TouchableOpacity} from 'react-native';

const GoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      style={{
        padding: 5,
        marginLeft: 10,
      }}>
      <BackIcon stroke={'#242424'} />
    </TouchableOpacity>
  );
};
export default GoBack
