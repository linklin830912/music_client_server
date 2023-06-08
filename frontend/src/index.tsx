import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import AuthenticateContext, {
  app,
} from "./authentication/realm/AuthenticateContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AuthenticateContext.Provider value={app}>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthenticateContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
