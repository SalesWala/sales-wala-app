import SalesWalaIcon from "@src/assets/svgs/SalesWalaIcon"
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
} from 'react-native-reanimated';
const SalesWalaRotatingIcon = () => {


    const rotation = useSharedValue(0);

    // Configure rotation animation
    rotation.value = withRepeat(withTiming(
        360, // Rotate 360 degrees
          {
            
          duration: 5000, // Animation duration in milliseconds
          easing: Easing.linear, // Easing function
          // loop: -1, // Loop indefinitely
        }
      ),-1);
  
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotate: `${rotation.value}deg` }],
      };
    });
  
    return <Animated.View style={[styles.box, animatedStyle]}>
           <SalesWalaIcon height={25} width={25} style={{
        height: 25, width: 25
      }} />
     </Animated.View>
  
      
}


const styles = StyleSheet.create({
    box: {
    //   width: 100,
    //   height: 100,
    //   backgroundColor: 'blue',
    },
  });



export default SalesWalaRotatingIcon