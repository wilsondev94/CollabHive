"use client";

import { useEffect } from "react";
import StoreProvider, { useAppSelector } from "../redux/Redux";

import NavBar from "./NavBar";
import SideBar from "./SideBar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const sidebarCollapse = useAppSelector(
    (state) => state.global.sidebarCollapse,
  );

  const darkMode = useAppSelector((state) => state.global.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="relative flex min-h-screen w-full bg-gray-900">
      <SideBar />
      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${sidebarCollapse ? "" : "md:pl-64"} ${!sidebarCollapse && "bg-black opacity-15 blur-[1.5px]"} `}
      >
        <NavBar />
        <div className="mt-[64px]">{children}</div>
      </main>
    </div>
  );
}

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
}
