import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SettingIcon = (props: SvgProps) => (
  <Svg width={26} height={26} fill="none" {...props}>
    <Path
      stroke="#AAA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13 10.292a2.708 2.708 0 1 1 0 5.416 2.708 2.708 0 0 1 0-5.416Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#AAA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21.849 7.854a2.669 2.669 0 0 0-3.661-.987c-1.115.647-2.508-.163-2.508-1.459 0-1.49-1.2-2.7-2.68-2.7a2.69 2.69 0 0 0-2.68 2.7c0 1.296-1.394 2.106-2.507 1.459a2.67 2.67 0 0 0-3.662.987 2.71 2.71 0 0 0 .982 3.688c1.113.649 1.113 2.268 0 2.916a2.71 2.71 0 0 0-.982 3.688 2.67 2.67 0 0 0 3.661.988c1.113-.648 2.507.162 2.507 1.458 0 1.49 1.2 2.7 2.68 2.7a2.69 2.69 0 0 0 2.681-2.7c0-1.296 1.393-2.106 2.508-1.458a2.67 2.67 0 0 0 3.66-.988 2.71 2.71 0 0 0-.98-3.688c-1.113-.649-1.114-2.268 0-2.916a2.71 2.71 0 0 0 .98-3.688Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SettingIcon;
