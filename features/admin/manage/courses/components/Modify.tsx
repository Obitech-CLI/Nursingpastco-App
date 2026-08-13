"use client";

import { useState } from "react";
import { SearchCourses } from "./Search";
import { UseFetch } from "@/hooks/useFetch";
import { ClipLoader } from "react-spinners";
import { CourseDataTypes } from "@/types/types";
import styles from "../styles.module.css";
import { Edit, X } from "lucide-react";

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

        <div className="modify">
            
            {!FetchSearchData.loading ? (
            <>
            {searchedCourses.length > 0 ? (
                <div className="searched">

                    <h2>{searchedCourses[0].instituition}</h2>
                    <h3>{searchedCourses[0].level} courses</h3>

                    <div className="data">
                    {searchedCourses.map(courses => (
                        <div key={courses.id}>
                            <h4>{courses.course}</h4>

                            <div className="btns">
                            <button>
                                <Edit color="navy" size={25}/>
                            </button>

                            <button>
                                <X color="red" size={25}/>
                            </button>
                            </div>
                        </div>
                    ))}
                    </div>

                </div>
            ) : (
                <>
                {FetchSearchData.error && !FetchSearchData.loading ? (
                    <div className="retry">
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
                <div className="loading">
                <ClipLoader size={50} cssOverride={{ borderWidth: "2px" }}/>
                </div>
            )}
        </div>
        </>
    )
}

export { ModifyCourses }