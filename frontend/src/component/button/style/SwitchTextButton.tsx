import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../app/hook";
import { getColorPaletteClass } from "../../../model/color/colorPalette";
import style from "./switchTextButtonStyle.module.css";

type switchTextButtonProps = {
  onChange: (x: boolean) => void;
  initState: boolean;
  labels: { unchecked: string; checked: string };
};
const SwitchTextButton = (props: switchTextButtonProps) => {
  const [checked, setChecked] = useState<boolean>(props.initState);
  useEffect(() => {
    props.onChange(checked);
  }, [checked]);

  const theme = useAppSelector((state) => state.themeMode.colorPaletteString);
  const colorPalette = getColorPaletteClass(theme);
  return (
    <>
      <div className={style.container_div}>
        <div>
          <input
            type="checkbox"
            onChange={() => {
              setChecked(!checked);
            }}
          ></input>
          <div className={style.display_div}>
            <svg viewBox="0 0 120 30" fill="transparent">
              <defs>
                <text x="5" y="21" id="text">
                  {checked ? props.labels.checked : props.labels.unchecked}
                </text>
                <rect
                  id="background"
                  x={0}
                  y={0}
                  width={120}
                  height={30}
                  fill="white"
                />
                <mask id="mask0">
                  <use xlinkHref="#background" />
                  <use xlinkHref="#text" fill="black" />
                </mask>
                <polyline id="poly" points="0,0 0,30 65,30 55,0" />
                <mask id="mask1">
                  <use xlinkHref="#background" />
                  <use xlinkHref="#poly" fill="black" />
                </mask>
              </defs>
              <use
                xlinkHref="#poly"
                fill={colorPalette.mainColor}
                mask="url(#mask0)"
              />
              <use
                xlinkHref="#text"
                fill={colorPalette.mainColor}
                mask="url(#mask1)"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default SwitchTextButton;
