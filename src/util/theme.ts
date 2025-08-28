import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      gradient: string;
    };
  }
  interface ThemeOptions {
    custom?: {
      gradient?: string;
    };
  }
}
const mode: "light" | "dark"= "light" ;

export const theme = createTheme({
  palette:mode === "light"?
    {
      mode: "light",
      primary: {
        main: "#15597e",
        dark:"#ffffffff",
        contrastText:"#ffffff"
      },
      secondary: { 
        main: "#e8e8e88f" ,
        light: "#ffffff" ,
        contrastText:"#15597e"
      },
    }
    :
    {
      mode: "dark",
      primary: {
        main: "#15597e",
        dark:"#121212",
        contrastText:"#ffffff"
      },
      secondary: { 
        main: "#121212",
        light: "#1212128a" ,
        contrastText:"#ffffff"
      },
    },
  custom: {
    gradient: mode === "light"?
    "linear-gradient(to bottom, #11567bff, #0e6a9cff)"
    :
    "#121212",
  },
});