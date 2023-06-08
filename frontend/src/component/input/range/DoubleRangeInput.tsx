import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hook";
import { getColorPaletteClass } from "../../../model/color/colorPalette";
import style from "./doubleRangeInputStyle.module.css";
import RangeDomainFlag from "../../svg/flag/RangeDomainFlag";

export type range = {
  min: number;
  max: number;
};
type doubleRangeInputProps = {
  width: number;
  onChange: (range: range) => void;
  defaultRange: range;
  displayMinMax: { min: string; max: string };
};
export const DoubleRangeInput = (props: doubleRangeInputProps) => {
  const theme = useAppSelector((state) => state.themeMode.colorPaletteString);
  const colorPalette = getColorPaletteClass(theme);

  const [maxValue, setMaxValue] = useState<number>(60);
  const [minValue, setMinValue] = useState<number>(40);
  const [maxOpacity, setMaxOpacity] = useState<number>(0);
  const [minOpacity, setMinOpacity] = useState<number>(0);

  useEffect(() => {
    props.onChange({ min: minValue, max: maxValue });
  }, [maxValue, minValue]);
  return (
    <>
      <div
        className={style.container_div}
        style={{ width: `${props.width}px` }}
      >
        <input
          className={style.max_input}
          type="range"
          onChange={(x) => {
            if (Number(x.currentTarget.value) > minValue + 2) {
              setMaxValue(Number(x.currentTarget.value));
            } else {
              x.currentTarget.value = (minValue + 2).toString();
            }
          }}
          value={maxValue}
          onMouseEnter={(x) => setMaxOpacity(1)}
          onMouseLeave={(x) => setMaxOpacity(0)}
        />
        <input
          className={style.min_input}
          type="range"
          onChange={(x) => {
            if (Number(x.currentTarget.value) < maxValue - 2) {
              setMinValue(Number(x.currentTarget.value));
            } else {
              x.currentTarget.value = (maxValue - 2).toString();
            }
          }}
          value={minValue}
          onMouseEnter={(x) => setMinOpacity(1)}
          onMouseLeave={(x) => setMinOpacity(0)}
        />
        <div className={style.display_div}>
          <div
            className={style.track_div}
            style={{ backgroundColor: colorPalette.contrastColor }}
          >
            <div
              className={style.range_div}
              style={{
                backgroundColor: colorPalette.mainColor,
                left: `${minValue * props.width * 0.01}px`,
                width: `${(maxValue - minValue) * props.width * 0.01}px`,
              }}
            >
              <div style={{ opacity: minOpacity }}>
                <RangeDomainFlag text={props.displayMinMax.min} />
              </div>
              <div style={{ opacity: maxOpacity }}>
                <RangeDomainFlag text={props.displayMinMax.max} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
