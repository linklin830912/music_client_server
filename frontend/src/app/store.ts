import { configureStore } from "@reduxjs/toolkit";
import functionModeReducer from "../feature/function/functionModeSlice";
import themeModeReducer from "../feature/theme/themeModeSlice";
import recordModeReducer from "../feature/record/recordModeSlice";
import backgroundModeReducer from "../feature/background/backgroundModeSlice";

export const store = configureStore({
  reducer: {
    functionMode: functionModeReducer,
    themeMode: themeModeReducer,
    recordMode: recordModeReducer,
    backgroundMode: backgroundModeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
