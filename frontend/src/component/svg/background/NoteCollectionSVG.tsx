import React, { useState, useEffect } from "react";
import { convertFrequencyToNumber } from "../../../utils/frequency/convertFrequencyToNumber";
import { point } from "../../../utils/general/type/point";
import { Note } from "../../../enum/frequency/Note";

export type noteCollectionSVGProps = {
  positions: number[];
  width: number;
  height: number;
  unitLength: number;
  noteLimitCount: number;
  isHorizontal: boolean;
  mainColor: string;
  startNote: Note;
  startPosition: number;
  unitNoteLength: number;
  unitBeatHeight: number;
};

const NoteCollectionSVG = (
  props: noteCollectionSVGProps & {
    pitchy: { pitch: number; clarity: number };
    beat: number;
    beatFrequency: number;
    beatPattern: boolean[];
    beatPatternSvgGId: string;
  }
) => {
  const [points, setPoints] = useState<point[]>([]);
  const [beats, setBeats] = useState<number[]>([]);

  const [beatCount, setBeatCount] = useState<number>(0);

  useEffect(() => {
    let currentPoints = points;
    let currentBeats = beats;

    const point = getNotePosition(props.pitchy.pitch, props.pitchy.clarity);
    const beat = beatCount === props.beatFrequency ? 1 : 0;

    if (points.length === props.noteLimitCount) {
      currentPoints = points.slice(1, props.noteLimitCount);
      currentBeats = beats.slice(1, props.noteLimitCount);
    }
    setPoints([...currentPoints, point]);
    setBeats([...currentBeats, beat]);

    setBeatCount(beatCount + 1 > props.beatFrequency ? 0 : beatCount + 1);
  }, [props.pitchy, props.beatFrequency]);
  return (
    <>
      {beats.map((beat, index) =>
        beat === 1 ? (
          <>
            <use
              href={`#${props.beatPatternSvgGId}`}
              transform={`translate(0 ${
                index * props.unitNoteLength - props.unitBeatHeight * 0.5
              })`}
            />
          </>
        ) : (
          <line key={index} x1={0} y1={0} x2={0} y2={0} />
        )
      )}
      {points.map((point, index) => (
        <line
          key={index}
          x1={point.x}
          y1={index * props.unitNoteLength}
          x2={point.y}
          y2={index * props.unitNoteLength}
          stroke={props.mainColor}
          strokeWidth={`${props.unitNoteLength}px`}
        />
      ))}
    </>
  );

  function getNotePosition(pitch: number, clarity: number): point {
    if (props.pitchy.clarity < 0.9) {
      return { x: 0, y: 0 };
    }
    const x1 =
      (convertFrequencyToNumber(props.pitchy.pitch) - props.startNote) *
        props.unitLength +
      props.startPosition;
    const x2 = x1 + props.unitLength;
    return { x: x1, y: x2 };
  }
};
export default NoteCollectionSVG;
