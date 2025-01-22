import {
  ClockIcon,
  FilterIcon,
  Grid3X3,
  ListIcon,
  PlusSquare,
  Share2Icon,
  TableIcon,
} from "lucide-react";
import { useState } from "react";
import Header from "./Header";
import NewProjectModal from "./NewProjectModal";

interface ProjectHeaderProps {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
}

export default function ProjectHeader({
  activeTab,
  setActiveTab,
}: ProjectHeaderProps) {
  const [openNewProjectModal, setOpenNewProjectModal] = useState(false);

  return (
    <div className="px-4 xl:px-6">
      <NewProjectModal
        isOpenNewProjectForm={openNewProjectModal}
        onCloseNewProjectForm={() => setOpenNewProjectModal(false)}
      />
      <div className="pb-6 pt-6 lg:pt-8">
        <Header
          name="Product Design Development"
          buttonComponent={
            <button
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setOpenNewProjectModal(true)}
            >
              <PlusSquare className="mr-2 size-5" /> New Board
            </button>
          }
        />
      </div>

      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-2">
          <TabButton
            name="Board"
            icon={<Grid3X3 className="size-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="List"
            icon={<ListIcon className="size-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="Timeline"
            icon={<ClockIcon className="size-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="Table"
            icon={<TableIcon className="size-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <FilterIcon className="size-5" />
          </button>
          <button className="hover:text:gray-600 text-gray-500 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2Icon className="size-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search task..."
              className="rounded-md border border-gray-200 py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            />
            <Grid3X3 className="absolute left-3 top-1.5 size-5 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

function TabButton({ name, icon, activeTab, setActiveTab }: TabButtonProps) {
  const isActive = activeTab === name;

  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-stone-500 dark:hover:text-white sm:px-2 lg:px-4 ${isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""}`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
}
