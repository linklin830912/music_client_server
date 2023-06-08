import React, { useState } from "react";
import { FieldValues, ValidateResult, useFormContext } from "react-hook-form";
import CheckIcon from "../../svg/icon/CheckIcon";
import CrossIcon from "../../svg/icon/CrossIcon";
import style from "./validateTextInputStyle.module.css";

type validateTextInputProps<T extends FieldValues> = {
  field: T;
  placeholderLabel: string;
  isHidden: boolean;
  errorMessage: string;
  validate: (x: string) => ValidateResult;
};

function ValidateTextInput<T extends FieldValues>(
  props: validateTextInputProps<T>
) {
  const { register } = useFormContext<T>();
  return (
    <>
      <div className={style.container_div}>
        <div className={style.error_div}>
          {props.field?.error === props.errorMessage && (
            <>
              <CrossIcon />
              <h6>{props.field?.error}</h6>
            </>
          )}
          {props.field?.error !== undefined &&
            props.field?.error !== props.errorMessage && <>{<CheckIcon />}</>}
        </div>

        <div className={style.input_div}>
          <input
            className={style.validate_input}
            type={props.isHidden ? "password" : "text"}
            placeholder=" "
            {...register(props.field.name, {
              validate: {
                message: (value) => {
                  if (!props.validate(value)) {
                    return props.errorMessage;
                  }
                  return undefined;
                },
              },
            })}
          />
          <label className={style.validate_label}>
            {props.placeholderLabel}
          </label>
        </div>
      </div>
    </>
  );
}

export default ValidateTextInput;
