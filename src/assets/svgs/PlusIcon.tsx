import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
   
    stroke={props.stroke?props.stroke:"#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v12M6 12h12"
    />
  </Svg>
)
export default SvgComponent
