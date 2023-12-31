import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={28}
    height={28}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke={props.color?props.color:"#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.629 5.121 4.315 16.435M15.629 5.121l3.535 3.536M15.63 5.12l1.414-1.414a1 1 0 0 1 1.414 0l2.121 2.121a1 1 0 0 1 0 1.415l-1.414 1.414M7.851 19.97l-3.536-3.536m3.536 3.536L19.164 8.657M7.851 19.97l-4.597 1.06 1.061-4.596"
    />
  </Svg>
)
export default SvgComponent
