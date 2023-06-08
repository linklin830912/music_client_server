import React, { useEffect, useState } from "react";
import { point } from "../../../utils/general/type/point";
import style from "./colorSelectDisplayPartStyle.module.css";
import { useFormContext } from "react-hook-form";

type colorSelectDisplayPartProps = {
  spreadPosition: point | undefined;
  reference: React.LegacyRef<HTMLDivElement> | undefined;
  label: string;
  field: string;
};

const ColorSelectDisplayPart = (props: colorSelectDisplayPartProps) => {
  const form = useFormContext();
  const { watch } = form;

  const fill = watch(props.field) as string | undefined;
  const [radius, setRadius] = useState<number>(0);

  useEffect(() => {
    let count = 0;
    let id = setInterval(tick, 0.5);
    function tick() {
      if (count < 1000) {
        count = count + 10;
        setRadius(count);
      } else {
        clearInterval(id);
      }
    }
  }, [fill]);

  return (
    <div className={style.container_div} ref={props.reference}>
      <svg width="100%" height="100%">
        <circle
          cx={props.spreadPosition?.x}
          cy={props.spreadPosition?.y}
          r={radius}
          fill={fill ? fill : "transparent"}
        />
      </svg>
      <div>
        <h3>{props.label}</h3>
      </div>
    </div>
  );
};

export default ColorSelectDisplayPart;
