import AddInstituition from "@/lib/instituitions/add.service";
import GetInstituitions from "@/lib/instituitions/get.service";
import UpdateInstituition from "@/lib/instituitions/patch.service";
import { NextRequest } from "next/server";

export async function POST(req: Request) {

    const formData = await req.formData();

    const instituition_name = formData.get("instituition_name") as string;
    const instituition_abbr = formData.get("instituition_abbr") as string;
    const instituition_logo = formData.get("instituition_logo") as File;

    try {
        const res = await AddInstituition(
        {instituition_name, instituition_abbr, instituition_logo}
        );

        if (!res.success) {
            return Response.json({
                success: res.success,
                error: res.error
            },{status: res.status});
        }

        return Response.json({
            success: res.success,
            message: res.message
        },{status: res.status});

    } catch (err) {
        if (err instanceof Error) {
            console.error(err);

            return Response.json({
            error: err.message ?? "server error"
            },{status: 500})
        }
    }
}

export async function PATCH(req: Request) {

    const editData = await req.formData();

    const id = editData.get("id") as string;
    const instituition_name = editData.get("instituition_name") as string;
    const instituition_abbr = editData.get("instituition_abbr") as string;
    const instituition_logo = editData.get("instituition_logo") as File;

    try {
        const res = await UpdateInstituition(
        {id, instituition_name, instituition_abbr, instituition_logo}
        );

        if (!res.success) {
            return Response.json({
                success: res.success,
                error: res.error
            },{status: res.status});
        }

        return Response.json({
            success: res.success,
            message: res.message
        },{status: res.status});

    } catch (err) {
        if (err instanceof Error) {
            console.error(err);

            return Response.json({
            error: err.message ?? "server error"
            },{status: 500})
        }
    }
}

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;
    const instituition = searchParams.get("instituition") as string;

    try {

        const res = await GetInstituitions(instituition);

        if (!res.success) {
            return Response.json({
                success: res.success,
                error: res.error
            },{status: res.status});
        }

        return Response.json({
            success: res.success,
            instituitions: res.instituitions
        },{status: res.status});

    } catch (err) {
        console.error(err);
        return Response.json({
            error: "server error"
        })
    }
}