import React from "react";
import style from "./crossIconStyle.module.css";

function CrossIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 50 50"
    >
      <defs>
        <mask id="maskIconCross">
          <rect x="0" y="0" width="50" height="50" fill="white" />
          <g id="cross">
            <line
              x1="12.34"
              y1="37.66"
              x2="37.66"
              y2="12.34"
              fill="none"
              stroke="black"
              strokeWidth="5px"
              strokeLinecap="round"
            />
            <line
              x1="37.66"
              y1="37.66"
              x2="12.34"
              y2="12.34"
              fill="none"
              stroke="black"
              strokeWidth="5px"
              strokeLinecap="round"
            />
          </g>
        </mask>
        <circle
          className={style.background_circle}
          id="backgroudShapeCross"
          cx="25"
          cy="25"
          r="25"
        />
      </defs>
      <use xlinkHref="#backgroudShapeCross" mask="url(#maskIconCross)" />
    </svg>
  );
}

export default CrossIcon;
