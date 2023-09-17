import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={26}
    height={26}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke={props.color?props.color:"#000"}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.014 6.871c-.667 3.19 1.846 6.989 5 10.144 3.156 3.155 6.954 5.667 10.144 5 2.624-.548 3.963-1.945 4.717-3.136.26-.411.13-.945-.26-1.235l-3.693-2.754a1 1 0 0 0-1.305.094l-1.96 1.96s-1.904-.62-4.428-3.143c-2.524-2.524-3.143-4.43-3.143-4.43l1.96-1.959a1 1 0 0 0 .094-1.305L6.386 2.415c-.291-.39-.824-.521-1.235-.26-1.191.753-2.589 2.092-3.137 4.716Z"
      />
    </G>
    
  </Svg>
)
export default SvgComponent
