import {useGetColor} from '@src/hooks/useTheme';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import SalesWalaText from '../SalesWalaText/SalesWalaText';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import LoadingSpinner from '../LoadingSpinner';

interface SalesWalaButton {
  text: String;
  onPress: () => void;
  isLoading?: boolean;
  secondary?: boolean;
  color?: string;
  disabled?: boolean;
  fontWeight?:
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}
const SalesWalaButton = (props: SalesWalaButton) => {
  const {secondary, isLoading} = props;
  const primaryColor = props.color
    ? useGetColor(props.color)
    : useGetColor('primary');

  const primaryStyle = {
    backgroundColor: primaryColor,
  };
  const secondaryStyle = {
    borderColor: primaryColor,
    borderWidth: 1,
  };

  const animatedButtonStyle = useAnimatedStyle(() => {
    // Customize animation values as needed
    const newWidth = withTiming(isLoading ? 50 : 200, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });

    const newOpacity = withTiming(isLoading ? 1 : 1, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });

    return {
      width: newWidth,
      opacity: newOpacity,
    };
  });
  return (
    <TouchableOpacity
      disabled={isLoading || props.disabled}
      onPress={props.onPress}
      style={[
        {
          // paddingVertical: 14,
          paddingHorizontal: 16,
          paddingVertical:12,
          alignContent: 'center',
          alignItems: 'center',
          marginTop: 8,
          borderRadius: 8
        },
        secondary ? secondaryStyle : primaryStyle,
      ]}>
      <Animated.View style={[animatedButtonStyle, {}]}>
        {props.isLoading ? (
          <LoadingSpinner />
        ) : (
          <SalesWalaText
            color={secondary ? primaryColor : '#fff'}
            fontWeight={props.fontWeight ? props.fontWeight : '500'}
            fontSize={14}
            style={{
              alignContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            {props.text}
          </SalesWalaText>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SalesWalaButton;
