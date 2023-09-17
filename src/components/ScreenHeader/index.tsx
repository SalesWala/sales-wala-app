import {TouchableOpacity, View} from 'react-native';
import GoBack from '../GoBack';
import SalesWalaText from '../SalesWalaText/SalesWalaText';
import ThreeDotsIcon from '@src/assets/svgs/ThreeDotsIcon';
import MenuModal, {MenuType} from '../MenuModal/MenuModal';
import {useState} from 'react';

interface ScreenHeaderProps {
  title: string;
  menuItems?: MenuType[];
}
const ScreenHeader = (props: ScreenHeaderProps) => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    <View
      style={{
        width: '100%',
        marginTop: 20,
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <GoBack />
        </View>

      </View>

      <SalesWalaText
        fontWeight={"700"}
        style={{
          // flex: 1,
          textAlign: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          fontSize: 18,
          alignItems: 'center',
          alignSelf: 'center',
          position: 'absolute',
        }}>
        {props.title}
      </SalesWalaText>

      {props.menuItems && (
        <TouchableOpacity
          onPress={() => {
            setMenuVisible(true);
          }}
          style={{
            justifyContent: 'center',
            position: 'absolute',
            alignSelf: 'flex-end',
            paddingRight: 10,
          }}>
          <ThreeDotsIcon height={20} width={20} />
        </TouchableOpacity>
      )}

      {props.menuItems && (
        <MenuModal
          menuItems={props.menuItems}
          isVisible={isMenuVisible}
          onClose={function (): void {
            setMenuVisible(false);
          }}
        />
      )}
    </View>
  );
};

export default ScreenHeader
