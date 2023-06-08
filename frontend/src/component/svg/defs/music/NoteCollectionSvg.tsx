import React from "react";
import style from "./noteCollectionSvgStyle.module.css";
import { useAppSelector } from "../../../../app/hook";
import { getColorPaletteClass } from "../../../../model/color/colorPalette";
import isTrue from "../../../../utils/general/isTrue";
type noteCollectionSvgProps = {
  notes: boolean[];
  offsetColor?: boolean;
  isSideLines: boolean;
};
const NoteCollectionSvg = (props: noteCollectionSvgProps) => {
  const colors = getColorPaletteClass(
    useAppSelector((state) => state.themeMode.colorPaletteString)
  );

  const color = isTrue(props.offsetColor)
    ? colors.backgroundColor
    : colors.mainColor;
  const width = 5;
  const gap = 5;
  const totalWidth = (width + gap) * props.notes.length + gap;
  return (
    <div className={style.container_div}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox={`0 0 ${totalWidth} 25`}
      >
        <defs>
          <g id="fillNoteSvg">
            <ellipse
              transform="matrix(0.9397 -0.342 0.342 0.9397 -7.2167 2.6751)"
              cx="3.98"
              cy="21.8"
              rx="4.08"
              ry="3.06"
            />
            <line x1="7.44" y1="21.4" x2="7.44" y2="0" />
          </g>

          <g id="emptyNoteSvg">
            <polyline points="0,25 7.44,18.66 7.44,0 " />
            <line x1="0" y1="18.66" x2="7.44" y2="25" />
          </g>
        </defs>
        {props.isSideLines && (
          <>
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="25"
              stroke={color}
              strokeWidth={"3px"}
            />
            <line
              x1={`${totalWidth}`}
              y1="0"
              x2={`${totalWidth}`}
              y2="25"
              stroke={color}
              strokeWidth={"3px"}
            />
          </>
        )}

        {props.notes.map((x, index) =>
          x ? (
            <use
              key={index}
              href="#fillNoteSvg"
              transform={`translate(${(width + gap) * index + gap} 0)`}
              stroke={color}
              fill={color}
            ></use>
          ) : (
            <use
              key={index}
              href="#emptyNoteSvg"
              transform={`translate(${(width + gap) * index + gap} 0)`}
              fill="transparent"
              stroke={color}
            ></use>
          )
        )}
      </svg>
    </div>
  );
};

export default NoteCollectionSvg;
