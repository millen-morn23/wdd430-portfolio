import { redirect } from "next/navigation";

export default function CreateProjectPage() {
  redirect("/dashboard/projects/new");
}
