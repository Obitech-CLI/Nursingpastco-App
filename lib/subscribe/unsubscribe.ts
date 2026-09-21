"use server";

import { supabase } from "../supabase/supabase";

const UnSubscribe = async (email: string) =>
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

        return {
           success: false,
           error: "email is not subscribed",
           status: 400
        }
    }

    const { error: unSubscribeError } = await supabase
    .from("nursingpastco_subscribers")
    .delete()
    .eq("email", email)

    if (unSubscribeError) {
        return {
            success: false,
            error: "failed to unsubscribe. try again",
            status: 500
        }
    }

    return {
        success: true,
        message: "unsubscribed",
        status: 200
    }
}

export default UnSubscribe;