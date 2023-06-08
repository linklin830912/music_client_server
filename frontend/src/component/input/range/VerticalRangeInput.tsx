import React, { useState, useRef } from "react";
import style from "./verticalRangeInputStyle.module.css";
import { point } from "../../../utils/general/type/point";

type verticalRangeInputProps = {
  onChange: (value: number) => void;
  onTextValueChange: (value: number) => number;
};
const VerticalRangeInput = (props: verticalRangeInputProps) => {
  const [isTextEdit, setIsTextEdit] = useState<boolean>(false);
  const [textBoxPosition, setTextBoxPosition] = useState<point>({ x: 0, y: 0 });
  const rangeValue = useRef<HTMLInputElement>(null);

  return (
    <div className={style.container_div}>
      <div className={style.vertical_input_track_div}></div>
      <input
        ref={rangeValue}
        defaultValue={100}
        type="range"
        className={style.vertical_input}
        onChange={(e) => {
          props.onChange(e.currentTarget.valueAsNumber);
        }}
        onDoubleClick={(e) => {
          setIsTextEdit(true);
          setTextBoxPosition({ x: e.clientX, y: e.clientY });
        }}
      />
      {isTextEdit && (
        <input
          className={style.vertical_text_input}
          style={{
            left: textBoxPosition.x,
            top: textBoxPosition.y,
          }}
          type="text"
          autoFocus={true}
          onBlur={(x) => setIsTextEdit(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = props.onTextValueChange(
                e.currentTarget.value as unknown as number
              );
              if (rangeValue.current?.value) {
                rangeValue.current.value = value as unknown as string;
              }
              props.onChange(value);
              setIsTextEdit(false);
            }
          }}
        />
      )}
    </div>
  );
};

export default VerticalRangeInput;
