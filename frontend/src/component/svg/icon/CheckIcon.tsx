import React from "react";
import style from "./checkIconStyle.module.css";

function CheckIcon() {
  return (
    <>
      <svg viewBox="0 0 50 50">
        <defs>
          <circle
            className={style.background_circle}
            cx="25"
            cy="25"
            r="25"
            id="backgroudShapeCheck"
          />

          <mask id="maskIconCheck">
            <rect x="0" y="0" width="50" height="50" fill="white" />
            <polyline
              points="7.79,21.52 18,40.2 39.3,12.18"
              id="polylineMask"
              fill="none"
              stroke="black"
              strokeWidth="5px"
              strokeLinecap="round"
            />
          </mask>
        </defs>
        <use xlinkHref="#backgroudShapeCheck" mask="url(#maskIconCheck)" />
      </svg>
    </>
  );
}

export default CheckIcon;
