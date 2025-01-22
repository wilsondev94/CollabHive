"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Error from "@/components/Error";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { useAppSelector } from "@/redux/Redux";
import {
  Priority,
  Project,
  Task,
  useGetProjectsQuery,
  useGetTasksQuery,
} from "@/state/apiSlice";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

const COLORS = ["#0088fe", "#00c49f", "#ffbb28", "#ff8042"];

export default function HomePage() {
  const darkMode: boolean = useAppSelector((state) => state.global.darkMode);

  const {
    data: tasks,
    isLoading: loadingTasks,
    isError: tasksError,
  } = useGetTasksQuery({ projectId: parseInt("7") });

  const {
    data: projects,
    isLoading: loadingProjects,
    isError: projectsError,
  } = useGetProjectsQuery();

  if (loadingTasks || loadingProjects) return <Loading />;
  if (tasksError || projectsError || !tasks || !projects) return <Error />;

  const priorityCount = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
      const { priority } = task;

      acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;

      return acc;
    },
    {},
  );

  const taskPriorityDistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key],
  }));

  const statusCount = projects.reduce(
    (acc: Record<string, number>, project: Project) => {
      const status = project.endDate ? "Completed" : "Active";

      acc[status] = (acc[status] || 0) + 1;

      return acc;
    },
    {},
  );

  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));
  console.log(projectStatus);

  const taskColumns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "status", headerName: "Staus", width: 150 },
    { field: "priority", headerName: "Priority", width: 150 },
    { field: "dueDate", headerName: "Due Date", width: 150 },
  ];

  const chartColors = darkMode
    ? {
        bar: "#8884d8",
        barGrid: "#303030",
        pieFil: "#4a90e2",
        text: "#fffff",
      }
    : {
        bar: "#8884d8",
        barGrid: "#e0e0e0",
        pieFil: "#82ca9d",
        text: "#000000",
      };

  return (
    <div className="container h-full w-[100%] bg-gray-100 bg-transparent p-8">
      <Header name="Project Mangement Dashboard" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Task Priority distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskPriorityDistribution}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.barGrid}
              />
              <XAxis dataKey="name" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip
                contentStyle={{
                  width: "min-content",
                  height: "min-content",
                }}
              />
              <Legend />
              <Bar dataKey="count" fill={chartColors.bar} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-xl font-semibold dark:text-white">
            Project Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="count" data={projectStatus} fill="#82ca9d" label>
                {projectStatus.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
          <h3 className="mb-4 text-xl font-semibold dark:text-white">
            Your Tasks
          </h3>
          <div style={{ width: "100%", height: 400 }}>
            <DataGrid
              rows={tasks}
              columns={taskColumns}
              checkboxSelection
              loading={loadingTasks}
              getRowClassName={() => "data-grid-row"}
              getCellClassName={() => "data-grid-cell"}
              className={dataGridClassNames}
              sx={dataGridSxStyles(darkMode)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
