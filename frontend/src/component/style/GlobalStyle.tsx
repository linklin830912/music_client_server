import React from "react";
import { Global, css } from "@emotion/react";

type globalStyles = {
  mainColor: string;
  backgroundColor: string;
  contrastColor: string;
};

const GlobalStyles = (props: globalStyles) =>
  css({
    body: {
      color: props.mainColor,
      backgroundColor: props.backgroundColor,
      borderColor: props.mainColor,
      // whiteSpace: "nowrap",
      "--main-color": props.mainColor,
      "--background-color": props.backgroundColor,
      "--contrast-color": props.contrastColor,
    },
    div: {
      boxSizing: "border-box",
      "--dashed-border-color": props.mainColor,
      "--dashed-border-radius": "10px",
      "--dashed-border-width": "7px",
      "--hover-dashed-border-width": "10px",

      "--solid-border-color": props.mainColor,
      "--solid-border-radius": "10px",
      "--solid-border-width": "3px",
      "--hover-solid-border-width": "5px",

      "--mid-border-width": "2px",
      "--hover-mid-border-width": "4px",
    },
    button: {
      color: props.mainColor,
      backgroundColor: props.backgroundColor,
      fontSize: "18px",
    },
    "button:hover": {
      color: props.mainColor,
      backgroundColor: props.backgroundColor,
      outline: `${props.mainColor} solid 3px`,
      fontSize: "18px",
    },
    "input[type='text']": {
      outline: "none",
      borderRadius: "3px",
      backgroundColor: props.backgroundColor,
      border: `1.5px solid ${props.mainColor}`,
    },
    "input[type='text']:focus": {
      border: `2px solid ${props.mainColor}`,
    },
    h6: {
      // whiteSpace: "nowrap",
      fontSize: "10px",
    },
    h3: {
      // whiteSpace: "nowrap",
      fontSize: "26px",
    },
    "input[type='range']": {
      WebkitAppearance: "none" /*not working in css*/,
    },
    "input[type='range']::-webkit-slider-thumb": {
      WebkitAppearance: "none" /*not working in css*/,
    },
    "nav::after": {
      content: '""',
      display: "flex",
      justifyContent: "center",

      width: "0px",
      height: "1px",
      backgroundColor: `${props.backgroundColor}`,
      transition: "width 0.3s linear",
    },
    "nav:hover::after": {
      width: "100%",
      transition: "width 0.3s linear",
    },
    ":global(.page_div)": {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "red",
    },
  });

export default GlobalStyles;
