import AdminAuth from "@/lib/admin/admin.auth";
import FixCourse from "./FixCourse";

export default async function Page() {
  await AdminAuth();

  return (
    <main className="fix">
      <h2>Fix Course</h2>
      <FixCourse />
    </main>
  );
}
