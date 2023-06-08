import React from "react";
import style from "./dragButtonStyle.module.css";
import CrossIcon from "../../svg/icon/CrossIcon";
import { useAppSelector } from "../../../app/hook";
import { getColorPaletteClass } from "../../../model/color/colorPalette";

type dragButtonProps = {
  label: string;
};
const DragButton = (props: dragButtonProps) => {
  const colorPalette = getColorPaletteClass(
    useAppSelector((state) => state.themeMode.colorPaletteString)
  );
  return (
    <div
      className={style.container_div}
      style={{ backgroundColor: colorPalette.backgroundColor }}
    >
      <div>
        <CrossIcon />
      </div>
      <h3>{props.label}</h3>
    </div>
  );
};

export default DragButton;
