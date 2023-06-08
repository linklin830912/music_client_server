import React, { useState, useEffect } from "react";
import RecordButton from "../../button/record/RecordButton";
import style from "./recordLayerStyle.module.css";
import { useAppDispatch } from "../../../app/hook";
import {
  startRecording,
  stopRecording,
} from "../../../feature/record/recordModeSlice";
import IntervalRange from "../../input/IntervalRange";
import BeatPanel from "../../panel/record/BeatPanel";
import BeatButton from "../../button/record/BeatButton";
import SettingButton from "../../button/record/SettingButton";

const RecordLayer = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isBeating, setIsBeating] = useState<boolean>(true);
  const [isSetting, setIsSetting] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    setIsRecording(isRecording);
    if (isRecording) {
      dispatch(startRecording());
    } else {
      dispatch(stopRecording());
    }
  }, [isRecording]);

  return (
    <div
      className={
        isRecording
          ? style.container_to_side_div
          : style.container_to_center_div
      }
    >
      {isSetting && !isRecording && (
        <div className={style.setting_beat_div}>
          <BeatPanel onChecked={setIsBeating} isBeating={isBeating} />
        </div>
      )}
      <div className={style.baisc_div}>
        <div className={style.record_div}>
          <RecordButton onChecked={setIsRecording} />
        </div>

        <div className={style.others_div}>
          <BeatButton onChecked={setIsBeating} />
          <SettingButton onChecked={setIsSetting} />
        </div>
      </div>
      {isSetting && !isRecording && (
        <div className={style.setting_interval_div}>
          <IntervalRange />
        </div>
      )}
    </div>
  );
};

export default RecordLayer;
