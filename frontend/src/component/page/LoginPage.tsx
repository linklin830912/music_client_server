import React, { useContext, useState } from "react";
import * as Realm from "realm-web";
import LoginPanel from "../panel/login/LoginPanel";
import style from "./loginPageStyle.module.css";
import { FormProvider, useForm } from "react-hook-form";
import AuthenticateContext from "../../authentication/realm/AuthenticateContext";

export type loginPageFormData = {
  email: string;
  password: string;
};
const defaultLoginPageFormData: loginPageFormData = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const form = useForm<loginPageFormData>({
    defaultValues: defaultLoginPageFormData,
  });
  const { handleSubmit, setValue } = form;
  const app = useContext(AuthenticateContext);
  const [user, setUser] = useState(app.currentUser);
  return (
    <>
      <FormProvider {...form}>
        <div className={style.container_div}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.form_div}>
              <LoginPanel />
              {/*  todo: remember to delete ../panel/mode/LoginPanel when this is done */}
            </div>

            <div className={style.contorller_div}>
              <button type="submit">LOGIN</button>
              <button type="submit">SIGNIN</button>
              <button type="button" onClick={logoutUserAccount}>
                LOGOUT
              </button>
            </div>
          </form>
        </div>
      </FormProvider>
    </>
  );

  function onSubmit(data: loginPageFormData) {
    console.log("!!!onsubmit", data);
    signupUserAccount(data);
  }

  async function loginUserAccount(data: loginPageFormData) {
    const credentials = Realm.Credentials.emailPassword(data.email, "password");
    const loginUser = await app.logIn(credentials);

    setUser(loginUser);
  }

  async function signupUserAccount(data: loginPageFormData) {
    await app.emailPasswordAuth.registerUser({
      email: data.email,
      password: data.password,
    });

    loginUserAccount(data);
  }

  function logoutUserAccount() {
    app.currentUser?.logOut();

    setUser(null);
    clearAllValue();
  }

  function clearAllValue() {
    setValue("email", "");
    setValue("password", "");
  }
};

export default LoginPage;
