import React from "react";
import RadioButton from "../style/RadioButton";
import BeatGraph from "../../svg/graph/BeatGraph";

type beatButtonProps = {
  onChecked: (x: boolean) => void;
};
const BeatButton = (props: beatButtonProps) => {
  return (
    <RadioButton
      displayName="BEAT"
      onChecked={(x) => {
        props.onChecked(x);
      }}
    >
      <BeatGraph />
    </RadioButton>
  );
};
export default BeatButton;
