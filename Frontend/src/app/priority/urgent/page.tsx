import ReusablePriorityPage from "@/components/ReusablePriorityPage";
import { Priority } from "@/state/apiSlice";

export default function UrgentPage() {
  return <ReusablePriorityPage priority={Priority.URGENT} />;
}
