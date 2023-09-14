import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={25} height={25} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      //   stroke="#1C274C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M20 7H9a5 5 0 1 0 0 10h7m4-10-3-3m3 3-3 3"
    />
  </Svg>
);
export default SvgComponent;
