import AddContentsCategoryService from "@/lib/contents/add.category.service";
import GetContentCategoriesService from "@/lib/contents/get.categories.service";
import UpdateContentsCategoryService from "@/lib/contents/update.category.service";

export async function POST(req: Request) {
    const body = await req.json();

    const category = body.category;

    try {
        const res = await AddContentsCategoryService(category);

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
        const res = await UpdateContentsCategoryService(id, category);

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
        const res = await GetContentCategoriesService();

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