import { useAppSelector } from "./app/hook";
import { Global } from "@emotion/react";
import GlobalStyles from "./component/style/GlobalStyle";
import { getColorPaletteClass } from "./model/color/colorPalette";
import AppRouter from "./app/route/AppRouter";

const App = () => {
  const themeMode = useAppSelector(
    (state) => state.themeMode.colorPaletteString
  );
  const themeColorPalette = getColorPaletteClass(themeMode);

  return (
    <>
        <Global styles={GlobalStyles(themeColorPalette)} />
        <AppRouter />
    </>
  );
};

export default App;
