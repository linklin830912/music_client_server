import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { colorPalette } from "../../model/color/colorPalette";

interface themeMode {
  colorPaletteString: string[];

  lightMainColor: string;
  lightBackgroundColor: string;
  lightContrastColor: string;
  darkMainColor: string;
  darkBackgroundColor: string;
  darkContrastColor: string;

  mode: boolean;
}

const initialState: themeMode = {
  mode: true,

  lightMainColor: "pink",
  lightBackgroundColor: "yellow",
  lightContrastColor: "aqua",
  darkMainColor: "white",
  darkBackgroundColor: "black",
  darkContrastColor: "gray",

  colorPaletteString: new colorPalette(
    "pink",
    "yellow",
    "aqua"
  ).getColorArray(),
};

const themeModeSlice = createSlice({
  name: "themeMode",
  initialState: initialState,
  reducers: {
    switchToLightTheme: (state) => {
      state.mode = false;
      state.colorPaletteString = new colorPalette(
        state.lightMainColor,
        state.lightBackgroundColor,
        state.lightContrastColor
      ).getColorArray();
    },
    switchToDarkTheme: (state) => {
      state.mode = true;
      state.colorPaletteString = new colorPalette(
        state.darkMainColor,
        state.darkBackgroundColor,
        state.darkContrastColor
      ).getColorArray();
    },
    swapColorOnTheme: (
      state,
      action: PayloadAction<{ color: string; index: number }>
    ) => {
      if (state.mode) {
        action.payload.index = action.payload.index + 3;
      }
      switch (action.payload.index) {
        case 0:
          state.lightMainColor = action.payload.color;
          break;
        case 1:
          state.lightBackgroundColor = action.payload.color;
          break;
        case 2:
          state.lightContrastColor = action.payload.color;
          break;
        case 3:
          state.darkMainColor = action.payload.color;
          break;
        case 4:
          state.darkBackgroundColor = action.payload.color;
          break;
        case 5:
          state.darkContrastColor = action.payload.color;
          break;
      }

      if (!state.mode) {
        state.colorPaletteString = new colorPalette(
          state.lightMainColor,
          state.lightBackgroundColor,
          state.lightContrastColor
        ).getColorArray();
      } else {
        state.colorPaletteString = new colorPalette(
          state.darkMainColor,
          state.darkBackgroundColor,
          state.darkContrastColor
        ).getColorArray();
      }
    },
  },
});

export const { switchToLightTheme, switchToDarkTheme, swapColorOnTheme } =
  themeModeSlice.actions;
export default themeModeSlice.reducer;
