"use client";

import { useAppSelector } from "@/redux/Redux";
import { Priority, Task, useGetUserTasksQuery } from "@/state/apiSlice";
import { useState } from "react";
import Error from "./Error";
import NewTaskModal from "./NewTaskModal";
import Header from "./Header";
import Loading from "./Loading";
import TaskCard from "./TaskCard";
import { DataGrid } from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { reusableColumn } from "./ReusableColumn";

interface PriorityProps {
  priority: Priority;
}

export default function ReusablePriorityPage({ priority }: PriorityProps) {
  const [view, setView] = useState("list");
  const [openNewTaskModal, setOpenNewTaskModal] = useState(false);

  const darkMode = useAppSelector((state) => state.global.darkMode);

  const userId = 1;

  const {
    data: userTasks,
    isLoading,
    isError,
  } = useGetUserTasksQuery(userId || 0, { skip: userId === null });
  console.log(userTasks);

  const filteredTasks = userTasks?.filter(
    (task: Task) => task.priority === priority,
  );

  if (isError || !userTasks) return <Error />;

  return (
    <div className="m-5 p-4">
      <NewTaskModal
        isOpenNewTaskForm={openNewTaskModal}
        onCloseNewTaskForm={() => setOpenNewTaskModal(false)}
      />
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setOpenNewTaskModal(true)}
          >
            Add Task
          </button>
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`rounded px-4 py-2 ${view === "list" ? "bg-gray-300" : "bg-white"} `}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`rounded px-4 py-2 ${view === "table" ? "bg-gray-300" : "bg-white"} `}
          onClick={() => setView("table")}
        >
          Table{" "}
        </button>
      </div>
      
      {isLoading ? (
        <Loading />
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" && (
          <div style={{ width: "100%", overflow: "auto" }}>
            <DataGrid
              rows={filteredTasks}
              columns={reusableColumn}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(darkMode)}
            />
          </div>
        )
      )}
    </div>
  );
}
