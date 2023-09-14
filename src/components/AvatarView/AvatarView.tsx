import AvatarIcon from '@src/assets/svgs/AvatarIcon';
import { useAppSelector } from '@src/redux/store';
import {Image, TouchableOpacity} from 'react-native';

// interface AvatarViewProps {
//   avatar?: string;
// }
const AvatarView = () => {
  const user = useAppSelector(state => state.user.userData);
  let avatar;

  // @ts-ignore
  if (user && user.metadata && user.metadata.avatar) {
    //@ts-ignore
    avatar = user.metadata.avatar
  }
  return (
    avatar ? (
        <Image
          source={{uri: avatar}}
          height={26}
          width={26}
          borderRadius={30}
        />
      ) : (
        <AvatarIcon />
      )
  );
};

export default AvatarView