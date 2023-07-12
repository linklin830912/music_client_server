import style from "./webPageFormatterStyle.module.css";
import FunctionModeLayer from "../layer/mode/FunctionModeLayer";
import React, { useState, useEffect } from "react";
import RecordLayer from "../layer/record/RecordLayer";
import BackgroudLayer from "../layer/background/BackgroundLayer";
import { useAppSelector } from "../../app/hook";
import { functionModeType } from "../../feature/function/functionModeType";

type webPageFormatterProps = {
  children: string | JSX.Element | JSX.Element[];
};
const WebPageFormatter = (props: webPageFormatterProps) => {
  const mode = useAppSelector((state) => state.functionMode.mode);
  
  return (
    <>
      <div className={style.container_div}>
        <BackgroudLayer />
        <FunctionModeLayer />
        {mode === functionModeType.Record && <RecordLayer />}

        {props.children}
      </div>
    </>
  );
};

export default WebPageFormatter;
