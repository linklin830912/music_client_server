import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface recordMode {
  isRecording: boolean;
  isBeatOn: boolean;
  beat: number;
  beatPattern: boolean[];
}

const initRecordMode: recordMode = {
  isRecording: false,
  isBeatOn: false,
  beat: 30,
  beatPattern: [true],
};

const recordModeSlice = createSlice({
  name: "recordMode",
  initialState: initRecordMode,
  reducers: {
    startRecording: (state) => {
      state.isRecording = true;
    },
    stopRecording: (state) => {
      state.isRecording = false;
    },
    startBeat: (
      state,
      action: PayloadAction<{ beat: number; beatPattern: boolean[] }>
    ) => {
      state.isBeatOn = true;
      state.beat = action.payload.beat;
      state.beatPattern = action.payload.beatPattern;
    },
    stopBeat: (state) => {
      state.isBeatOn = false;
      state.beat = 30;
      state.beatPattern = [true];
    },
  },
});

export const { startRecording, stopRecording, startBeat, stopBeat } =
  recordModeSlice.actions;
export default recordModeSlice.reducer;
