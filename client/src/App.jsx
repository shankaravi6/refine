import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./context/theme/theme";
import { ThemeProvider } from "./context/theme/ThemeContext";
import "./App.css"
import AppRoutes from "./routes/AppRoutes";



const App = () => {
  const mode = useSelector((state) => state.shopping.mode);
  const theme = useMemo(() => themeSettings(mode), [mode]);
  return (
    <ThemeProvider theme={theme}>
     <AppRoutes/>
   </ThemeProvider>
  )
};

export default App;
