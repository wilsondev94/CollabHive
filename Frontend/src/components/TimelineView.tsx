import { useMemo, useState } from "react";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

import { useAppSelector } from "@/redux/Redux";
import { useGetTasksQuery } from "@/state/apiSlice";
import Loading from "./Loading";
import Error from "./Error";

interface TimelineViewProps {
  id: string;
  setOpenNewTaskModal: (isOpen: boolean) => void;
}

type TaskTypeItems = "task" | "milestone" | "project";

export default function TimelineView({
  id,
  setOpenNewTaskModal,
}: TimelineViewProps) {
  const darkMode = useAppSelector((state) => state.global.darkMode);

  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({
    projectId: Number(id),
  });
  console.log(tasks);

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTask = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate as string),
        end: new Date(task.dueDate as string),
        name: task.title,
        id: `Task-${task.id}`,
        type: "task" as TaskTypeItems,
        progress: (task.points && (task?.points / 10) * 100) || 0,
        isDisabled: false,
      })) || []
    );
  }, [tasks]);

  function handleViewModeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setDisplayOptions((previous) => ({
      ...previous,
      viewMode: e.target.value as ViewMode,
    }));
  }

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="me-2 text-lg font-bold dark:text-white">
          Project Tasks Timeline
        </h1>
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
      </div>
      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttTask}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            barBackgroundColor={darkMode ? "#101214" : "#aeb8c2"}
            barBackgroundSelectedColor={darkMode ? "#000" : "#9ba1e6"}
          />
        </div>
        <div className="px-4 pb-5 pt-1">
          <button
            className="hover:gb-blue-600 flex items-center rounded bg-blue-primary px-3 py-2 text-white"
            onClick={() => setOpenNewTaskModal(true)}
          >
            Add New Task
          </button>
        </div>
      </div>
    </div>
  );
}
