"use client";

import BoardView from "@/components/BoardView";
import ListView from "@/components/ListView";
import Loading from "@/components/Loading";
import NewTaskModal from "@/components/NewTaskModal";
import ProjectHeader from "@/components/ProjectHeader";
import TableView from "@/components/TableView";
import TimelineView from "@/components/TimelineView";
import { useEffect, useState } from "react";

interface ParamProps {
  params: { id: string };
}

export default function ProjectPage({ params }: ParamProps) {
  const [activeTab, setActiveTab] = useState("Board");

  const [openNewTaskModal, setOpenNewTaskModal] = useState(false);

  const [id, setId] = useState("");
  useEffect(() => {
    (async () => {
      const { id } = await params;
      setId(id);
    })();
  }, [params]);
  if (!id) return <Loading />;

  return (
    <div>
      {
        <NewTaskModal
          id={id}
          isOpenNewTaskForm={openNewTaskModal}
          onCloseNewTaskForm={() => setOpenNewTaskModal(false)}
        />
      }
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView
          id={id}
          setOpenNewTaskModal={(isOpen) => setOpenNewTaskModal(isOpen)}
        />
      )}
      {activeTab === "List" && (
        <ListView id={id} setOpenNewTaskModal={setOpenNewTaskModal} />
      )}
      {activeTab === "Timeline" && (
        <TimelineView id={id} setOpenNewTaskModal={setOpenNewTaskModal} />
      )}
      {activeTab === "Table" && (
        <TableView id={id} setOpenNewTaskModal={setOpenNewTaskModal} />
      )}
    </div>
  );
}
