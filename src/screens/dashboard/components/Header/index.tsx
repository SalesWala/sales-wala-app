import { useNavigation } from '@react-navigation/native';
import SettingIcon from '@src/assets/svgs/SettingIcon';
import AnnouncementsView from '@src/components/AnnouncementsView';
import AvatarView from '@src/components/AvatarView/AvatarView';
import ChatCounter from '@src/components/ChatCounter';
import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import TaskCounter from '@src/components/TaskCounter';
import { useGetColor } from '@src/hooks/useTheme';
import { useAppSelector } from '@src/redux/store';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useAppSelector(state => state.user.userData);

  const navigator = useNavigation();
  const primartColor = useGetColor('primary');
  return (
    <View
      style={{
        justifyContent: 'center',
      }}>
      <View
        style={{
          justifyContent: "center",
          flexDirection: 'row',
          paddingVertical: 8,
          marginBottom: 10,
          flex: 1,

        }}>



        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              // @ts-ignore
              navigator.navigate('SettingsScreen');
            }}
            style={
              {

              }
            }>
            <AvatarView />

          </TouchableOpacity>

          <AnnouncementsView
            counts={20}
            style={{
              marginLeft: 10

            }}
          />
        </View>


        <SalesWalaText
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            textAlign: "center",
          }}
          fontSize={16}
          fontWeight="500"
          color={primartColor}>
          SalesWala
        </SalesWalaText>



        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* @ts-ignore */}
          <ChatCounter
            counts={5}
            style={{
            }}
          />

          <TaskCounter
            counts={20}
            style={{
              marginLeft: 10
            }}
          />
        </View>
      </View>


    </View>
  );
};
export default Header;
