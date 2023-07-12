import React from "react";
import { ThemeModePanel } from "../panel/mode/ThemeModePanel";
import { useForm, FormProvider } from "react-hook-form";
import ImageAnalysisPanel from "../panel/customize/ImageAnalysisPanel";
import ImageSelectionPanel from "../panel/customize/ImageSelectionPanel";
import CloudGraph from "../svg/graph/CloudGraph";
import { useAppSelector } from "../../app/hook";
import { getColorPaletteClass } from "../../model/color/colorPalette";
import style from "./customizePageStyle.module.css";
import SwitchTextButton from "../button/style/SwitchTextButton";
import { useDispatch } from "react-redux";
import {
  switchToDarkTheme,
  switchToLightTheme,
} from "../../feature/theme/themeModeSlice";
import { switchMode } from "../../feature/function/functionModeSlice";
import { functionModeType } from "../../feature/function/functionModeType";

type customizePageData = {
  isLoadingImageAnalysis: boolean;
  candidateColors: string[] | undefined;
  mainColor: string[] | undefined;
  backgroundColor: string[] | undefined;
  contractColor: string[] | undefined;
  seed: number;
};

const CustomizePage = () => {
  const form = useForm<customizePageData>({
    defaultValues: {
      candidateColors: undefined,
      mainColor: undefined,
      backgroundColor: undefined,
      contractColor: undefined,
    },
  });
  const colorPalette = getColorPaletteClass(
    useAppSelector((state) => state.themeMode.colorPaletteString)
  );
  const dispatch = useDispatch();
dispatch(switchMode({mode: functionModeType.Customize}))
  return (
    <>
      <FormProvider {...form}>
        <div className={style.container_div}>
          <form>
            <div className={style.pick_div}>
              <SwitchTextButton
                onChange={(x) => {
                  if (x) {
                    dispatch(switchToDarkTheme());
                  } else {
                    dispatch(switchToLightTheme());
                  }
                }}
                initState={false}
                labels={{
                  unchecked: "LIGHT",
                  checked: "DARK",
                }}
              />
            </div>
            <div className={style.analysis_div}>
              <ImageAnalysisPanel>
                <div className={style.display_analysis_div}>
                  <CloudGraph fill={colorPalette.mainColor} />
                  <div>
                    <h3>COLOR CHOICES FROM IMAGE</h3>
                    <h4>DROP IMAGES / CLICK TO UPLOAD</h4>
                  </div>
                </div>
              </ImageAnalysisPanel>
            </div>
            <div className={style.selection_div}>
              <ImageSelectionPanel />
            </div>
          </form>
        </div>
      </FormProvider>
    </>
  );
};

export default CustomizePage;
