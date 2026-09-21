import AdminAuth from "@/lib/admin/admin.auth";
import DeleteCourseFix from "@/lib/courses/fix.delete";
import DeleteInstituitionFix from "@/lib/instituitions/fix.delete";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    await AdminAuth();

    const deleted = await redis.get("deletedCourse");

    if (!deleted) {
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

export async function DELETE() {
  try {
    await AdminAuth();

    const res = await DeleteCourseFix();

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
