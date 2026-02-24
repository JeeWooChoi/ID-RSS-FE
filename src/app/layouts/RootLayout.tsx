import { Outlet } from "react-router-dom";
import { Header } from "../../widgets/header";

export const RootLayout = () => (
  <div className="flex flex-col h-screen ">
    <Header />
    <main className="flex-1 overflow-auto">
      <Outlet />
    </main>
  </div>
);
