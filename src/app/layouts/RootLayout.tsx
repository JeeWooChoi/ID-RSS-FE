import { Header } from "@/widgets/Header";
import { Sidebar } from "@/widgets/Sidebar";
import { Outlet } from "react-router-dom";

export const RootLayout = () => (
  <div className="flex flex-col h-screen ">
    <Header />
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto m-10 ">
        <Outlet />
      </main>
    </div>
  </div>
);
