import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Note } from "../../enum/frequency/Note";
const noteLimitCount = 300;
const lineCount = 36;

interface backgroundMode {
  width: number;
  height: number;
  lineCount: number;
  noteLimitCount: number;
  viewBox: string;
  positions: number[];
  startPosition: number;
  startNote: Note;
  unitLength: number;
  unitNoteLength: number;
  isHorizontal: boolean;
}

const initBackgroundMode: backgroundMode = {
  width: window.innerWidth,
  height: window.innerHeight,
  lineCount: lineCount,
  noteLimitCount: noteLimitCount,
  viewBox: createViewbox(window.innerWidth, window.innerHeight),
  positions: linePosition(lineCount, window.innerWidth).positions,
  startPosition: linePosition(lineCount, window.innerWidth).startPosition,
  startNote: Note.G3,
  unitLength: linePosition(lineCount, window.innerWidth).unitLength,
  unitNoteLength: window.innerHeight / noteLimitCount,
  isHorizontal: false,
};
export const backgroundModeSlice = createSlice({
  name: "backgroundMode",
  initialState: initBackgroundMode,
  reducers: {
    fitWindowSize(state) {
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      state.viewBox = createViewbox(state.width, state.height);

      const result = horizontalOrVerticalLinePosition(
        state.isHorizontal,
        state.lineCount,
        state.width,
        state.height
      );
      state.positions = result.positions;
      state.startPosition = result.startPosition;
      state.unitLength = result.unitLength;
      state.unitNoteLength =
        (state.isHorizontal ? state.width : state.height) /
        state.noteLimitCount;
    },
    fitCustomSize(
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) {
      state.width = action.payload.width;
      state.height = action.payload.height;
      state.viewBox = createViewbox(
        action.payload.width,
        action.payload.height
      );
      const result = horizontalOrVerticalLinePosition(
        state.isHorizontal,
        state.lineCount,
        state.width,
        state.height
      );
      state.positions = result.positions;
      state.startPosition = result.startPosition;
      state.unitLength = result.unitLength;
      state.unitNoteLength =
        (state.isHorizontal ? state.width : state.height) /
        state.noteLimitCount;
    },
    handleLineCountChange(state, action: PayloadAction<{ lineCount: number }>) {
      const result = horizontalOrVerticalLinePosition(
        state.isHorizontal,
        action.payload.lineCount,
        state.width,
        state.height
      );

      state.positions = result.positions;
      state.unitLength = result.unitLength;
      state.startPosition = result.startPosition;
      state.unitNoteLength =
        (state.isHorizontal ? state.width : state.height) /
        state.noteLimitCount;
    },
    handleLineDirectionChange(
      state,
      action: PayloadAction<{ isHorizontal: boolean }>
    ) {
      const result = horizontalOrVerticalLinePosition(
        action.payload.isHorizontal,
        state.lineCount,
        state.width,
        state.height
      );

      state.positions = result.positions;
      state.unitLength = result.unitLength;
      state.startPosition = result.startPosition;
      state.unitNoteLength =
        (state.isHorizontal ? state.width : state.height) /
        state.noteLimitCount;
    },
  },
});

function createViewbox(viewBoxWidth: number, viewBoxHeight: number) {
  return `0 0 ${viewBoxWidth} ${viewBoxHeight}`;
}

function horizontalOrVerticalLinePosition(
  isHorizontal: boolean,
  lineCount: number,
  fullWidth: number,
  fullHeight: number
): {
  positions: number[];
  unitLength: number;
  startPosition: number;
} {
  if (isHorizontal) {
    return linePosition(lineCount, fullHeight);
  } else {
    return linePosition(lineCount, fullWidth);
  }
}

function linePosition(
  lineCount: number,
  fullLength: number
): { positions: number[]; unitLength: number; startPosition: number } {
  const positions = [] as number[];
  const sumLength = fullLength * 0.8;
  const unitLength = sumLength / lineCount;
  const startPosition = (fullLength - sumLength) * 0.5;
  for (var i = 0; i <= lineCount; i++) {
    positions.push(i * unitLength + startPosition);
  }
  return {
    positions: positions,
    unitLength: unitLength,
    startPosition: startPosition,
  };
}

export const { fitWindowSize, fitCustomSize, handleLineCountChange } =
  backgroundModeSlice.actions;
export default backgroundModeSlice.reducer;
