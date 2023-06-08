import React, { useState, useRef } from "react";
import { point } from "../../../utils/general/type/point";
import ColorSelectDisplayPart from "../../part/color/ColorSelectDisplayPart";
import style from "./imageSelectionPanelStyle.module.css";
import ColorSelectOptionPart from "../../part/color/ColorSelectOptionPart";
import { useFormContext } from "react-hook-form";
import { useAppDispatch } from "../../../app/hook";
import { swapColorOnTheme } from "../../../feature/theme/themeModeSlice";

const ImageSelectionPanel = () => {
  const form = useFormContext();
  const { setValue } = form;

  const [currentColor, setCurrentColor] = useState<string | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const [dragTop, setDragTop] = useState<number>(0);
  const [dragLeft, setDragLeft] = useState<number>(0);
  const [spreadPosition, setSpreadPosition] = useState<point>({ x: 0, y: 0 });

  const mainColorDivRef = useRef<HTMLDivElement>(null);
  const backgroundColorDivRef = useRef<HTMLDivElement>(null);
  const contractColorDivRef = useRef<HTMLDivElement>(null);
  const dragDivRef = useRef<HTMLDivElement>(null);
  const dragContainerDivRef = useRef<HTMLDivElement>(null);

  const mainColorRect = mainColorDivRef?.current?.getBoundingClientRect();
  const backgroundColorRect =
    backgroundColorDivRef?.current?.getBoundingClientRect();
  const contractColorRect =
    contractColorDivRef?.current?.getBoundingClientRect();
  const dragContainerDivRect =
    dragContainerDivRef?.current?.getBoundingClientRect();

  return (
    <div className={style.container_div}>
      <ColorSelectOptionPart
        onDragEnter={setCurrentColor}
        onDrag={repositionDragDiv}
        onDragEnd={pasteColorPalette}
      />

      <ColorSelectDisplayPart
        reference={mainColorDivRef}
        spreadPosition={spreadPosition}
        label={"main color"}
        field={"mainColor"}
      />
      <ColorSelectDisplayPart
        reference={backgroundColorDivRef}
        spreadPosition={spreadPosition}
        label={"background color"}
        field={"backgroundColor"}
      />
      <ColorSelectDisplayPart
        reference={contractColorDivRef}
        spreadPosition={spreadPosition}
        label={"contract color"}
        field={"contractColor"}
      />
      <div ref={dragContainerDivRef} className={style.drag_container_div}>
        <div
          ref={dragDivRef}
          className={style.drag_div}
          style={{
            backgroundColor: currentColor,
            opacity: currentColor ? 1 : 0,
            top: dragTop,
            left: dragLeft,
          }}
        ></div>
      </div>
    </div>
  );
  function repositionDragDiv(e: React.DragEvent<HTMLDivElement>) {
    if (dragDivRef.current && dragContainerDivRect) {
      e.preventDefault();
      setDragTop(e.clientY - dragContainerDivRect?.top);
      setDragLeft(e.clientX - dragContainerDivRect?.left);
    }
  }
  function pasteColorPalette(e: React.DragEvent<HTMLDivElement>) {
    if (
      mainColorRect &&
      backgroundColorRect &&
      contractColorRect &&
      dragContainerDivRect &&
      currentColor
    ) {
      if (checkInDiv(mainColorRect, e)) {
        setValue("mainColor", currentColor);
        dispatch(swapColorOnTheme({ color: currentColor, index: 0 }));
        setSpreadPosition({
          x: e.clientX - dragContainerDivRect?.left,
          y: e.clientY - dragContainerDivRect?.top,
        });
      } else if (checkInDiv(backgroundColorRect, e)) {
        setValue("backgroundColor", currentColor);
        dispatch(swapColorOnTheme({ color: currentColor, index: 1 }));
        setSpreadPosition({
          x: e.clientX - dragContainerDivRect?.left,
          y: e.clientY - dragContainerDivRect?.top,
        });
      } else if (checkInDiv(contractColorRect, e)) {
        setValue("contractColor", currentColor);
        dispatch(swapColorOnTheme({ color: currentColor, index: 2 }));
        setSpreadPosition({
          x: e.clientX - dragContainerDivRect?.left,
          y: e.clientY - dragContainerDivRect?.top,
        });
      }
    }
  }
  function checkInDiv(
    rect: DOMRect,
    e: React.DragEvent<HTMLDivElement>
  ): boolean {
    if (dragContainerDivRect) {
      if (
        e.clientY > rect.top &&
        e.clientY < rect.top + rect.height &&
        e.clientX > rect.left &&
        e.clientX < rect.left + rect.width
      ) {
        return true;
      }
    }
    return false;
  }
};

export default ImageSelectionPanel;
