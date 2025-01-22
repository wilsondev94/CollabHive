import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} from "@/state/apiSlice";
import TaskColumn from "./TaskColumn";
import Loading from "./Loading";
import Error from "./Error";

interface BoardViewProps {
  id: string;
  setOpenNewTaskModal: (isOpen: boolean) => void;
}

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

export default function BoardView({ id, setOpenNewTaskModal }: BoardViewProps) {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ projectId: Number(id) });

  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  function moveTask(taskId: number, toStatus: string) {
    updateTaskStatus({ taskId, status: toStatus });
  }

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks || []}
            moveTask={moveTask}
            setOpenNewTaskModal={setOpenNewTaskModal}
          />
        ))}
      </div>
    </DndProvider>
  );
}
