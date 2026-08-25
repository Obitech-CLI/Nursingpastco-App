import AddSiteInfo from "@/lib/site-info/add.service";

export async function POST(req: Request) {
    const body = await req.json();

    const category = body.category;
    const information = body.information;

    try {
        const res = await AddSiteInfo({category, information})
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
        console.error(err);
        return Response.json({
            error: "server error"
        },{status: 500})
    }
}