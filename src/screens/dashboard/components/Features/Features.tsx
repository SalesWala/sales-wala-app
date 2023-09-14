import {TouchableOpacity, View} from 'react-native';
import featuresConfig, {FeaturesConfigType} from './config';
import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import DropShadow from 'react-native-drop-shadow';
import {useNavigation} from '@react-navigation/native';

interface OneFeatureItemProps {
  data: FeaturesConfigType;
}

const OneFeatureItem = (props: OneFeatureItemProps) => {
  const navigator = useNavigation();
  const {data} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        if (data.route) {
          // @ts-ignore
          navigator.navigate(data.route);
        }
      }}>
      <DropShadow
        style={{
          backgroundColor: data.lightColor,
          borderRadius: 25,
          marginLeft: 15,
          marginRight: 15,

          marginVertical: 15,
          paddingHorizontal: 25,
          height: 130,
          flex: 1,
          shadowColor: data.lightColor,
          shadowOffset: {
            width: 5,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 10,
        }}>
        <View
          style={{
            padding: 10,
            marginTop: 10,
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              alignSelf: 'center',
              padding: 8,
              borderRadius: 100,
            }}>
            {data.logo}
          </View>

          <SalesWalaText
            fontSize={14}
            style={{
              textAlign: 'center',
              marginTop: 5,
            }}>
            {data.title}
          </SalesWalaText>
        </View>

        <View
          style={{
            position: 'absolute',
            width: '100%',
            borderBottomColor: data.darkColor,
            borderBottomWidth: 3,
            padding: 10,
            bottom: 0,
            justifyContent: 'center',
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        />
      </DropShadow>
    </TouchableOpacity>
  );
};

const Features = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 40,
        flexWrap: 'wrap',
        flex: 1,
    }}>
      {featuresConfig.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              // flex: 1,
              width: '50%',
            }}>
            <OneFeatureItem data={item} />
          </View>
        )
      })}
    </View>
  );
};

export default Features
