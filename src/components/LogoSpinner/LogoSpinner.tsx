import * as React from 'react';
import {useEffect} from 'react';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';

import Svg, {SvgProps, Path} from 'react-native-svg';
const LogoSpinner = (props: SvgProps) => {
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
    );
    return () => cancelAnimation(rotation);
  }, []);

  return (
    <Animated.View
      style={[
        animatedStyles,
        {
          flexWrap: 'wrap',
          alignSelf: 'baseline',
        },
      ]}>
      <Svg
        width={100}
        height={100}
        fill="#64b5f6"
        viewBox="0 0 48 48"
        {...props}>
        <Path d="M37 36H17a5 5 0 0 1-5-5V11a5 5 0 0 1 5-5h20a5 5 0 0 1 5 5v20a5 5 0 0 1-5 5zm-16-6h14V18.5a5.5 5.5 0 0 0-5.5-5.5H18v14a3 3 0 0 0 3 3z" />
        <Path
          fill="#fb8c00"
          d="M31 42H11a5 5 0 0 1-5-5V17a5 5 0 0 1 5-5h20a5 5 0 0 1 5 5v20a5 5 0 0 1-5 5zm-13.5-6H30V21a3 3 0 0 0-3-3H15a3 3 0 0 0-3 3v9.5a5.5 5.5 0 0 0 5.5 5.5z"
        />
        <Path d="M36 26v1a3 3 0 0 1-3 3H23v6h14c2.75 0 5-2.25 5-5v-5h-6z" />
      </Svg>
    </Animated.View>
  );
};

export default LogoSpinner;
