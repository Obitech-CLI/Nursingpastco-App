"use server";

import { supabase } from "../supabase/supabase";

const Subscribe = async (email: string) =>
{
    if (!email) {
        return {
            success: false,
            error: "empty input detected",
            status: 400
        }
    }

    const { data, error } = await supabase
    .from("nursingpastco_subscribers")
    .select("email")
    .eq("email", email)
    .single();

    if (!data || error) {

        const { error: subscribeError } = await supabase
        .from("nursingpastco_subscribers")
        .insert({
            email: email
        });

        if (subscribeError) {
            return {
                success: false,
                error: "subscription failed. try again",
                status: 500
            }
        }

        return {
            success: true,
            message: "subscribed",
            status: 201
        }
    }

    return {
        success: true,
        message: "already a subscriber",
        status: 200
    }
}

export default Subscribe;