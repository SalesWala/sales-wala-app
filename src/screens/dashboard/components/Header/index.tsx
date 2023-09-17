import { useNavigation } from '@react-navigation/native';
import SalesWalaIcon from '@src/assets/svgs/SalesWalaIcon';
import SettingIcon from '@src/assets/svgs/SettingIcon';
import AnnouncementsView from '@src/components/AnnouncementsView';
import AvatarView from '@src/components/AvatarView/AvatarView';
import ChatCounter from '@src/components/ChatCounter';
import SalesWalaRotatingIcon from '@src/components/SalesWalaRotatingIcon/SalesWalaRotatingIcon';
import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import TaskCounter from '@src/components/TaskCounter';
import { useGetColor } from '@src/hooks/useTheme';
import { Text, TouchableOpacity, View } from 'react-native';

const Header = () => {

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
          // flex: 1,

        }}>
        <View style={{ flexDirection: "row", flex: 1, }}>
          <SalesWalaRotatingIcon/>
          <SalesWalaText
            style={{
              justifyContent: 'center',
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
              textAlign: "center",
            }}
            fontSize={16}
            fontWeight="700"
            color={primartColor}>

            SalesWala
          </SalesWalaText>

        </View>









        <View
          style={{
            flexDirection: 'row',
            justifyContent: "center",
            // backgroundColor: "red",
            // flex:1,
          }}>
          <AnnouncementsView
            counts={20}
            style={{
              marginLeft: 8

            }}
          />
          {/* @ts-ignore */}
          <ChatCounter
            counts={5}
            style={{
              marginLeft: 8
            }}
          />

          <TaskCounter
            counts={20}
            style={{
              marginLeft: 8

            }}
          />

          <TouchableOpacity
            onPress={() => {
              // @ts-ignore
              navigator.navigate('SettingsScreen');
            }}
            style={
              {
                marginLeft: 8

              }
            }>
            <AvatarView />

          </TouchableOpacity>

        </View>
      </View>


    </View>
  );
};
export default Header;
