import { Task } from "@/state/apiSlice";
import { format } from "date-fns";
import Image from "next/image";

interface TaskCardProps {
  task: Task;
}
export default function TaskCard({ task }: TaskCardProps) {
  console.log(task);

  return (
    <div className="mb-3 rounded bg-white px-3 py-3 shadow dark:bg-dark-secondary dark:text-white">
      {task?.attachments && task.attachments.length > 0 && (
        <div className="mb-3">
          <strong>Attachments: </strong>
          <div className="flex flex-wrap">
            {task?.attachments && task.attachments.length > 0 && (
              <Image
                src={`/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName}
                width={400}
                height={400}
                className="mt-3 rounded-md"
              />
            )}
          </div>
        </div>
      )}

      <p>
        <strong>ID: </strong> {task.id}
      </p>
      <p>
        <strong>Title: </strong> {task.title}
      </p>
      <p>
        <strong>Description: </strong>{" "}
        {task.description || "No description provided."}
      </p>
      <p>
        <strong>Status: </strong> {task.status}
      </p>
      <p>
        <strong>Priority: </strong> {task.priority}
      </p>
      <p>
        <strong>Tags: </strong> {task.tags || "No tags."}
      </p>
      <p>
        <strong>Start Date: </strong>{" "}
        {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
      </p>
      <p>
        <strong>Due Date: </strong>{" "}
        {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
      </p>
      <p>
        <strong>Author: </strong>{" "}
        {task.author ? task.author.username : "Unknown"}
      </p>
      <p>
        <strong>Assignee: </strong>{" "}
        {task.assignee ? task.assignee.username : "Unassigned"}
      </p>
    </div>
  );
}
