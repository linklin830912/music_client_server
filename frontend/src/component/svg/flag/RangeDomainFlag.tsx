import React from "react";
import { useAppSelector } from "../../../app/hook";
import { getColorPaletteClass } from "../../../model/color/colorPalette";

type rangeDomainFlagProps = {
  text: string;
};
const RangeDomainFlag = (props: rangeDomainFlagProps) => {
  const colorPalette = getColorPaletteClass(
    useAppSelector((state) => state.themeMode.colorPaletteString)
  );
  return (
    <>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 18 30"
      >
        <mask id="mask0">
          <rect x="0px" y="0px" width="18" height="30" fill="white"></rect>
          <circle cx="9" cy="9.02" r="7.5" fill="black" />
        </mask>
        <path
          d="M18,9c0,4.97-4.03,21-9,21S0,13.97,0,9s4.03-9,9-9S18,4.03,18,9z"
          mask="url(#mask0)"
          fill={colorPalette.mainColor}
        />
        <text
          transform="matrix(1 0 0 1 4 11) scale(0.45 0.45)"
          fill={colorPalette.mainColor}
        >
          {props.text}
        </text>
      </svg>
    </>
  );
};

export default RangeDomainFlag;
