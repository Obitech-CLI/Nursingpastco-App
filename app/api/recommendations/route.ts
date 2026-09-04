import AddRecommendationsService from "@/lib/recommendations/add.service";

export async function POST(req: Request) {
    const formData = await req.formData();

    const category = formData.get("category") as string;
    const title = formData.get("title") as string;
    const recommendation = formData.get("recommendation") as string;
    const link = formData.get("link") as string;
    const image = formData.get("image") as File;

    try {
        const res = await AddRecommendationsService({category, title, recommendation, link, image});

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