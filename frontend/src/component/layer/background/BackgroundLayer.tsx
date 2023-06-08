import React, { useState, useEffect, useMemo } from "react";
import style from "./backgroudLayer.module.css";
import NoteCollection from "../../svg/background/NoteCollection";
import { useAppSelector } from "../../../app/hook";
import { getColorPaletteClass } from "../../../model/color/colorPalette";
import BaselineCollectionSVG from "../../svg/background/BaselineCollectionSVG";
import { mapBeatToBeatFrequency } from "../../../utils/record/mapBeatToBeatFrequency";

const BackgroudLayer = () => {
  const {
    positions,
    width,
    height,
    unitLength,
    isHorizontal,
    viewBox,
    startNote,
    startPosition,
    unitNoteLength,
    noteLimitCount,
  } = useAppSelector((state) => state.backgroundMode);
  const colors = getColorPaletteClass(
    useAppSelector((state) => state.themeMode.colorPaletteString)
  );
  const { isRecording, isBeatOn, beat, beatPattern } = useAppSelector(
    (state) => state.recordMode
  );

  const unitBeatHeight = useMemo<number>(() => {
    return (
      ((mapBeatToBeatFrequency(beat) / noteLimitCount) * height) /
      beatPattern.length
    );
  }, [beat, beatPattern, unitNoteLength, noteLimitCount, height]);
  const beatPatternSvgGId = "beatPatternSvgG";

  return (
    <div className={style.container_div}>
      <svg viewBox={viewBox}>
        <defs>
          <g id={beatPatternSvgGId}>
            {beatPattern.map((x, index) => {
              return (
                <line
                  key={index}
                  x1={0}
                  y1={index * unitBeatHeight}
                  x2={width}
                  y2={index * unitBeatHeight}
                  stroke={x ? colors.mainColor : colors.contrastColor}
                  strokeWidth={x ? unitNoteLength * 2 : unitNoteLength * 0.5}
                />
              );
            })}
          </g>
        </defs>
        <NoteCollection
          isRecording={isRecording}
          isBeatOn={isBeatOn}
          beat={beat}
          beatPattern={beatPattern}
          beatPatternSvgGId={beatPatternSvgGId}
          svgProps={{
            positions: positions,
            width: width,
            height: height,
            noteLimitCount: noteLimitCount,
            unitLength: unitLength,
            isHorizontal: isHorizontal,
            startNote: startNote,
            mainColor: colors.mainColor,
            startPosition: startPosition,
            unitNoteLength: unitNoteLength,
            unitBeatHeight: unitBeatHeight,
          }}
        />

        <BaselineCollectionSVG
          positions={positions}
          width={width}
          height={height}
          unitLength={unitLength}
          isHorizontal={isHorizontal}
          mainColor={colors.mainColor}
          startNote={startNote}
        />
      </svg>
    </div>
  );
};
export default BackgroudLayer;
