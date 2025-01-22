import { Project } from "@/state/apiSlice";

interface ProjectCardProps {
  project: Project;
}
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="rounded border p-4 shadow">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p>Start Date: {project.startDate}</p>
      <p>End Date: {project.endDate}</p>
    </div>
  );
}
