import {useGetColor} from '@src/hooks/useTheme';
import React from 'react';
import {Text, StyleSheet, TextStyle, StyleProp} from 'react-native';

interface SalesWalaTextProps {
  children: string | JSX.Element | JSX.Element[] | React.ReactNode;
  color?: 'primary' | 'secondary' | string;
  fontSize?: number;
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
  style?: StyleProp<TextStyle> | undefined;
}

function SalesWalaText(props: SalesWalaTextProps): JSX.Element {
  const {children, color, fontSize, fontWeight, style} = props;

  const textColor = useGetColor(color ? color : 'primaryText');
  return (
    <Text
      style={[
        styles.text,
        {
          color: textColor,
          fontSize: fontSize ? fontSize : 25,
          fontWeight: fontWeight ? fontWeight : '500',
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'poppins',
    includeFontPadding: false,
    padding: 0,
  },
});
export default SalesWalaText;
