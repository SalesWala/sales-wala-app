import React from 'react';

import {createContext} from 'react';
import {salesWalaTheme} from '@src/theme/salesWalaTheme';
export interface ThemeContextProps {
  colors: {
    primary: string;
    subtleGreen: string;
    info: string;
    success: string;
    danger: string;
    warning: string;
    textSubtle: string;
    primaryText: string;
    absentColor: string;
    presentColor: string;
    holidayColor: string;
    leaveColor: string;
    borderColor: string
    secondarySubtle:string
  };
}

const defaultProps: ThemeContextProps = salesWalaTheme;
export const SalesWalaThemeContext =
  createContext<ThemeContextProps>(defaultProps);
