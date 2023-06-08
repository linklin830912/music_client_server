import React from "react";
import { useAppSelector } from "../../../app/hook";
import { getColorPaletteClass } from "../../../model/color/colorPalette";
const BeatGraph = () => {
  const mainColor = getColorPaletteClass(
    useAppSelector((state) => state.themeMode).colorPaletteString
  ).mainColor;
  return (
    <>
      <mask id="mask1">
        <rect x="0px" y="0px" width="30" height="30" fill="black"></rect>
        <path
          fill="white"
          d="M18.85,25.09H9.4c-0.35,0-0.63-0.31-0.59-0.66L11.07,5c0.03-0.3,0.29-0.52,0.59-0.52h4.93c0.3,0,0.55,0.22,0.59,0.52
	l2.26,19.43C19.48,24.79,19.2,25.09,18.85,25.09z"
        />

        <path
          fill="white"
          d="M10.65,25.93h-0.1c-0.54,0-0.98-0.44-0.98-0.98v-0.59h2.07v0.59C11.64,25.49,11.2,25.93,10.65,25.93z"
        />
        <path
          fill="white"
          d="M17.7,25.93h-0.1c-0.54,0-0.98-0.44-0.98-0.98v-0.59h2.07v0.59C18.68,25.49,18.24,25.93,17.7,25.93z"
        />

        <path
          fill="black"
          d="M16.49,22.88h-4.73c-0.18,0-0.31-0.16-0.29-0.35l1.13-10.38c0.02-0.16,0.14-0.28,0.29-0.28h2.47
	c0.15,0,0.28,0.12,0.29,0.28l1.13,10.38C16.8,22.72,16.67,22.88,16.49,22.88z"
        />

        <rect
          fill="white"
          stroke="black"
          strokeWidth="0.5px"
          x="17.46"
          y="4.1"
          transform="matrix(0.9142 0.4053 -0.4053 0.9142 7.0625 -6.1156)"
          width="1.03"
          height="19.04"
        />
        <path
          fill="white"
          d="M21.15,8.97l-1.87-0.83c-0.24-0.11-0.35-0.39-0.24-0.63l0.02-0.04c0.11-0.24,0.39-0.35,0.63-0.24l1.87,0.83
		c0.24,0.11,0.35,0.39,0.24,0.63l-0.02,0.04C21.68,8.97,21.39,9.07,21.15,8.97z"
        />
      </mask>
      <rect
        x="0px"
        y="0px"
        width="30"
        height="30"
        fill={mainColor}
        mask="url(#mask1)"
      ></rect>
    </>
  );
};

export default BeatGraph;
