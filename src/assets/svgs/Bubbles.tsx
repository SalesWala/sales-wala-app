import * as React from 'react';
import Svg, {SvgProps, Circle} from 'react-native-svg';
const Bubbles = (props: SvgProps) => (
  <Svg width={64} height={49} fill="none" {...props}>
    <Circle cx={58} cy={21} r={6} fill="#96BFFE" />
    <Circle cx={4} cy={4} r={4} fill="#FED883" />
    <Circle cx={46} cy={47} r={2} fill="#FEB5BD" />
  </Svg>
);
export default Bubbles;
