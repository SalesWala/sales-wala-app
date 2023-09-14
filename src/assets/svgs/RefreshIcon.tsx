import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={800} height={800} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke={props.color ? props.color : '#292D32'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.55 21.67C18.84 20.54 22 16.64 22 12c0-5.52-4.44-10-10-10C5.33 2 2 7.56 2 7.56m0 0V3m0 4.56H6.44"
    />
    <Path
      stroke={props.color ? props.color : '#292D32'}
      strokeDasharray="3 3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2 12c0 5.52 4.48 10 10 10"
    />
  </Svg>
);
export default SvgComponent;
