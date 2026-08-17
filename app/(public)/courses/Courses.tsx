"use client";

import { SelectCourse } from "@/features/public/components/SelectCourse";
import { UseFetch } from "@/hooks/useFetch";
import { LevelOptions } from "@/ui/AppContent";
import { useEffect, useState } from "react";
import styles from "./courses.module.css";
import { ChevronDown, ChevronUp, Pen, RotateCw, Search, X } from "lucide-react";
import { InstituitionDataTypes } from "@/types/types";
import { ClipLoader } from "react-spinners";

function Courses() {

    const [allCourses, setAllCourses] = useState([]);
    const [all, setAll] = useState(false);

    const [showLevel, setShowLevel] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState("");

    const [search, setSearch] = useState("");
    const [focusSearch, setFocusSearch] = useState(false);


    const FetchAllCourses = UseFetch();

    const HandleFetchAllCourses = async () =>
    {
        const res = await FetchAllCourses.Fetch(`/courses/all?selectedLevel=${selectedLevel}&search=${search}`);

        if (!res) return;

        setAllCourses(res.allCourses)
    }

    useEffect(() => {
        HandleFetchAllCourses();
    }, [selectedLevel, search]);

    useEffect(() => {
        document.body.style.overflow = showLevel ? "hidden" : "";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [showLevel])

    return (
        <>
        <fieldset className={styles.select}>
            <legend>filter</legend>
            <button onClick={() => {
                setSelectedLevel("");
                setSearch("")
                setFocusSearch(false);
            }}>
                all
            </button>
            <div onClick={() => {
                setShowLevel(!showLevel);
            }}>{selectedLevel ? selectedLevel : "select level"}
               {showLevel ? <ChevronDown /> : <ChevronUp />}
                {showLevel && (
                    <ul>
                        <h2>select</h2>
                        <button onClick={() => {
                            setShowLevel(false);
                        }}>
                            <X />
                        </button>
                       {LevelOptions.map(level => (
                       <li key={level.id} onClick={() => {
                        setSelectedLevel(level.level);
                        setFocusSearch(false);
                       }}>
                        {level.level}
                        </li>
                       ))}
                    </ul>
                )}
            </div>

            <label onFocus={() => setFocusSearch(true)}>
                  <span style={{
                    top: focusSearch ? "-0.8rem" : ""
                  }}>
                  {focusSearch ? <Pen size={20}/> : <Search size={20}/>}
                  {focusSearch ? "enter course" : "search course"}
                  </span>
                  <input type="search"
                  value={search}
                   onChange={(e) => setSearch(e.target.value)}
                  />
            </label>

        </fieldset>

        <SelectCourse
        allCourses={allCourses}
        loading={FetchAllCourses.loading}
        error={FetchAllCourses.error}
        reFetch={HandleFetchAllCourses}
        filterLevel={selectedLevel}
        search={search}
        setSearch={setSearch}
        />
        </>
    )
}

export default Courses;