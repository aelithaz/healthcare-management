// src/components/Layout.tsx
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
        <div className="p-6">
          <Outlet />
        </div>
    </>
  );
}
