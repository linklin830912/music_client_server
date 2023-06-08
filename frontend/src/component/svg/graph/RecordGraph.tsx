import React from "react";
import { useAppSelector } from "../../../app/hook";
import { getColorPaletteClass } from "../../../model/color/colorPalette";

const RecordGraph = () => {
  const mainColor = getColorPaletteClass(
    useAppSelector((state) => state.themeMode.colorPaletteString)
  ).mainColor;
  return (
    <>
      <defs>
        <mask id="recordMask">
          <rect x="0" y="0" width="30" height="30" fill={"white"} />
          <line
            x1="10.55"
            y1="10.52"
            x2="14.68"
            y2="10.52"
            strokeWidth="0.8px"
            stroke="black"
            strokeLinecap="round"
          />
          <line
            x1="10.55"
            y1="12.39"
            x2="14.68"
            y2="12.39"
            strokeWidth="0.8px"
            stroke="black"
            strokeLinecap="round"
          />
          <line
            x1="10.55"
            y1="14.26"
            x2="14.68"
            y2="14.26"
            strokeWidth="0.8px"
            stroke="black"
            strokeLinecap="round"
          />
        </mask>

        <path
          id="record"
          d="M15,19.02L15,19.02c-2.46,0-4.45-1.99-4.45-4.45V7.75c0-2.46,1.99-4.45,4.45-4.45h0
		c2.46,0,4.45,1.99,4.45,4.45v6.83C19.45,17.03,17.46,19.02,15,19.02z"
          stroke="transparent"
          fill={mainColor}
        />
      </defs>
      <use xlinkHref="#record" mask="url(#recordMask)"></use>

      <path
        d="M8.49,14.7c0,3.6,2.91,6.51,6.51,6.51s6.51-2.91,6.51-6.51"
        fill="transparent"
        strokeWidth="1.5px"
        stroke={mainColor}
      />
      <line
        x1="15"
        y1="21.21"
        x2="15"
        y2="26.7"
        strokeWidth="1.5px"
        stroke={mainColor}
        strokeLinecap="round"
      />
      <line
        x1="9.26"
        y1="26.7"
        x2="20.74"
        y2="26.7"
        strokeWidth="1.5px"
        stroke={mainColor}
        strokeLinecap="round"
      />
    </>
  );
};

export default RecordGraph;
