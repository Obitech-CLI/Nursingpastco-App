import { redis } from "@/lib/redis";

export async function GET() {
    await redis.set("test", "Redis is working");

    const value = await redis.get("test");

    return Response.json({value})
}