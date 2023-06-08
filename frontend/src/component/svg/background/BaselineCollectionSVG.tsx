import React from "react";
import { Note, isSharp } from "../../../enum/frequency/Note";

type baselineCollectionSVGProps = {
  positions: number[];
  width: number;
  height: number;
  unitLength: number;
  isHorizontal: boolean;
  mainColor: string;
  startNote: Note;
};
const BaselineCollectionSVG = (props: baselineCollectionSVGProps) => {
  return (
    <>
      {!props.isHorizontal && (
        <>
          {props.positions?.map((x, index) => (
            <line
              key={index}
              x1={x}
              x2={x}
              y1="0"
              y2={props.height}
              stroke={props.mainColor}
              strokeWidth={isSharp(props.startNote + index) ? "1px" : "3px"}
            />
          ))}
        </>
      )}

      {props.isHorizontal && (
        <>
          {props.positions?.map((x, index) => (
            <line
              key={index}
              y1={x}
              y2={x}
              x1="0"
              x2={props.width}
              stroke={props.mainColor}
              strokeWidth={isSharp(props.startNote + index) ? "1px" : "3px"}
            />
          ))}
        </>
      )}
    </>
  );
};

export default BaselineCollectionSVG;
