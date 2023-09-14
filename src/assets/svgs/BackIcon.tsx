import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const BackIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      // stroke="#242424"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.916 15.833S7.083 12.38 7.083 10c0-2.38 5.833-5.833 5.833-5.833"
    />
  </Svg>
);
export default BackIcon;
