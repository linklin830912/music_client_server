import React from "react";
import { useAppSelector } from "../../../app/hook";
import { getColorPaletteClass } from "../../../model/color/colorPalette";

type flatArrowProps = {};
const FlatArrow = (props: flatArrowProps) => {
  const colors = getColorPaletteClass(
    useAppSelector((state) => state.themeMode.colorPaletteString)
  );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 60 15"
      width="30px"
    >
      <polyline
        strokeWidth="5px"
        strokeLinecap="round"
        points="0,0 30,12 60,0 "
        stroke={colors.mainColor}
        fill="transparent"
      />
    </svg>
  );
};

export default FlatArrow;
