import AdminAuth from "@/lib/admin/admin.auth";
import UpdateCourseFix from "@/lib/courses/fix.update";
import UpdateInstituitionFix from "@/lib/instituitions/fix.update";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    await AdminAuth();

    const updated = await redis.get("updatedCourse");

    if (!updated) {
      return Response.json(
        {
          success: false,
          error: "no fix found",
        },
        { status: 500 },
      );
    }

    return Response.json(
      {
        success: true,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      {
        error: "server error",
      },
      { status: 500 },
    );
  }
}

export async function PATCH() {
  try {
    await AdminAuth();

    const res = await UpdateCourseFix();

    if (!res.success) {
      return Response.json(
        {
          success: res.success,
          error: res.error,
        },
        { status: res.status },
      );
    }

    return Response.json(
      {
        success: res.success,
        message: res.message,
      },
      { status: res.status },
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      {
        error: "server error",
      },
      { status: 500 },
    );
  }
}
