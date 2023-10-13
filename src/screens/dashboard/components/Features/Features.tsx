import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import featuresConfig, { FeaturesConfigType } from './config';
import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import DropShadow from 'react-native-drop-shadow';
import { useNavigation } from '@react-navigation/native';
import { useGetColor } from '@src/hooks/useTheme';
import { Key } from 'react';
interface OneFeatureItemProps {
  data: FeaturesConfigType;
}


function split(array: Iterable<any>, n: any) {
  let [...arr] = array;
  var res = [];
  while (arr.length) {
    res.push(arr.splice(0, n));
  }
  return res;
}


const OneFeatureItem = (props: OneFeatureItemProps) => {
  const navigator = useNavigation();
  const { data } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        if (data.route) {
          // @ts-ignore
          navigator.navigate(data.route);
        }
      }}>
      <View
        style={{
          backgroundColor: "#f4f4f5",
          borderRadius: 8,
          padding: 8,
        //   borderWidth: 1,
        //  borderColor:borderColor
        }}>
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              alignSelf: 'center',
              padding: 8,
              borderRadius: 10,
            }}>
            <Image
              //@ts-ignore 
              source={data.logo}
              // height={25}
              // width={25}
              style={{
                height: 50,
                width: 50
              }}
            />
          </View>


        </View>


      </View>
      <SalesWalaText
        fontSize={12}
        fontWeight='600'
        style={{
          textAlign: 'center',
          marginTop: 5,
        }}>
        {data.title}
      </SalesWalaText>
    </TouchableOpacity>
  );
};


// Gap stuff
const { width } = Dimensions.get('window');
const gap = 12;
const itemPerRow = 3;
const totalGapSize = (itemPerRow - 1) * gap;
const windowWidth = width;
const childWidth = (windowWidth - totalGapSize) / itemPerRow;


const Features = () => {




  return (
    <View
      style={{
        // flexDirection: 'row',
        marginTop: 20,
        // marginBottom: 40,

        flex: 1,

      }}>

      <FlatList
        data={featuresConfig}
        numColumns={4}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}

        keyExtractor={item => item.title}
        renderItem={({ item }) => <View
          style={{
            //  flex:1,
            width: "24%",
            margin:2
            // margin:5
          }}>
          <OneFeatureItem data={item} />
        </View>}

      />

      {/* {split(featuresConfig, 4).map((chunk,index) => {
           return <View key={"chunk-"+index} style={{
            flexDirection: "row",
            justifyContent:"space-between"
          }}>
            {chunk.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    //  flex:1,
                    width: "24%",
                    // margin:5
                  }}>
                  <OneFeatureItem data={item} />
                </View>
              )
            })}
    
          </View>
      })} */}



    </View>
  );
};


const styles = StyleSheet.create({
  itemsWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    flex: 1,
    marginVertical: -(gap / 2),
    marginHorizontal: -(gap / 2),
  },
  singleItem: {
    marginHorizontal: gap / 2,
    marginVertical: gap / 2,

    minWidth: childWidth,
    maxWidth: childWidth,
  },
});
export default Features
