import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  switchToDarkTheme,
  switchToLightTheme,
} from "../../../feature/theme/themeModeSlice";
import { SwitchButton } from "../style/SwitchButton";

const ThemeSyncSwitchButton = () => {
  const theme = useAppSelector((state) => state.themeMode.mode);
  const dispatch = useAppDispatch();
  return (
    <SwitchButton
      initState={theme}
      onChange={(x) => {
        if (x) {
          dispatch(switchToDarkTheme);
        } else {
          dispatch(switchToLightTheme);
        }
      }}
    />
  );
};
export default ThemeSyncSwitchButton;
