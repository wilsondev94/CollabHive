"use client";

import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useMemo, useState } from "react";

import { useAppSelector } from "@/redux/Redux";
import { useGetProjectsQuery } from "@/state/apiSlice";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Header from "@/components/Header";

type TaskTypeItems = "task" | "milestone" | "project";

export default function TimelineView() {
  const darkMode = useAppSelector((state) => state.global.darkMode);

  const { data: projects, error, isLoading } = useGetProjectsQuery();

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTask = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project.startDate as string),
        end: new Date(project.endDate as string),
        name: project.name,
        id: `Project-${project.id}`,
        type: "project" as TaskTypeItems,
        progress: 50,
        isDisabled: false,
      })) || []
    );
  }, [projects]);

  function handleViewModeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setDisplayOptions((previous) => ({
      ...previous,
      viewMode: e.target.value as ViewMode,
    }));
  }

  if (isLoading) return <Loading />;
  if (error || !projects) return <Error />;

  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Projects Timeline" />
        <div className="relative inline-block w-64">
          <select
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </header>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttTask}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            projectBackgroundColor={darkMode ? "#101214" : "#1f2937"}
            projectProgressColor={darkMode ? "#1f2937" : "#aebac2"}
            projectProgressSelectedColor={darkMode ? "#000" : "#9ba1a6"}
          />
        </div>
      </div>
    </div>
  );
}
