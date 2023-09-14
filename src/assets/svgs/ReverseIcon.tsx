import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} {...props}>
    <Path
      fillRule="evenodd"
      d="M8 6H4.15c.375-.381.826-.8 1.35-1.22C7.263 3.37 9.799 2 13 2c5.766 0 10.534 4.355 11 10h2c-.55-6.674-6.185-12-13-12-3.799 0-6.763 1.63-8.75 3.22-.469.374-.886.75-1.25 1.104V1H1v7h7V6Zm10 14h3.85c-.375.381-.826.8-1.35 1.22C18.737 22.63 16.201 24 13 24 7.234 24 2.466 19.645 2 14H0c.55 6.674 6.185 12 13 12 3.799 0 6.763-1.63 8.75-3.22.469-.374.886-.75 1.25-1.104V25h2v-7h-7v2Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
