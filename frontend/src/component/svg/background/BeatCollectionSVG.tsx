import React from "react";

type beatCollectionSVGProps = {
  beatCount: number;
  lineWidth: number;
  unitHeight: number;
  mainColor: string;
  step: number;
};
const BeatCollectionSVG = (props: beatCollectionSVGProps) => {
  const beatArray = new Array(props.beatCount).fill(0);
  return (
    <>
      {beatArray.map((x, index) => {
        return (
          <line
            key={index}
            x1={0}
            y1={index * props.unitHeight - props.step}
            x2={props.lineWidth}
            y2={index * props.unitHeight - props.step}
            stroke={props.mainColor}
            strokeWidth={2}
          />
        );
      })}
    </>
  );
};

export default BeatCollectionSVG;
