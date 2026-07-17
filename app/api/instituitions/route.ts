import AddInstituition from "@/lib/instituitions/add.service";
import GetInstituitions from "@/lib/instituitions/get.service";

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

export async function GET() {

    try {
        const res = await GetInstituitions();

        if (!res.success) {
            return Response.json({
                success: res.success,
                error: res.error
            },{status: res.status});
        }

        console.log(res)

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