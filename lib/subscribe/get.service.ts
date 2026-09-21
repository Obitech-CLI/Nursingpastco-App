"use server";

import { supabase } from "../supabase/supabase";

const GetSubscribers = async (search: string, from: number, to: number) =>
{
    if (!search) {
        const { data, error } = await supabase
        .from("nursingpastco_subscribers")
        .select("id, email, subscribed_at")
        .range(from, to)
        .order("subscribed_at", {ascending: false});

        if (data?.length === 0 || error) {
            return {
              success: false,
              error: "no subscriber found",
              status: 404
            }
        }

        return {
           success: true,
           subscribers: data,
           status: 200
        }
    }

    if (search) {
    const { data, error } = await supabase
    .from("nursingpastco_subscribers")
    .select("id, email, subscribed_at")
    .ilike("email", `${search}%`)
    .range(from, to)
    .order("subscribed_at", {ascending: false});

    if (data?.length === 0 || error) {
        return {
            success: false,
            error: "no subscriber found",
            status: 404
        }
    }

    return {
        success: true,
        subscribers: data,
        status: 200
    }
    }
}

export default GetSubscribers;