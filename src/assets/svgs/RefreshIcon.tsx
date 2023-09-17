import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={props.fill?props.fill:"#000"}
      d="M21.369 13.583a.5.5 0 0 0-.986-.166l.986.166ZM12 20.5A8.5 8.5 0 0 1 3.5 12h-1a9.5 9.5 0 0 0 9.5 9.5v-1ZM3.5 12A8.5 8.5 0 0 1 12 3.5v-1A9.5 9.5 0 0 0 2.5 12h1ZM12 3.5a8.5 8.5 0 0 1 7.617 4.723l.895-.446A9.5 9.5 0 0 0 12 2.5v1Zm8.383 9.917A8.503 8.503 0 0 1 12 20.5v1c4.708 0 8.615-3.424 9.369-7.917l-.986-.166Z"
    />
    <Path
      fill={props.fill?props.fill:"#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.472 2.422v5.656h-5.657"
    />
  </Svg>
)
export default SvgComponent
