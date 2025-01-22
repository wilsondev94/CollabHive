import { Task, useGetTasksQuery } from "@/state/apiSlice";
import Header from "./Header";
import TaskCard from "./TaskCard";
import Loading from "./Loading";
import Error from "./Error";

interface ListViewProps {
  id: string;
  setOpenNewTaskModal: (isOpen: boolean) => void;
}

export default function ListView({ id, setOpenNewTaskModal }: ListViewProps) {
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
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setOpenNewTaskModal(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
}
