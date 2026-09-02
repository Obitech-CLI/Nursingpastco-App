import AddNewsCategoryService from "@/lib/news/add.category.service";
import GetNewsCategoriesService from "@/lib/news/get.categories.service";
import UpdateNewsCategoryService from "@/lib/news/update.category.service";

export async function POST(req: Request) {
    const body = await req.json();

    const category = body.category;

    try {
        const res = await AddNewsCategoryService(category);

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
        const res = await UpdateNewsCategoryService(id, category);

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
        const res = await GetNewsCategoriesService();

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