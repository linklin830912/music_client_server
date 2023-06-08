import React, { useState, useEffect } from "react";
import RadioButton from "../style/RadioButton";
import RecordGraph from "../../svg/graph/RecordGraph";

type recordButtonProps = {
  onChecked: (x: boolean) => void;
};

const RecordButton = (props: recordButtonProps) => {
  return (
    <>
      <RadioButton
        displayName="RECORD"
        onChecked={(x) => {
          props.onChecked(x);
        }}
      >
        <RecordGraph />
      </RadioButton>
    </>
  );
};

export default RecordButton;
