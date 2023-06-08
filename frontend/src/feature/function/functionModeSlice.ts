import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { functionModeType } from "./functionModeType";

interface functionMode {
  mode: functionModeType;
}
const initialState: functionMode = {
  mode: functionModeType.Record,
};

export const functionModeSlice = createSlice({
  name: "functionMode",
  initialState: initialState,
  reducers: {
    switchMode: (state, action: PayloadAction<{ mode: functionModeType }>) => {
      switch (action.payload.mode) {
        case functionModeType.Record:
          state.mode = functionModeType.Record;
          break;
        case functionModeType.Analysis:
          state.mode = functionModeType.Analysis;
          break;
        case functionModeType.Login:
          state.mode = functionModeType.Login;
          break;
        case functionModeType.Customize:
          state.mode = functionModeType.Customize;
          break;
      }
    },
  },
});

export const { switchMode } = functionModeSlice.actions;
export default functionModeSlice.reducer;
