import React from 'react';

const ThemeContext = React.createContext();

const Theme = {
    isLightTheme: true,
    light: {SecondaryCyan : "#49DADB",
            SecondaryPurple : "#8B6AE6",
            SubText : "#828282",
            Text : "#000000",
            Primary : "#ffffff" },
    dark: { SecondaryCyan : "#49DADB",
            SecondaryPurple : "#8B6AE6",
            SubText : "#D3D3D3",
            Text : "#ffffff",
            Primary : "#000000" },
  }
export {ThemeContext, Theme};