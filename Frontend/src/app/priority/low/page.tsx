import ReusablePriorityPage from "@/components/ReusablePriorityPage";
import { Priority } from "@/state/apiSlice";

export default function LowPage() {
  return <ReusablePriorityPage priority={Priority.LOW} />;
}
