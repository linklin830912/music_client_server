import React, { useState, useEffect, useMemo } from "react";
import { DoubleRangeInput, range } from "./range/DoubleRangeInput";
import { Note, isSharp } from "../../enum/frequency/Note";
import { handleLineCountChange } from "../../feature/background/backgroundModeSlice";
import { useAppDispatch } from "../../app/hook";

export type noteRange = {
  min: string;
  max: string;
};
const IntervalRange = () => {
  const defaultRange = mapIntervalToPercentage({ min: Note.G3, max: Note.C6 });
  const [range, setRange] = useState<{ min: number; max: number }>(
    defaultRange
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const { noteIndexRange } = mapPercentageToInterval(range);
    dispatch(
      handleLineCountChange({
        lineCount: Math.abs(noteIndexRange.min - noteIndexRange.max),
      })
    );
  }, [dispatch, range]);
  const displayMinMax = useMemo<noteRange>(() => {
    const { noteRange } = mapPercentageToInterval(range);
    return noteRange;
  }, [range]);
  return (
    <>
      <DoubleRangeInput
        width={600}
        onChange={setRange}
        defaultRange={defaultRange}
        displayMinMax={displayMinMax}
      />
    </>
  );
};

export function mapPercentageToInterval(range: range) {
  const lnth = Object.keys(Note).length / 2;
  let minNote = Math.round((range.min * lnth) / 100);
  if (isSharp(minNote)) {
    minNote++;
    if (isSharp(minNote)) {
      minNote++;
    }
    if (minNote < 0) minNote = 0;
  }
  let maxNote = Math.round((range.max * lnth) / 100);
  if (isSharp(maxNote)) {
    maxNote++;
    if (isSharp(maxNote)) {
      maxNote++;
    }
  }
  if (maxNote >= lnth) maxNote = lnth - 1;

  return {
    noteRange: { min: Note[minNote], max: Note[maxNote] },
    noteIndexRange: { min: minNote, max: maxNote },
  };
}

export function mapIntervalToPercentage(noteRange: range) {
  const lnth = Object.keys(Note).length / 2;
  let minNote = Math.round((noteRange.min * 100) / lnth);

  if (minNote < 0) minNote = 0;

  let maxNote = Math.round((noteRange.max * 100) / lnth);

  if (maxNote >= 100) maxNote = 100;

  return { min: minNote, max: maxNote };
}

export default IntervalRange;
