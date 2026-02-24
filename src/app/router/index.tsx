import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { ExcelChannelPage } from "@/pages/ExcelChannelPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <ExcelChannelPage /> }],
  },
  {
    path: "/excel-channel",
    element: <RootLayout />,
    children: [{ index: true, element: <ExcelChannelPage /> }],
  },
]);
