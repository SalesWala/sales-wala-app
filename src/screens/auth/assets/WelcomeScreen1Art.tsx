import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  G,
  Rect,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const WelcomeScreen1Art = (props: SvgProps) => (
  <Svg width={375} height={412} fill="none" {...props}>
    <Path
      fill="#DEF8CB"
      d="M106.143 306c-59.425 0-49.764-210.796 8.518-240.692 58.282-29.897 198.159 73.981 201.297 125.16C317.953 223.013 248.996 306 106.143 306Z"
    />
    <Path
      stroke="#BCD8A8"
      strokeWidth={2}
      d="M139.949 229.223c-57.002 1.623-33.356-115.035 12.383-131.699 78.381-28.557 223.848 182.218 13.346 182.218-51.395 0-126.319-86.851-37.399-205.623C178.634 6.86 263.23 126.93 287.221 154.983c23.992 28.053 58.32 110.172-82.814 137.717C21.22 328.452 65.959 184.823 69.26 157.382c5.06-42.061 22.906-99.698 70.689-107.337 67.127-10.73 126.495 26.001 176.992 75.263 56.323 54.945 57.174 182.365-196.256 205.641-57.741 5.303-75.939-49.859-69.103-101.726"
    />
    <G filter="url(#a)">
      <Rect
        width={120.103}
        height={157.182}
        fill="#E6A75E"
        rx={10.91}
        transform="matrix(.98215 -.18812 .1976 .98028 110.192 120.872)"
      />
    </G>
    <Path
      fill="#F1F0E2"
      d="m119.124 128.715 103.803-19.883 27.35 135.686L146.474 264.4z"
    />
    <G filter="url(#b)">
      <Path
        fill="#fff"
        d="M119.279 129.482 223.082 109.6s14.197 98.793 32.917 116.704c-15.256 25.613-85.695 32.736-107.32 36.878-4.763-31.731-29.4-133.7-29.4-133.7Z"
      />
    </G>
    <Path
      stroke="#606060"
      strokeWidth={3.273}
      d="m133.505 151.438 53.475-10.242"
    />
    <G filter="url(#c)">
      <Path
        stroke="#242424"
        strokeOpacity={0.3}
        strokeWidth={1.091}
        d="m132.865 132.055 79.425-15.214"
      />
    </G>
    <Path
      stroke="#606060"
      strokeWidth={3.273}
      d="m135.669 162.171 53.474-10.243"
    />
    <Path
      stroke="#606060"
      strokeLinejoin="round"
      strokeWidth={3.273}
      d="M0 0h16.014v15.64H0z"
      transform="matrix(.98215 -.18812 .1976 .98028 199.884 136.335)"
    />
    <Path
      stroke="#606060"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.947}
      d="m205.856 142.787 2.069 2.661 5.616-5.618"
    />
    <Path
      stroke="#606060"
      strokeWidth={3.273}
      d="m139.378 180.568 53.474-10.242M141.695 192.067l53.475-10.242"
    />
    <Path
      stroke="#606060"
      strokeLinejoin="round"
      strokeWidth={3.273}
      d="M0 0h16.014v15.64H0z"
      transform="matrix(.98215 -.18812 .1976 .98028 205.912 166.232)"
    />
    <Path
      fill="url(#d)"
      fillRule="evenodd"
      d="M154.454 101.786c-.363 3.894-2.657 7.932-6.509 8.67l-13.284 2.545a8.626 8.626 0 0 0-6.848 10.197l1.183 5.867a3.311 3.311 0 0 0 3.861 2.593l78.501-15.036a3.235 3.235 0 0 0 2.568-3.824l-1.183-5.867c-.952-4.726-5.562-7.821-10.297-6.914l-10.925 2.092c-3.852.738-7.543-2.153-9.39-5.625-2.233-4.194-6.731-8.405-15.72-6.683-8.989 1.722-11.518 7.278-11.957 11.985Zm13.72.815c1.954-.375 3.227-2.223 2.843-4.128-.384-1.905-2.279-3.146-4.234-2.772-1.954.375-3.227 2.223-2.843 4.128.384 1.905 2.28 3.146 4.234 2.772Z"
      clipRule="evenodd"
    />
    <G filter="url(#e)">
      <Rect
        width={78.467}
        height={3.91}
        fill="#fff"
        fillOpacity={0.2}
        rx={1.955}
        transform="matrix(.98215 -.18812 .1976 .98028 129.929 117.49)"
      />
    </G>
    <G filter="url(#f)">
      <Path
        fill="#505050"
        d="M198.768 276.433c.379.215 3.324-2.827 3.324-2.827l-.524-2.625-1.93 1.236s-1.379 3.928-.87 4.216Z"
      />
      <Path
        fill="#FFDABF"
        d="m201.989 273.779 8.645-7.902-1.354-2.685-3.926-2.223-3.064.186c-.818 2.842-2.514 9.068-2.755 11.235 1.21.173 2.14.998 2.454 1.389Z"
      />
      <Path
        fill="#F476A3"
        d="m210.634 265.877-2.169-1.867-3.436-1.945-2.739-.91 47.877-80.374 8.343 4.722-47.876 80.374Z"
      />
      <Path
        fill="#FFA8C7"
        d="m205.029 262.065-2.739-.91 47.877-80.374 2.454 1.389-47.592 79.895Z"
      />
      <Path
        fill="#D2638B"
        d="m210.634 265.877-2.169-1.867 47.591-79.896 2.454 1.389-47.876 80.374Z"
      />
      <Rect
        width={9.542}
        height={11.191}
        fill="#FDC56D"
        rx={1.545}
        transform="matrix(-.8744 -.49494 .5093 -.855 256.8 188.374)"
      />
      <Rect
        width={10.664}
        height={5.596}
        fill="#CECECE"
        rx={1.545}
        transform="matrix(-.8744 -.49494 .5093 -.855 257.291 188.652)"
      />
      <Rect
        width={10.664}
        height={1.119}
        fill="#EAEAEA"
        rx={0.56}
        transform="matrix(-.8744 -.49494 .5093 -.855 257.861 187.695)"
      />
      <Rect
        width={10.664}
        height={1.119}
        fill="#EAEAEA"
        rx={0.56}
        transform="matrix(-.8744 -.49494 .5093 -.855 259.001 185.781)"
      />
    </G>
    <Defs>
      <LinearGradient
        id="d"
        x1={166.622}
        x2={171.844}
        y1={96.926}
        y2={124.19}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#777575" />
        <Stop offset={1} stopColor="#2E2E2E" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default WelcomeScreen1Art;
