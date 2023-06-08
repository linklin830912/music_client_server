import React from "react";
import { useAppSelector } from "../../../app/hook";
import { getColorPaletteClass } from "../../../model/color/colorPalette";
const DeleteIcon = () => {
  const mainColor = getColorPaletteClass(
    useAppSelector((state) => state.themeMode.colorPaletteString)
  ).mainColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 8 8"
      fill={mainColor}
    >
      <mask id="deleteMask0">
        <rect x="0" y="0" width="8" height="8" fill="white" />
        <rect x="5.07" y="2.21" width="0.35" height="4.02" fill="black" />
        <rect x="2.58" y="2.21" width="0.35" height="4.02" fill="black" />
        <rect x="3.82" y="2.21" width="0.35" height="4.02" fill="black" />
      </mask>

      <path
        mask="url(#deleteMask0)"
        d="M5.78,7.49H2.22c-0.17,0-0.3-0.12-0.31-0.27L1.7,1.73h4.6L6.08,7.22C6.08,7.37,5.94,7.49,5.78,7.49z"
      />
      <path d="M6.5,1.69L1.53,1.02l0.04-0.28c0.02-0.13,0.13-0.22,0.26-0.2l4.51,0.61c0.13,0.02,0.22,0.13,0.2,0.26L6.5,1.69z" />
      <path d="M5.04,1.2L3.06,0.94L3.1,0.71c0.02-0.13,0.13-0.22,0.26-0.2l1.51,0.2C5,0.73,5.09,0.85,5.07,0.97L5.04,1.2z" />
    </svg>
  );
};

export default DeleteIcon;
