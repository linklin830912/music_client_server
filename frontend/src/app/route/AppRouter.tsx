import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../../component/page/ErrorPage";
import MainPage from "../../component/page/MainPage";
import LoginPage from "../../component/page/LoginPage";
import AnalysisPage from "../../component/page/AnalysisPage";
import CustomizePage from "../../component/page/CustomizePage";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "analysis",
          element: <AnalysisPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "customize",
          element: <CustomizePage />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {},
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
