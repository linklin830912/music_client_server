import React from "react";
import ValidateTextInput from "../../input/text/ValidateTextInput";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from "react-hook-form";

type fieldData<T> = {
  name: string;
  defaultValue: T;
  error:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
};
type loginPanelData = {
  email: string;
  password: string;
};
const LoginPanel = () => {
  const {
    formState: { errors },
  } = useFormContext<loginPanelData>();

  return (
    <>
      <ValidateTextInput<fieldData<loginPanelData>>
        placeholderLabel={"EMAIL"}
        validate={(value) => value.includes("@")}
        errorMessage={"must include '@'"}
        isHidden={false}
        field={{
          name: "email",
          error: errors.email?.message,
          defaultValue: { email: "", password: "" },
        }}
      />
      <ValidateTextInput<fieldData<loginPanelData>>
        placeholderLabel={"PASSWORD"}
        validate={(value) => value.length > 6}
        errorMessage={"must be more than 6 char"}
        isHidden={false}
        field={{
          name: "password",
          error: errors.password?.message,
          defaultValue: { email: "", password: "" },
        }}
      />
    </>
  );
};

export default LoginPanel;
