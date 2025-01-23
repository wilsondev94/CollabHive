"use client";

import { useAppDispatch, useAppSelector } from "@/redux/Redux";
import { setDarkMode, setSidebarCollapse } from "@/state/globalSlice";
import { Menu, MoonIcon, Search, Settings, SunIcon } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  const dispatch = useAppDispatch();

  const sidebarCollapse = useAppSelector(
    (state) => state.global.sidebarCollapse,
  );

  const darkMode = useAppSelector((state) => state.global.darkMode);

  return (
    <div className="fixed top-0 z-10 flex w-full items-center justify-between bg-neutral-200 px-4 py-3 shadow-sm dark:bg-black">
      <div className="flex items-center gap-8">
        {!sidebarCollapse ? null : (
          <button
            onClick={() => dispatch(setSidebarCollapse(!sidebarCollapse))}
          >
            <Menu className="size-8 dark:text-white" />
          </button>
        )}

        <div className="relative flex h-min w-[200px]">
          <Search className="absolute left-[4px] top-1/2 mr-2 size-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>
      {/*  */}
      <div className="flex items-center">
        <button
          onClick={() => dispatch(setDarkMode(!darkMode))}
          className={
            darkMode
              ? `rounded p-2 text-white dark:hover:bg-gray-700`
              : `rounded p-2 hover:bg-gray-100`
          }
        >
          {darkMode ? (
            <SunIcon className="size-6 cursor-pointer dark:text-white" />
          ) : (
            <MoonIcon className="size-6 cursor-pointer" />
          )}
        </button>
        <Link
          href="/settings"
          className={
            darkMode
              ? `h-min w-min rounded p-2 dark:hover:bg-gray-700`
              : `h-min w-min rounded p-2 hover:bg-gray-100`
          }
        >
          <Settings className="size-6 cursor-pointer dark:text-white" />
        </Link>
        <div className="ml-2 mr-5 hidden max-h-[2em] w-[.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
}
