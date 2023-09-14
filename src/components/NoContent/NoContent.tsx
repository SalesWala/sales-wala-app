import {View} from 'react-native';
import SalesWalaText from '../SalesWalaText/SalesWalaText';
import {useGetColor} from '@src/hooks/useTheme';

import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const NoContentArt = (props: SvgProps) => (
  <Svg width={150} height={150} fill="none" {...props}>
    <Path
      fill="#242424"
      d="M75 150c41.421 0 75-33.579 75-75S116.421 0 75 0 0 33.579 0 75s33.579 75 75 75Z"
    />
    <Path
      fill="#fff"
      d="M120 150H30V53a16.018 16.018 0 0 0 16-16h58a15.906 15.906 0 0 0 4.691 11.308A15.89 15.89 0 0 0 120 53v97Z"
    />
    <Path
      fill="#242424"
      d="M75 102c13.255 0 24-10.745 24-24S88.255 54 75 54 51 64.745 51 78s10.745 24 24 24Z"
    />
    <Path
      fill="#E4E4E4"
      d="M88 108H62a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6ZM97 120H53a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m68 77.746 4.748 4.746L82.24 73"
    />
  </Svg>
);

interface NoContentProps {
  contentName: string;
  description?: string;
}
const NoContent = (props: NoContentProps) => {
  const primaryColor = useGetColor('primary');
  return (
    <View
      style={{
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        marginTop: 50,
        width: '100%',

      }}>
      <NoContentArt
        style={{
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          opacity: 1,
        }}
      />
      <SalesWalaText
        color={primaryColor}
        fontSize={18}
        fontWeight="600"
        style={{
          marginTop: 10,
        }}>
        No {props.contentName} Found
      </SalesWalaText>

      <SalesWalaText
        color={primaryColor}
        fontSize={14}
        fontWeight="400"
        style={{
          marginTop: 5,
          textAlign: 'center',
          marginHorizontal: 20,
        }}>
        {props.description
          ? props.description
          : `Click on the button at the bottom${'\n'}to create new ${
              props.contentName
            }`}
      </SalesWalaText>
    </View>
  );
};

export default NoContent
