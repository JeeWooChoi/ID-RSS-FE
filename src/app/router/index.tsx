import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { ExcelChannelPage } from "@/pages/ExcelChannelPage";
import { ExcelAppleIdPage } from "@/pages/ExcelAppleIdPage";
import { ManualChannelPage } from "@/pages/ManualChannelPage";

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
  {
    path: "/excel-apple-id",
    element: <RootLayout />,
    children: [{ index: true, element: <ExcelAppleIdPage /> }],
  },
  {
    path: "/manual-channel",
    element: <RootLayout />,
    children: [{ index: true, element: <ManualChannelPage /> }],
  },
]);
