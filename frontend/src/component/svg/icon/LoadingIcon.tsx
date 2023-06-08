import React from "react";
import style from "./loadingIconStyle.module.css";

type loadingIconProps = {
  fill: string;
};

function LoadingIcon(props: loadingIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={120}
      height={50}
    >
      <circle
        className={style.circle0}
        cx="20"
        cy="15"
        r="12"
        fill={props.fill}
      />
      <circle
        className={style.circle1}
        cx="60"
        cy="15"
        r="12"
        fill={props.fill}
      />
      <circle
        className={style.circle2}
        cx="100"
        cy="15"
        r="12"
        fill={props.fill}
      />
    </svg>
  );
}

export default LoadingIcon;
