import { UseFetch } from "@/hooks/useFetch";
import { CourseDataTypes, InstituitionDataTypes } from "@/types/types";
import { LevelOptions } from "@/ui/AppContent";
import { ChevronDown, ChevronUp, RotateCw, SearchIcon } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import styles from "../style.module.css";

interface SearchDataTypes {
    instituition: string;
    course: string;
    level: string;
}

type Props = {
    searchData: SearchDataTypes;
    setSearchData: React.Dispatch<SetStateAction<SearchDataTypes>>
    search: () => void;
    loading: boolean;
}

function Search({searchData, setSearchData, search, loading}:Props) {

    const [instituitions, setInstituitions] = useState<InstituitionDataTypes[]>([]);
    const [courses, setCourses] = useState<CourseDataTypes[]>([]);

    const [showLevels, setShowLevels] = useState(false);
    const [showInstituitions, setShowInstituitions] = useState(false);
    const [showCourses, setShowCourses] = useState(false);

    const FetchInstituitions = UseFetch();
    const FetchCourses = UseFetch();

    const [reloadInstituitions, setReloadInstituitions] = useState(0);
    const [reloadCourses, setReloadCourses] = useState(0);

    const HandleFetchInstituitions = async () =>
    {
        const res = await FetchInstituitions.Fetch("/instituitions");
        if (FetchInstituitions.error) {
            toast.error(FetchInstituitions.error);
            return;
        }

        if (res) {
            if (res.success) {
                setInstituitions(res.instituitions);
            }
        }
    }

    const HandleFetchCourses = async () =>
    {
        if (!searchData.instituition && !searchData.level) return;

        const res = await FetchCourses.Fetch(`/courses?instituition=${searchData.instituition}&level=${searchData.level}`);
        if (FetchCourses.error) {
            toast.error(FetchCourses.error);
            return;
        }

        if (res) {
            if (res.success) {
                setCourses(res.courses);
            }
        }
    }

    useEffect(() => {
        HandleFetchInstituitions();
    }, [reloadInstituitions]);

    useEffect(() => {
        HandleFetchCourses();
    }, [reloadCourses]);

    return (
        <fieldset className="search">
            <legend>search</legend>

            <div onClick={() => {
                setShowInstituitions(!showInstituitions);
                setShowLevels(false);
                setShowCourses(false);
                }}>
                <span>{!searchData.instituition ? "select instituition" : searchData.instituition}</span>
                {instituitions.length > 0 && (
                <>
                {instituitions.length > 0 && showInstituitions ? <ChevronUp /> : <ChevronDown />}
                </>
                )}

                {instituitions.length === 0 && (
                    <button onClick={() => {
                        setReloadInstituitions(prev => prev + 1);
                    }}>
                        {FetchInstituitions.loading && (
                            <ClipLoader size={25}/>
                        )}

                        {!FetchInstituitions.loading && instituitions.length === 0 ? 
                        <RotateCw size={20}/> : null}
                    </button>
                )}

                {showInstituitions && (
                <>
                {instituitions && instituitions.length > 0 ? (
                    <ul>
                        {instituitions.map(instituition => (
                            <li key={instituition.id} onClick={() => {
                                setSearchData(prev => ({...prev, instituition: instituition.instituition_name}));
                                setReloadCourses(prev => prev + 1);
                            }}>
                                {instituition.instituition_name}
                            </li>
                        ))}
                    </ul>
                ) : (null)}
                </>
                )}
            </div>

            <div onClick={() => {
                setShowLevels(!showLevels);
                setShowInstituitions(false);
                setShowCourses(false);
                }}>
                <span>{!searchData.level ? "select level" : searchData.level}</span>
                <>{showLevels ? <ChevronUp /> : <ChevronDown />}</>

                {showLevels && (
                    <ul>
                        {LevelOptions.map(level => (
                            <li key={level.id} onClick={() => {
                                setSearchData(prev => ({...prev, level: level.level}));
                                setReloadCourses(prev => prev + 1);
                                setShowLevels(!showLevels);
                            }}>
                            {level.level}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div onClick={() => {
                setShowCourses(!showCourses);
                setShowLevels(false);
                setShowInstituitions(false);
                }}>
                <span>{!searchData.course ? "select course" : searchData.course}</span>
                {courses.length > 0 && (
                <>
                {courses.length > 0 && showCourses ? <ChevronUp /> : <ChevronDown />}
                </>
                )}

                {courses.length === 0 && (
                    <button onClick={() => {
                        setReloadCourses(prev => prev + 1);
                    }}>
                        {FetchCourses.loading && (
                            <ClipLoader size={25}/>
                        )}

                        {!FetchCourses.loading && courses.length === 0 ? 
                        <RotateCw size={20}/> : null}
                    </button>
                )}

                {showCourses && (
                <>
                {courses.length > 0 ? (
                    <ul>
                        {courses.map(course => (
                            <li key={course.id} onClick={() => {
                                setSearchData(prev => ({...prev, course: course.course}));
                            }}>
                                {course.course}
                            </li>
                        ))}
                    </ul>
                ) : (null)}
                </>
                )}
            </div>

            <button onClick={search}>
                {!loading ? <SearchIcon /> : <ClipLoader size={20} color="white"/>}
            </button>
        </fieldset>
    )
}

export { Search }