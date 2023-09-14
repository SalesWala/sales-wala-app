import {SalesWalaThemeContext} from '@src/contexts/SalesWalaThemeContext';
import {useContext} from 'react';

export const useThemeColors = () => {
  const themeContext = useContext(SalesWalaThemeContext);
  return themeContext.colors;
};

export const useGetColor = (colorName: string) => {
  const colors = useThemeColors();
  let color = colorName;

  // @ts-ignore
  if (colors[colorName]) {
    // @ts-ignore
    return colors[colorName];
  }
  return color;
};
