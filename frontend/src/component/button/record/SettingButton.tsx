import React from "react";
import RadioButton from "../style/RadioButton";
import SettingGraph from "../../svg/graph/SettingGraph";

type settingButtonProps = {
  onChecked: (x: boolean) => void;
};

const SettingButton = (props: settingButtonProps) => {
  return (
    <>
      <RadioButton
        displayName="SETTING"
        onChecked={(x) => {
          props.onChecked(x);
        }}
      >
        <SettingGraph />
      </RadioButton>
    </>
  );
};

export default SettingButton;
