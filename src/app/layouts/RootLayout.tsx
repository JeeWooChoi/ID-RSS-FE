import { Header } from "@/widgets/Header";
import { Sidebar } from "@/widgets/Sidebar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export const RootLayout = () => (
  <div className="flex flex-col h-screen ">
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          fontSize: "14px",
        },
      }}
    />
    <Header />
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto p-10 scrollbar scrollbar-thumb-gray-600 scrollbar-track-gray-900">
        <Outlet />
      </main>
    </div>
  </div>
);
