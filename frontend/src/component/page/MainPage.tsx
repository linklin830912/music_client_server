import React from "react";
import { Outlet } from "react-router-dom";
import WebPageFormatter from "../formatter/WebPageFormatter";
import style from "./mainPageStyle.module.css";

const MainPage = () => {
  return (
    <>
      <div className={style.container_div}>
        <WebPageFormatter>{<Outlet />}</WebPageFormatter>
      </div>
    </>
  );
};

export default MainPage;
