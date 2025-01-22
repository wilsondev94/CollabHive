import ReusablePriorityPage from "@/components/ReusablePriorityPage";
import { Priority } from "@/state/apiSlice";

export default function MediumPage() {
  return <ReusablePriorityPage priority={Priority.MEDIUM} />;
}
