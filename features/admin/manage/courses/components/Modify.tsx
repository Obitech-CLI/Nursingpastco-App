"use client";

import { useState } from "react";
import { SearchCourses } from "./SearchCourses";
import { UseFetch } from "@/hooks/useFetch";
import { ClipLoader } from "react-spinners";
import { CourseDataTypes } from "@/types/types";
import styles from "../styles.module.css";

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

        <div className={styles.modify}>
            {searchedCourses.length > 0 && (
                <h2>modify courses</h2>
            )}
            
            {!FetchSearchData.loading ? (
            <>
            {searchedCourses.length > 0 ? (
                <div className={styles.searched}>

                    <h2>{searchedCourses[0].instituition}</h2>
                    <h2>{searchedCourses[0].level}</h2>

                    <div className={styles.courses}>
                    {searchedCourses.map(courses => (
                        <div key={courses.id}>
                            {courses.course}
                        </div>
                    ))}
                    </div>

                </div>
            ) : (
                <>
                {FetchSearchData.error && !FetchSearchData.loading ? (
                    <div className={styles.retry}>
                        <h3>{FetchSearchData.error}</h3>
                        <button type="button"
                        onClick={HandleSearch}>
                            retry
                        </button>
                    </div>
                ) : (null)}
                </>
            )}
            </>
            ) : (
                <div className={styles.loading}>
                <ClipLoader size={50} cssOverride={{ borderWidth: "2px" }}/>
                </div>
            )}
        </div>
        </>
    )
}

export { ModifyCourses }