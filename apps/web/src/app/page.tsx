import { redirect } from "next/navigation";

//Note: By default always redirect to login | dashboard page
export default function page() {
  redirect("/dashboard");
}
