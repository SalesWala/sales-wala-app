import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={26}
    height={26}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path fill="#fff" d="M0 0h24v24H0z" />
    <Path
      stroke={props.color?props.color:"#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
    />
  </Svg>
)
export default SvgComponent
