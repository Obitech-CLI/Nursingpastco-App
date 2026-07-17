"use client";

import { useState } from "react";
import { SearchCourses } from "./SearchCourses";
import { UseFetch } from "@/hooks/useFetch";
import { ClipLoader } from "react-spinners";
import { CourseDataTypes } from "@/types/types";

function ModifyCourses() {

    const [searchedCourses, setSearchCourses] = useState<CourseDataTypes[]>([]);

    const [searchData, setSearchData] = useState({
        instituition: "",
        level: "",
    });

    const FetchSearchData = UseFetch();

    const HandleSearch = async () =>
    {
        if (!searchData.instituition && !searchData.level) return;
        
        const res = await FetchSearchData.Fetch(`/courses?instituition=${searchData.instituition}&level=${searchData.level}`);
        console.log(res)
        if (!res) {
            setSearchCourses([]);
            return;
        };

        setSearchCourses(res.courses);
    
    }

    return (
        <>
        <SearchCourses
        searchData={searchData}
        setSearchData={setSearchData}
        search={HandleSearch}
        loading={FetchSearchData.loading}
        />

        <div>
            <h2>courses</h2>
            
            {!FetchSearchData.loading ? (
            <>
            {searchedCourses.length > 0 ? (
                <div>
                    <h2>{searchedCourses[0].instituition}</h2>
                    <h2>{searchedCourses[0].level}</h2>
                    {searchedCourses.map(courses => (
                        <div key={courses.id}>
                            {courses.course}
                        </div>
                    ))}
                </div>
            ) : (
                <div>no courses found</div>
            )}
            </>
            ) : (
                <ClipLoader size={50} cssOverride={{ borderWidth: "5px" }}/>
            )}
        </div>
        </>
    )
}

export { ModifyCourses }