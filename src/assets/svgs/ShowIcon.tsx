import {useGetColor} from '@src/hooks/useTheme';
import Svg, {Circle, ClipPath, Defs, G, Path} from 'react-native-svg';

const ShowIcon = (props: any) => {
  const borderEnableColor = props.color
    ? props.color
    : useGetColor('subtleGreen');

  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path d="M0 0h24v24H0z" />
      <Circle cx={12} cy={13} r={2} stroke={borderEnableColor} strokeLinejoin="round" />
      <Path
        stroke={borderEnableColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 7.5c-4.305 0-7.524 3.583-8.605 4.965a.86.86 0 0 0 0 1.07C4.476 14.917 7.695 18.5 12 18.5c4.305 0 7.524-3.583 8.605-4.965a.86.86 0 0 0 0-1.07C19.524 11.083 16.305 7.5 12 7.5Z"
      />
    </G>
   
  </Svg>
  );
};

export default ShowIcon
