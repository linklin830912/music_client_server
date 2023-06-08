import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  switchToDarkTheme,
  switchToLightTheme,
} from "../../../feature/theme/themeModeSlice";
import { SwitchButton } from "../../button/style/SwitchButton";
import { colorPalette } from "../../../model/color/colorPalette";

export const ThemeModePanel = () => {
  const dispatch = useAppDispatch();

  // todo color picker
  const lightTheme = new colorPalette("pink", "yellow", "aqua");
  const darkTheme = new colorPalette("green", "yellow", "gray");

  const [theme, setTheme] = useState<boolean>(true);
  const [lightThemeColor, setLightThemeColor] =
    useState<colorPalette>(lightTheme);
  const [darkThemeColor, setDarkThemeColor] = useState<colorPalette>(darkTheme);

  useEffect(() => {
    if (theme) {
      dispatch(switchToDarkTheme());
    } else {
      dispatch(switchToLightTheme());
    }
  }, [theme]);
  return (
    <>
      <div>
        <SwitchButton
          onChange={(x) => {
            setTheme(!x);
          }}
          initState={true}
        />

        <div></div>
      </div>
    </>
  );
};
