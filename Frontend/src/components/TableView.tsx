import { DataGrid } from "@mui/x-data-grid";

import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useAppSelector } from "@/redux/Redux";
import { useGetTasksQuery } from "@/state/apiSlice";
import Error from "./Error";
import Header from "./Header";
import Loading from "./Loading";
import { reusableColumn } from "./ReusableColumn";

interface TableViewProps {
  id: string;
  setOpenNewTaskModal: (isOpen: boolean) => void;
}

export default function TableView({ id, setOpenNewTaskModal }: TableViewProps) {
  const darkMode = useAppSelector((state) => state.global.darkMode);

  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({
    projectId: Number(id),
  });
  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="h-[540px] w-full px-4 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          isSmallText
          buttonComponent={
            <button
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setOpenNewTaskModal(true)}
            >
              Add Task
            </button>
          }
        />
      </div>

      <DataGrid
        rows={tasks || []}
        columns={reusableColumn}
        className={dataGridClassNames}
        sx={dataGridSxStyles(darkMode)}
      />
    </div>
  );
}
