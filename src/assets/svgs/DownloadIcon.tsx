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
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6M12 3v12m0 0 4-4m-4 4-4-4"
    />
  </Svg>
)
export default SvgComponent
