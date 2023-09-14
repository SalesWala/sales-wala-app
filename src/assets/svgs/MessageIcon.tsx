import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} fill="none"


    viewBox="0 0 24 24" {...props}>
    <Path
      // stroke="#AAA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
      d="M8 12h.01M12 12h.01M16 12h.01m4.994 0a9 9 0 0 1-9 9h-9s1.56-3.744.936-5a9 9 0 1 1 17.064-4Z"
    />
  </Svg>
);
export default SvgComponent;
