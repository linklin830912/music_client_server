import React, { useState } from "react";
import style from "./colorSelectOptionPart.module.css";
import { useFormContext } from "react-hook-form";
import LoadingIcon from "../../svg/icon/LoadingIcon";
import { useAppSelector } from "../../../app/hook";
import { getColorPaletteClass } from "../../../model/color/colorPalette";

type colorSelectOptionProps = {
  onDragEnter: (x: string) => void;
  onDrag(e: React.DragEvent<HTMLDivElement>): void;
  onDragEnd(e: React.DragEvent<HTMLDivElement>): void;
};

const ColorSelectOptionPart = (props: colorSelectOptionProps) => {
  const form = useFormContext();
  const { watch } = form;

  const candidateColors = watch("candidateColors") as string[] | undefined;
  const isLoadingImageAnalysis = watch("isLoadingImageAnalysis") as boolean;
  const colorPalette = getColorPaletteClass(
    useAppSelector((state) => state.themeMode.colorPaletteString)
  );

  return (
    <div className={style.container_div}>
      {isLoadingImageAnalysis && (
        <div className={style.loading_div}>
          <LoadingIcon fill={colorPalette.mainColor} />
        </div>
      )}
      {!isLoadingImageAnalysis && (
        <div className={style.candidate_div}>
          {(candidateColors
            ? candidateColors
            : colorPalette.getColorArray()
          )?.map((color, index) => (
            <div
              key={index}
              style={{ backgroundColor: color }}
              onDragEnter={(e) => {
                props.onDragEnter(e.currentTarget.style.backgroundColor);
                props.onDrag(e);
              }}
              onDrag={(e) => {
                props.onDrag(e);
              }}
              onDragEnd={(e) => {
                props.onDragEnd(e);
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorSelectOptionPart;
