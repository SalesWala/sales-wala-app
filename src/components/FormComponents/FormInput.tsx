import { useGetColor } from '@src/hooks/useTheme';
import { useState } from 'react';
import {
  FlexStyle,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  ViewProps,
} from 'react-native';

import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import SalesWalaText from '../SalesWalaText/SalesWalaText';
import ShowIcon from '@src/assets/svgs/ShowIcon';
import HideIcon from '@src/assets/svgs/HideIcon';

interface FormInputProps extends TextInputProps {
  containerStyles?: ViewProps | FlexStyle;
  error?: string;
}

interface ShowHidePasswordIconProps extends TextInputProps {
  isShow?: boolean;
  onShow?: () => void;
}

const ShowHidePasswordIcon = ({ isShow, onShow }: ShowHidePasswordIconProps) => {

  const enableColor = useGetColor('subtleGreen');
  const disableColor = useGetColor('borderColor');

  return (
    <TouchableOpacity
      onPress={onShow && onShow}
      style={{
        padding: 5,
        marginRight: 10,
      }}>
      <ShowIcon color={isShow ? enableColor : disableColor} />
    </TouchableOpacity>
  );
};

const FormInput = (props: FormInputProps) => {
  const textColor = useGetColor('primaryText');
  const borderDisableColor = useGetColor('borderColor');
  const borderEnableColor = useGetColor('subtleGreen');

  const isFocused = useSharedValue(false); // To track focus state

  const handleFocus = () => {
    isFocused.value = !isFocused.value;
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    const borderColor = withTiming(
      isFocused.value ? borderEnableColor : borderDisableColor,
      {
        duration: 250,
        easing: Easing.out(Easing.ease),
      },
    );

    const borderRadius = withTiming(isFocused.value ? 14 : 8, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });

    const borderWidth = withTiming(isFocused.value ? 1 : 1, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });
    const paddingVertical = withTiming(isFocused.value ? 4 : 0, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });
    return {
      // transform: [{ scale }],
      borderColor,
      borderRadius,
      borderWidth,
      paddingVertical
    };
  });

  return (
    <Animated.View
      style={[
        {
          paddingVertical: 0,
          paddingHorizontal: 5,
        },
        animatedContainerStyle,
        props.containerStyles,
      ]}>
      <TextInput
        {...props}
        onFocus={handleFocus}
        onBlur={handleFocus}
        style={[
          {
            fontSize: 16,
            marginVertical: 10,
            fontWeight: '500',
            fontFamily: 'inter',

            // fontFamily: 'poppins',
            color: textColor,
            // backgroundColor: "red",
            paddingVertical: 2,
            paddingHorizontal: 12,
          },
          props.style,
        ]}
      />
      {props.error && (
        <SalesWalaText
          fontSize={10}
          fontWeight="600"
          color="danger"
          style={{
            paddingHorizontal: 2,
          }}>
          {props.error}
        </SalesWalaText>
      )}
    </Animated.View>
  );
};

export const FormPasswordInput = (props: FormInputProps) => {
  const textColor = useGetColor('primaryText');
  const borderDisableColor = useGetColor('borderColor');
  const borderEnableColor = useGetColor('subtleGreen');
  const [isShow, setShow] = useState(false);

  const isFocused = useSharedValue(false);

  const handleFocus = () => {
    isFocused.value = !isFocused.value;
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    const borderColor = withTiming(
      isFocused.value ? borderEnableColor : borderDisableColor,
      {
        duration: 250,
        easing: Easing.out(Easing.ease),
      },
    );

    const borderRadius = withTiming(isFocused.value ? 12 : 8, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });

    const paddingVertical = withTiming(isFocused.value ? 4 : 0, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });

    const borderWidth = withTiming(isFocused.value ? 1 : 1, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });

    return {
      borderColor,
      borderRadius,
      borderWidth,
      paddingVertical
    };
  });

  return (
    <Animated.View
      style={[
        {
          marginTop: 8,
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          // paddingVertical: 0,
          paddingHorizontal: 5,

        },
        animatedContainerStyle,
        props.containerStyles,
      ]}>
      <TextInput
        {...props}
        onFocus={handleFocus}
        onBlur={handleFocus}
        style={[
          props.style,
          {
            fontSize: 16,
            fontWeight: '500',
            fontFamily: 'inter',

            // fontFamily: 'poppins',
            color: textColor,
            flex: 1,
            paddingHorizontal: 12,
            paddingVertical: 2,
            marginVertical: 10,
          },
        ]}
        secureTextEntry={!isShow}
      />

      <ShowHidePasswordIcon
        isShow={isShow}
        onShow={() => {
          setShow(!isShow);
        }}
      />
    </Animated.View>
  );
};

export default FormInput;
