import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
  width={26} height={26}
    fill="none"
    stroke="#000"
    strokeWidth={3}
    viewBox="0 0 64 64"
    {...props}
  >
    <Path d="M11.51 20.66h8.38v16.55h-8.38a2 2 0 0 1-2-2V22.66a2 2 0 0 1 2-2ZM19.89 37.21V20.66s4.37.1 11.64 0 15.78-4.7 21.31-9.4a1 1 0 0 1 1.65.75V45.9a1 1 0 0 1-1.61.79c-3.56-2.8-12.42-9.06-21-9.32-5.02-.16-9.08-.16-11.99-.16Z" />
    <Path d="M23.29 53h-4.8a2 2 0 0 1-2-2l-1-13.78h8.8l1 13.78a2 2 0 0 1-2 2Z" />
  </Svg>
)
export default SvgComponent
