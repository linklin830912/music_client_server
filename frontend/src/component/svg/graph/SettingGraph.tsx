import React from "react";
import { useAppSelector } from "../../../app/hook";
import { getColorPaletteClass } from "../../../model/color/colorPalette";
const SettingGraph = () => {
  const colors = getColorPaletteClass(
    useAppSelector((state) => state.themeMode.colorPaletteString)
  );
  return (
    <>
      <defs>
        <rect id="settingGraphBackground" x="0" y="0" width="30" height="30" />
        <mask id="settingGraphMask">
          <use href="#settingGraphBackground" fill="black" />
          <path
            d="M24.79,19.03l-1.65,2.86c-0.12,0.22-0.4,0.3-0.62,0.18l-2.79-1.4c-0.7,0.62-1.53,1.1-2.43,1.41l-0.18,3.11
	c-0.02,0.25-0.22,0.45-0.47,0.45h-3.3c-0.25,0-0.45-0.2-0.47-0.45l-0.18-3.11c-0.9-0.31-1.73-0.79-2.43-1.41l-2.79,1.4
	c-0.22,0.12-0.5,0.03-0.62-0.18l-1.65-2.86c-0.12-0.22-0.06-0.49,0.15-0.63l2.61-1.71c-0.09-0.45-0.14-0.92-0.14-1.4
	c0-0.49,0.05-0.96,0.14-1.41l-2.61-1.71c-0.21-0.14-0.27-0.42-0.15-0.63l1.65-2.86c0.12-0.22,0.4-0.29,0.62-0.18l2.79,1.4
	c0.7-0.62,1.53-1.1,2.43-1.41l0.18-3.11c0.02-0.25,0.22-0.44,0.47-0.44h3.3c0.25,0,0.45,0.19,0.47,0.44l0.18,3.11
	c0.9,0.31,1.73,0.79,2.43,1.41l2.79-1.4c0.22-0.11,0.5-0.03,0.62,0.18l1.65,2.86c0.12,0.22,0.06,0.49-0.15,0.63l-2.61,1.71
	c0.09,0.45,0.14,0.92,0.14,1.41c0,0.48-0.05,0.95-0.14,1.4l2.61,1.71C24.86,18.53,24.92,18.81,24.79,19.03z"
            fill="white"
          />
          <circle cx="14.78" cy="15.28" r="3.86" fill="black" />
        </mask>
      </defs>
      <use
        href="#settingGraphBackground"
        fill={colors.mainColor}
        mask="url(#settingGraphMask)"
      />
    </>
  );
};
export default SettingGraph;
