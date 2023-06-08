import React, { useContext, useState } from "react";
import * as Realm from "realm-web";
import AuthenticateContext from "../../../authentication/realm/AuthenticateContext";
import ValidateTextInput from "../../input/text/ValidateTextInput";
import { useForm } from "react-hook-form";
import { userAuth } from "../../../model/user/userAuth";
import CheckIcon from "../../svg/icon/CheckIcon";
import {
  colorPalette,
  getColorPaletteClass,
} from "../../../model/color/colorPalette";
import { useAppSelector } from "../../../app/hook";

// Create a component that displays the given user's details
const UserDetail = ({ user }: { user: Realm.User }) => {
  return (
    <div>
      <h1>Logged in with anonymous id: {user.id}</h1>
    </div>
  );
};

// Create a component that lets an anonymous user log in
type LoginProps = {
  setUser: (user: Realm.User) => void;
};
const Login = ({ setUser }: LoginProps) => {
  const app = useContext(AuthenticateContext);
  const loginAnonymous = async () => {
    // app.emailPasswordAuth.registerUser({
    //   email: "linklin@gmail.com",
    //   password: "123123",
    // });

    // const credentials = Realm.Credentials.emailPassword(
    //   "linklin@gmail.com",
    //   "123123"
    // );
    // const user: Realm.User = await app.logIn(credentials);

    const user = await app.logIn(Realm.Credentials.anonymous());

    setUser(user);
  };
  return <button onClick={loginAnonymous}>Log In</button>;
};
type LogoutProps = {
  setUser: (user: Realm.User | null) => void;
};
const Logout = ({ setUser }: LogoutProps) => {
  const app = useContext(AuthenticateContext);
  const logoutAnonymous = async () => {
    await app.currentUser?.logOut();
    setUser(null);
  };
  return <button onClick={logoutAnonymous}>Log Out</button>;
};

type loginPanelProps = {
  isLogin: boolean;
  username?: string;
  avatarUrl?: string;
};

export function LoginPanel(props: loginPanelProps) {
  const app = useContext(AuthenticateContext);
  const [user, setUser] = React.useState<Realm.User | null>(app.currentUser);

  const { register, setValue, handleSubmit, watch, setError } = useForm();
  const [nickName, setNickName] = useState<string>();
  const email = watch("email");
  const password = watch("password");
  const theme = getColorPaletteClass(
    useAppSelector((state) => state.themeMode.colorPaletteString)
  );
  return (
    <>
      <form onSubmit={handleSubmit(loginSubmit)}>
        <button type="submit" onClick={loginUserAccount}>
          login
        </button>
        <button type="submit" onClick={signupUserAccount}>
          signup!
        </button>
        <button type="button" onClick={logoutUserAccount}>
          logout
        </button>
      </form>
    </>
  );

  async function loginUserAccount() {
    console.log("!!!loginUser", email);
    const credentials = Realm.Credentials.emailPassword(
      "email@emial.email",
      "password"
    );
    const loginUser = await app.logIn(credentials);

    setUser(loginUser);
  }
  async function signupUserAccount() {
    console.log("!!!signupUser", email);
    await app.emailPasswordAuth.registerUser({
      email: "email@emial.email",
      password: "password",
    });

    loginUserAccount();
  }
  function logoutUserAccount() {
    app.currentUser?.logOut();

    setUser(null);
  }
  function loginSubmit() {
    console.log("!!!submit");
  }
}
