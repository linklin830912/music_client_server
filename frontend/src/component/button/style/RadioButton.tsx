import { useAppSelector } from "../../../app/hook";
import { getColorPaletteClass } from "../../../model/color/colorPalette";
import isTrue from "../../../utils/general/isTrue";
import style from "./radioButtonStyle.module.css";
import React, { useEffect, useState } from "react";

type radioButtonProps = {
  children: string | JSX.Element | JSX.Element[];
  displayName: string;
  onChecked: (x: boolean) => void;
  disabled?: boolean;
};
const RadioButton = (props: radioButtonProps) => {
  const mainColor = getColorPaletteClass(
    useAppSelector((state) => state.themeMode.colorPaletteString)
  ).mainColor;
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <>
      <div
        onMouseMove={(x) => setIsHovered(true)}
        onMouseLeave={(x) => setIsHovered(false)}
        className={style.container_div}
      >
        <input
          disabled={isTrue(props.disabled)}
          type="checkbox"
          onChange={(e) => {
            props.onChecked(e.target.checked);
          }}
        ></input>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 30 30"
        >
          <defs>
            <path
              id="radioButton_border"
              d="M27.74,29.12H2.26c-0.76,0-1.38-0.62-1.38-1.38V2.26c0-0.76,0.62-1.38,1.38-1.38h25.49
                c0.76,0,1.38,0.62,1.38,1.38v25.49C29.12,28.51,28.51,29.12,27.74,29.12z"
            />
            <mask id={`radioButton_border_mask_${props.displayName}`}>
              <use href="#radioButton_border" fill="white"></use>
              <text
                textAnchor="middle"
                x="15"
                y="20"
                transform=" scale(0.3)"
                transform-origin="15 15"
                fill="black"
              >
                {props.displayName}
              </text>
            </mask>
          </defs>
          {isHovered && (
            <use
              href="#radioButton_border"
              mask={`url(#radioButton_border_mask_${props.displayName})`}
              fill={mainColor}
            ></use>
          )}
          {!isHovered && (
            <>
              <use
                href="#radioButton_border"
                stroke={mainColor}
                fill="transparent"
                strokeWidth={1}
              ></use>
              {props.children}
            </>
          )}
        </svg>
      </div>
    </>
  );
};

export default RadioButton;
