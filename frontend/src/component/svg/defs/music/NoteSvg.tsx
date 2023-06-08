import React from "react";

enum NoteSvgEnum {
  fillNoteSvg,
  emptyNoteSvg,
  lineNoteSvg,
}
type noteSvgProps = {
  color: string;
  noteHref: number;
  id: number;
};
const NoteSvg = (props: noteSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox={`0 0 8 25`}
    >
      <defs>
        <g id={`fillNoteSvg${props.id}`}>
          <ellipse
            transform="matrix(0.9397 -0.342 0.342 0.9397 -7.2167 2.6751)"
            cx="3.98"
            cy="21.8"
            rx="4.08"
            ry="3.06"
            fill={props.color}
          />
          <line x1="7.44" y1="21.4" x2="7.44" y2="0" stroke={props.color} />
        </g>
        <g id={`emptyNoteSvg${props.id}`} stroke={props.color}>
          <polyline points="0,25 7.44,18.66 7.44,0 " fill="transparent" />
          <line x1="0" y1="18.66" x2="7.44" y2="25" />
        </g>
        <line
          id={`lineNoteSvg${props.id}`}
          x1="4"
          y1="0"
          x2="4"
          y2="25"
          stroke={props.color}
          strokeWidth={"3px"}
        />
      </defs>
      <use href={`#${NoteSvgEnum[props.noteHref]}${props.id}`} />
    </svg>
  );
};

export default NoteSvg;
