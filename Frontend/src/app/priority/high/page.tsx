import ReusablePriorityPage from "@/components/ReusablePriorityPage";
import { Priority } from "@/state/apiSlice";

export default function HighPage() {
  return <ReusablePriorityPage priority={Priority.HIGH} />;
}
