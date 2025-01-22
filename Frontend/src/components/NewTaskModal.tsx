import { Priority, Status, useCreateTaskMutation } from "@/state/apiSlice";
import { useState } from "react";

import { formatISO } from "date-fns";
import Modal from "./Modal";

interface NewTaskModalProps {
  id?: string | null;
  isOpenNewTaskForm: boolean;
  onCloseNewTaskForm: () => void;
}

export default function NewTaskModal({
  id = null,
  isOpenNewTaskForm,
  onCloseNewTaskForm,
}: NewTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.TODO);
  const [priority, setPriority] = useState<Priority>(Priority.BACKLOG);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");

  const [projectId, setProjectId] = useState("");

  const [createTask, { isLoading }] = useCreateTaskMutation();

  const formattedStartDate = startDate
    ? formatISO(new Date(startDate), {
        representation: "complete",
      })
    : undefined;

  const formattedDueDate = dueDate
    ? formatISO(new Date(dueDate), {
        representation: "complete",
      })
    : undefined;

  async function handleSubmit() {
    if (!title || !authorUserId || !(id !== null || projectId)) return;

    const data = await createTask({
      title,
      description,
      status,
      priority,
      tags,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
      projectId: id !== null ? Number(id) : Number(projectId),
    });

    return data;
  }

  function isFormValid() {
    return title && authorUserId && !(id !== null || projectId);
  }

  const inputStyles =
    "w-full rounded border border-gray-300 p-2  shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focuse:outline-none";

  return (
    <Modal
      isOpen={isOpenNewTaskForm}
      onClose={onCloseNewTaskForm}
      name="Create New Task"
    >
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) =>
              setStatus(Status[e.target.value as keyof typeof Status])
            }
          >
            <option value="">Select status</option>
            <option value={Status.TODO}>To do</option>
            <option value={Status.WORKINPROGRESS}>Work In Progress</option>
            <option value={Status.UNDERREVIEW}>Under Review</option>
            <option value={Status.COMPLETD}>Completed</option>
          </select>
          <select
            className={selectStyles}
            value={priority}
            onChange={(e) =>
              setPriority(Priority[e.target.value as keyof typeof Priority])
            }
          >
            <option value="">Select Priority</option>
            <option value={Priority.URGENT}>Urgent</option>
            <option value={Priority.HIGH}>High</option>
            <option value={Priority.MEDIUM}>Medium</option>
            <option value={Priority.LOW}>Low</option>
            <option value={Priority.BACKLOG}>Backlog</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Tags"
          className={inputStyles}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Author user ID"
          className={inputStyles}
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assignee user ID"
          className={inputStyles}
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
        {id === null && (
          <input
            type="text"
            placeholder="ProjectId"
            className={inputStyles}
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        )}
        <button
          type="submit"
          disabled={!isFormValid() || isLoading}
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""} `}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
}
