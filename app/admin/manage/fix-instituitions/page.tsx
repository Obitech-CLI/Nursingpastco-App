import AdminAuth from "@/lib/admin/admin.auth";
import FixInstituition from "./FixInstituition";

export default async function Page() {
  await AdminAuth();

  return (
    <main className="fix">
      <h2>Fix Instituition</h2>
      <FixInstituition />
    </main>
  );
}
