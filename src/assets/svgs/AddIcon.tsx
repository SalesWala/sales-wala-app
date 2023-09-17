import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={40}
    height={40}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke={props.color?props.color:"#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v12M6 12h12"
    />
  </Svg>
)
export default SvgComponent
