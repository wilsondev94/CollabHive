import { format } from "date-fns";
import { EllipsisVertical, MessageSquareMore, PlusIcon } from "lucide-react";
import { useDrag, useDrop } from "react-dnd";

import { Task as TaskType } from "@/state/apiSlice";
import Image from "next/image";

interface TaskColumnProps {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setOpenNewTaskModal: (isOpen: boolean) => void;
}

export default function TaskColumn({
  status,
  tasks,
  moveTask,
  setOpenNewTaskModal,
}: TaskColumnProps) {
  console.log(tasks);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const taskCount = tasks.filter((task) => task.status === status).length;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statusColor: any = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {status}
            {""}
            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {taskCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="h-6 w-5 items-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>

            <button
              className="mt-1 flex size-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
              onClick={() => setOpenNewTaskModal(true)}
            >
              <PlusIcon size={16} />
            </button>
          </div>
        </div>
      </div>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
}

interface TaskProps {
  task: TaskType;
}

function Task({ task }: TaskProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task?.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const taskTagSplit = task?.tags ? task?.tags.split(",") : [];

  const formattedStartDate = task?.startDate
    ? format(new Date(task.startDate), "P")
    : "";

  const formattedDueDate = task?.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";

  const numberComments = task?.comments ? task?.comments.length : 0;

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 rounded-b-md bg-white shadow dark:bg-dark-secondary ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={400}
          className="h-auto w-full rounded-t-md"
        />
      )}
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTagSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-sm"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button className="flex h-6 w-4 flex-shrink-0 items-center justify-between dark:text-neutral-500">
            <EllipsisVertical size={26} />
          </button>
        </div>
        <div className="items-centerm my-3 flex justify-between">
          <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
          {task.points && (
            <div className="text-xs font-semibold dark:text-white">
              {task.points} pts
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {formattedStartDate && <span>{formattedStartDate} - </span>}
          {formattedDueDate && <span>{formattedDueDate}</span>}
        </div>
        <p className="text-sm text-gray-600 dark:text-stone-500">
          {task.description}
        </p>
        <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark" />
        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px] overflow-hidden">
            {task.assignee && (
              <Image
                src={`/${task.assignee.profilePictureUrl!}`}
                key={task.assignee.userId}
                alt={task.assignee.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
            {task.author && (
              <Image
                src={`/${task.author.profilePictureUrl!}`}
                key={task.author.userId}
                alt={task.author.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
          </div>
          <div className="flex items-center text-gray-500 dark:text-neutral-500">
            <MessageSquareMore size={20} />
            <span className="ml-1 text-sm dark:text-neutral-400">
              {numberComments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
  <div
    className={`rounded-full p-2 py-1 text-xs font-bold ${priority === "Urgent" && "bg-red-200 text-red-700"} ${priority === "High" && "bg-yellow-200 text-yellow-700"} ${priority === "Low" && "bg-blue-200 text-blue-700"} ${priority === "Medium" && "bg-green-200 text-green-700"} $ ${priority === "Backlog" && "bg-gray-200 text-gray-700"}`}
  >
    {priority}
  </div>
);

// ${priority === "Urgent" ? "bg-red-200 text-red-700" : priority === "High" ? "bg-yellow-200 text-yellow-700" : priority === "Medium" ? "bg-blue-200 text-blue-700" : "bg-green-200 text-green-700"}
