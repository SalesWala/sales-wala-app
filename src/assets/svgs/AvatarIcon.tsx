import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={26}
    height={26}
    data-name="Layer 1"
    viewBox="0 0 32 32"
    {...props}>
    <Path
      d="m22.82 20.55-.63-.18c-1.06-.29-1.79-.51-1.91-1.75 2.83-3 2.79-5.67 2.73-8.47V9a7.1 7.1 0 0 0-7-7A7.1 7.1 0 0 0 9 9v1.15c-.06 2.8-.1 5.45 2.73 8.47-.12 1.24-.85 1.46-1.91 1.75l-.63.18C5.61 21.74 2 25 2 29a1 1 0 0 0 2 0c0-3 3-5.61 5.82-6.55.16-.06.34-.1.52-.15a4.11 4.11 0 0 0 3.11-2.3 5.4 5.4 0 0 0 5.1 0 4.11 4.11 0 0 0 3.11 2.35c.18.05.36.09.52.15C25 23.39 28 26 28 29a1 1 0 0 0 2 0c0-4-3.61-7.26-7.18-8.45Zm-9.36-3C10.9 15 10.94 12.86 11 10.18V9a5 5 0 0 1 10 0v1.18c0 2.68.09 4.8-2.47 7.36a3.58 3.58 0 0 1-5.07 0Z"
      fill="#AAA"
    />
  </Svg>
);
export default SvgComponent;
