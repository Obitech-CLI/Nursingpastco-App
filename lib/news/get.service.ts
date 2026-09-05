"use server";

import { supabase } from "../supabase/supabase";

const GetNewsService = async (category: string, search: string, from: number, to: number) => 
{
    if (category && !search) {

        const { data, error } = await supabase
        .from("nursingpastco_news")
        .select("id, category, title, news, image, created_at")
        .eq("category", category)
        .range(from, to)
        .order("created_at", {ascending: false});

        if (data?.length === 0 || error) {
            return {
               success: false,
               error: "no news/updates found",
               status: 404
            }
        }

        return {
           success: true,
           news: data,
           status: 200
        }

    } else if (category && search) {

        const { data, error } = await supabase
        .from("nursingpastco_news")
        .select("id, category, title, news, image, created_at")
        .eq("category", category)
        .ilike("title", `${search}%`)
        .range(from, to)
        .order("created_at", {ascending: false});

        if (data?.length === 0 || error) {
           return {
              success: false,
              error: "no news/updates found",
              status: 404
           }
        }

        return {
           success: true,
           news: data,
           status: 200
        }

    } else if (!category && !search) {
      
      const { data, error } = await supabase
        .from("nursingpastco_news")
        .select("id, category, title, news, image, created_at")
        .order("created_at", {ascending: false})
        .range(from, to);

        if (data?.length === 0 || error) {
           return {
              success: false,
              error: "no news/updates found",
              status: 404
           }
        }

        return {
           success: true,
           news: data,
           status: 200
        }
    } else if (search) {

      const { data, error } = await supabase
        .from("nursingpastco_news")
        .select("id, category, title, news, image, created_at")
        .ilike("title", `${search}%`)
        .order("created_at", {ascending: false})
        .range(from, to);

        if (data?.length === 0 || error) {
           return {
              success: false,
              error: "no news/updates found",
              status: 404
           }
        }

        return {
           success: true,
           news: data,
           status: 200
        }
    }
   
}

export default GetNewsService;