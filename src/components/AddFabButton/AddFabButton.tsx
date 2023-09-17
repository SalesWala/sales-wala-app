import AddIcon from '@src/assets/svgs/AddIcon';
import RefreshIcon from '@src/assets/svgs/RefreshIcon';
import { useGetColor } from '@src/hooks/useTheme';
import {TouchableOpacity} from 'react-native';
import DropShadow from 'react-native-drop-shadow';

interface AddFabButtonProps {
  onPress: () => void;
}
const AddFabButton = (props: AddFabButtonProps) => {
  const primary = useGetColor("primary")
  const subtleGreen = useGetColor("subtleGreen")

  return (
    <TouchableOpacity onPress={props.onPress}>
      <DropShadow
        style={{
          backgroundColor: primary,
          padding: 14,
          alignSelf: 'baseline',
          position: 'absolute',
          bottom: 0,
          borderRadius: 100,
          right: 0,
          marginBottom: 30,
          marginRight: 30,
          shadowOffset: {
            width: 5,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 10,
          shadowColor: subtleGreen
        }}>
        <AddIcon  color={"#fff"}/>
      </DropShadow>
    </TouchableOpacity>
  );
};

export const UpdateFabButton = (props: AddFabButtonProps) => {
  
  const primaryColor = useGetColor("primary")
  return (
    <TouchableOpacity onPress={props.onPress}>
      <DropShadow
        style={{
          backgroundColor:primaryColor,
          padding: 14,
          alignSelf: 'baseline',
          position: 'absolute',
          bottom: 0,
          borderRadius: 100,
          right: 0,
          marginBottom: 30,
          marginRight: 30,
          shadowOffset: {
            width: 5,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 10,
          shadowColor: 'rgba(128, 185, 86, 1)',
        }}>
        <RefreshIcon width={40} fill={'#fff'} height={40} />
      </DropShadow>
    </TouchableOpacity>
  );
};

export default AddFabButton
