import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../app/hook";
import { getColorPaletteClass } from "../../../model/color/colorPalette";
import style from "./switchButtonStyle.module.css";

type switchButtonProps = {
  onChange: (x: boolean) => void;
  initState: boolean;
};
export const SwitchButton = (props: switchButtonProps) => {
  const [checked, setChecked] = useState<boolean>(props.initState);
  useEffect(() => {
    props.onChange(checked);
  }, [checked]);

  const theme = useAppSelector((state) => state.themeMode.colorPaletteString);
  const colorPalette = getColorPaletteClass(theme);
  return (
    <>
      <div className={style.container_div}>
        <div
          className={style.track_div}
          style={{ backgroundColor: colorPalette.contrastColor }}
        ></div>
        <input
          type="checkbox"
          onChange={() => {
            setChecked(!checked);
          }}
        ></input>
        <div
          className={style.thumb_div}
          style={{ backgroundColor: colorPalette.mainColor }}
        ></div>
      </div>
    </>
  );
};
