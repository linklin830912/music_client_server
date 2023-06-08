import React, { useState, useEffect } from "react";
import RadioButton from "../style/RadioButton";
import PlayGraph from "../../svg/graph/PlayGraph";

type playButtonProps = {
  onChecked: (x: boolean) => void;
};

const PlayButton = (props: playButtonProps) => {
  return (
    <>
      <RadioButton
        displayName="PLAY"
        onChecked={(x) => {
          props.onChecked(x);
        }}
      >
        <PlayGraph />
      </RadioButton>
    </>
  );
};

export default PlayButton;
