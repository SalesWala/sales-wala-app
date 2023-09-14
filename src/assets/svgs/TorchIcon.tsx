import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={20} height={24} fill="none" {...props}>
    <Path
      stroke="#242424"
      strokeLinecap="round"
      d="M12.5 22v-4.552c0-.716 0-1.075.12-1.405.119-.33.348-.605.807-1.155l2.776-3.332c.23-.275.344-.413.404-.578.06-.165.06-.344.06-.702V10c0-.943 0-1.414-.293-1.707C16.08 8 15.609 8 14.667 8H5.333c-.943 0-1.414 0-1.707.293-.293.293-.293.764-.293 1.707v.276c0 .358 0 .537.06.702.06.165.174.303.404.578l2.776 3.332c.459.55.688.825.807 1.155.12.33.12.689.12 1.405V22M12.5 16h-5"
    />
    <Path
      stroke="#242424"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M3.75 11h12.5"
    />
    <Path
      stroke="#242424"
      strokeLinecap="round"
      d="M10 5V2M6.667 5 5 3M13.333 5 15 3M10 19v2"
    />
  </Svg>
);
export default SvgComponent;
