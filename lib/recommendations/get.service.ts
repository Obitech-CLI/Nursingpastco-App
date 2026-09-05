"use server";

import { supabase } from "../supabase/supabase";

const GetRecommendationsService = async (category: string, search: string, from: number, to: number) => 
{
    if (category && !search) {

        const { data, error } = await supabase
        .from("nursingpastco_recommendations")
        .select("id, category, title, recommendation, image, link")
        .eq("category", category)
        .range(from, to)
        .order("created_at", {ascending: false});

        if (data?.length === 0 || error) {
            return {
               success: false,
               error: "no recommendation found",
               status: 404
            }
        }

        return {
           success: true,
           recommendations: data,
           status: 200
        }

    } else if (category && search) {

        const { data, error } = await supabase
        .from("nursingpastco_recommendations")
        .select("id, category, title, recommendation, image, link")
        .eq("category", category)
        .ilike("title", `${search}%`)
        .range(from, to)
        .order("created_at", {ascending: false});

        if (data?.length === 0 || error) {
           return {
              success: false,
              error: "no recommendation found",
              status: 404
           }
        }

        return {
           success: true,
           recommendations: data,
           status: 200
        }

    } else if (!category && !search) {
      
      const { data, error } = await supabase
        .from("nursingpastco_recommendations")
        .select("id, category, title, recommendation, image, link")
        .order("created_at", {ascending: false})
        .range(from, to);

        if (data?.length === 0 || error) {
           return {
              success: false,
              error: "no recommendation found",
              status: 404
           }
        }

        return {
           success: true,
           recommendations: data,
           status: 200
        }
    } else if (search) {

      const { data, error } = await supabase
        .from("nursingpastco_recommendations")
        .select("id, category, title, recommendation, image, link")
        .ilike("title", `${search}%`)
        .order("created_at", {ascending: false})
        .range(from, to);

        if (data?.length === 0 || error) {
           return {
              success: false,
              error: "no recommendation found",
              status: 404
           }
        }

        return {
           success: true,
           recommendations: data,
           status: 200
        }
    }
   
}

export default GetRecommendationsService;