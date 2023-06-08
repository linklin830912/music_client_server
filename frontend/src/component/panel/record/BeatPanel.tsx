import React, { useState, useEffect } from "react";
import style from "./beatPanelStyle.module.css";
import DeleteIcon from "../../svg/icon/DeleteIcon";
import VerticalRangeInput from "../../input/range/VerticalRangeInput";
import NoteSvg from "../../svg/defs/music/NoteSvg";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { getColorPaletteClass } from "../../../model/color/colorPalette";
import {
  mapBeatToPercentage,
  mapPercentageToBeat,
} from "../../../utils/record/mapPercentageToBeat";
import { startBeat } from "../../../feature/record/recordModeSlice";

type beatPanelProps = {
  onChecked: (x: boolean) => void;
  isBeating: boolean;
};
const BeatPanel = (props: beatPanelProps) => {
  const colors = getColorPaletteClass(
    useAppSelector((state) => state.themeMode.colorPaletteString)
  );
  const dispatch = useAppDispatch();

  const [beat, setBeat] = useState<number>(30);
  const [beatPattern, setBeatPattern] = useState<boolean[]>([true]);

  useEffect(() => {
    dispatch(startBeat({ beat: beat, beatPattern: beatPattern }));
  }, [beatPattern, beat]);

  return (
    <div className={style.container_div}>
      {props.isBeating && (
        <>
          <div className={style.noteCollectionSvg_div}>
            <div className={style.noteCollectionSvg_display_div}>
              {beatPattern.map((note, index) => (
                <NoteSvg
                  key={index}
                  color={colors.backgroundColor}
                  noteHref={note ? 0 : 1}
                  id={index}
                />
              ))}
            </div>

            <div className={style.noteCollectionSvg_buttons_div}>
              <button
                disabled={beatPattern.length > 16}
                onClick={(x) => {
                  setBeatPattern([...beatPattern, true]);
                }}
              >
                <NoteSvg color={colors.mainColor} noteHref={0} id={17} />
              </button>

              <button
                disabled={beatPattern.length > 16}
                onClick={(x) => {
                  setBeatPattern([...beatPattern, false]);
                }}
              >
                <NoteSvg color={colors.mainColor} noteHref={1} id={18} />
              </button>

              <button
                disabled={beatPattern.length === 1}
                onClick={(x) => {
                  setBeatPattern(beatPattern.slice(0, beatPattern.length - 1));
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
          <div className={style.adjust_div}>
            <div className={style.adjust_display_div}>{beat}</div>
            <VerticalRangeInput
              onChange={(x) => {
                setBeat(mapPercentageToBeat(x));
              }}
              onTextValueChange={(x) => {
                return mapBeatToPercentage(x);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default BeatPanel;
