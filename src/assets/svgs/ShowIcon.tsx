import {useGetColor} from '@src/hooks/useTheme';
import Svg, {Path} from 'react-native-svg';

const ShowIcon = (props: any) => {
  const borderEnableColor = props.color
    ? props.color
    : useGetColor('subtleGreen');

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      fill="none"
      {...props}>
      <Path
        fill={borderEnableColor}
        d="M14 4.667c2.413 0 4.7.837 6.693 2.387 1.992 1.537 3.688 3.79 4.905 6.607a.85.85 0 0 1 0 .667c-2.435 5.634-6.772 9.005-11.598 9.005h-.011c-4.815 0-9.152-3.371-11.587-9.005a.85.85 0 0 1 0-.667c2.435-5.635 6.772-8.994 11.587-8.994H14Zm0 4.808c-2.515 0-4.553 2.025-4.553 4.525 0 2.489 2.038 4.514 4.553 4.514 2.504 0 4.541-2.025 4.541-4.514 0-2.5-2.037-4.525-4.541-4.525Z"
        //   opacity={0.4}
      />
      <Path
        fill={borderEnableColor}
        d="M16.836 13.996c0 1.55-1.275 2.817-2.834 2.817-1.57 0-2.846-1.267-2.846-2.817 0-.192.023-.372.057-.553h.057a2.33 2.33 0 0 0 2.334-2.241c.125-.021.261-.034.398-.034a2.836 2.836 0 0 1 2.834 2.828Z"
      />
    </Svg>
  );
};

export default ShowIcon
