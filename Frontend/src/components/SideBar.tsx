"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  BriefcaseIcon,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  XIcon,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/Redux";
import { useGetProjectsQuery } from "@/state/apiSlice";
import { setSidebarCollapse } from "@/state/globalSlice";

export interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export default function SideBar() {
  const [showProjects, setShowProjects] = useState(true);

  const [showPriority, setShowPriority] = useState(true);

  const { data } = useGetProjectsQuery();

  const dispatch = useAppDispatch();
  const sidebarCollapse = useAppSelector(
    (state) => state.global.sidebarCollapse,
  );

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        !sidebarCollapse
      ) {
        dispatch(setSidebarCollapse(true));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, sidebarCollapse]);

  const sideBarClassName = `fixed flex flex-col h-[100px] justify-between shadow-lg transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white w-64
  transform transition-transform duration-500
  ${sidebarCollapse ? "-translate-x-[16rem]" : "translate-x-0"}
  
  
  `;

  return (
    <div ref={sidebarRef} className={sideBarClassName}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        <div className="fixed z-50 flex max-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
            <Image
              src="/teaming-logo-01.png"
              alt="logo"
              width={100}
              height={100}
              className="-ml-2"
            />
          </div>
          {sidebarCollapse ? null : (
            <button
              onClick={() => dispatch(setSidebarCollapse(!sidebarCollapse))}
              className="py-3"
            >
              <XIcon className="size-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        <div className="mt-[64px] flex items-center gap-5 border-y-[1.5px] px-8 py-4 dark:border-gray-700">
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              WILSON TEAM
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[.1rem] size-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        <nav className="z-10 w-full">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={Settings} label="Settings" href="/settings" />
          <SidebarLink icon={User} label="Users" href="/users" />
          <SidebarLink icon={Users} label="Teams" href="/teams" />
        </nav>
        <button
          onClick={() => setShowProjects((previous) => !previous)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>

          {showProjects ? (
            <ChevronUp className="size-5" />
          ) : (
            <ChevronDown className="size-5" />
          )}
        </button>

        {showProjects &&
          data?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={BriefcaseIcon}
              label={project.name}
              href={`/projects/${project.id}`}
            />
          ))}
        <button
          onClick={() => setShowPriority((previous) => !previous)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priority</span>
          {showPriority ? (
            <ChevronUp className="size-5" />
          ) : (
            <ChevronDown className="size-5" />
          )}
        </button>
        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
            />
            <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}
      </div>
    </div>
  );
}

export function SidebarLink({ href, icon: Icon, label }: SidebarLinkProps) {
  const pathname = usePathname();

  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 px-8 py-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""}`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}
        <Icon className="ml-2 size-6 text-gray-800 dark:text-gray-100" />
        <span className="font-medium text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </div>
    </Link>
  );
}
