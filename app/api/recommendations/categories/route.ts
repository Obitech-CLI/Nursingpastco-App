import AddRecommendationsCategoryService from "@/lib/recommendations/add.category.service";
import GetRecommendationsCategoriesService from "@/lib/recommendations/get.categories.service";
import UpdateRecommendationsCategoryService from "@/lib/recommendations/update.category.service";

export async function POST(req: Request) {
    const body = await req.json();

    const category = body.category;

    try {
        const res = await AddRecommendationsCategoryService(category);

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

export async function PATCH(req: Request) {
    const body = await req.json();

    const id = body.id;
    const category = body.category;

    try {
        const res = await UpdateRecommendationsCategoryService(id, category);

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

export async function GET() {
    
    try {
        const res = await GetRecommendationsCategoriesService();

        if (!res.success) {
            return Response.json({
                success: res.success,
                error: res.error
            },{status: res.status});
        }

        return Response.json({
            success: res.success,
            categories: res.categories
        },{status: res.status});

    } catch (err) {
        console.error(err);
        return Response.json({
            error: "server error",
            status: 500
        })
    }
}