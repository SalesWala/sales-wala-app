import {useGetColor} from '@src/hooks/useTheme';
import {useState} from 'react';
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

const ShowHidePasswordIcon = ({isShow, onShow}: ShowHidePasswordIconProps) => {
  return (
    <TouchableOpacity
      onPress={onShow && onShow}
      style={{
        padding: 5,
        marginRight: 10,
      }}>
      {isShow ? <ShowIcon /> : <HideIcon />}
    </TouchableOpacity>
  );
};

const FormInput = (props: FormInputProps) => {
  const textColor = useGetColor('primaryText');
  const borderDisableColor = useGetColor('textSubtle');
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

    const borderRadius = withTiming(isFocused.value ? 20 : 14, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });

    const borderWidth = withTiming(isFocused.value ? 0.8 : 0.2, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });

    return {
      // transform: [{ scale }],
      borderColor,
      borderRadius,
      borderWidth,
    };
  });

  return (
    <Animated.View
      style={[
        {
          paddingVertical: 7,
          paddingHorizontal: 8,
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
            fontFamily: 'poppins',
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
  const borderDisableColor = useGetColor('textSubtle');
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

    const borderRadius = withTiming(isFocused.value ? 20 : 14, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });

    const borderWidth = withTiming(isFocused.value ? 0.8 : 0.2, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });

    return {
      // transform: [{ scale }],
      borderColor,
      borderRadius,
      borderWidth,
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
          paddingVertical: 7,
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
            fontFamily: 'poppins',
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
