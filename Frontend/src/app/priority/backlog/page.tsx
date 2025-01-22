import ReusablePriorityPage from "@/components/ReusablePriorityPage";
import { Priority } from "@/state/apiSlice";

export default function BacklogPage() {
  return <ReusablePriorityPage priority={Priority.BACKLOG} />;
}
