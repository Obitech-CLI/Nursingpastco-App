import { UseFetch } from "@/hooks/useFetch";
import { CourseDataTypes, InstituitionDataTypes } from "@/types/types";
import { LevelOptions } from "@/ui/AppContent";
import { ChevronDown, ChevronUp, RotateCw, SearchIcon, X } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import styles from "../style.module.css";
import { useErrorModal } from "@/contexts/modals/FeedbackContext";

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

    const { setErrorMessage, setShowErrorModal, errorMessage } = useErrorModal();

    const HandleFetchInstituitions = async () =>
    {
        const res = await FetchInstituitions.Fetch("/instituitions");
        if (FetchInstituitions.error) {
            setErrorMessage(FetchInstituitions.error);
            setShowErrorModal(true);
            return;
        }

        if (!res) return;

        setInstituitions(res.instituitions);
    }

    const HandleFetchCourses = async () =>
    {
        if (!searchData.instituition && !searchData.level) {
            setErrorMessage("no instituition or level selected");
            setShowErrorModal(true);
            return;
        }

        if (!searchData.instituition) {
            setErrorMessage("no instituition selected");
            setShowErrorModal(true);
            return;
        }

        if (!searchData.level) {
            setErrorMessage("no level selected");
            setShowErrorModal(true);
            return;
        }

        const res = await FetchCourses.Fetch(`/courses?instituition=${searchData.instituition}&level=${searchData.level}`);
        
        if (FetchCourses.error) {
            setErrorMessage(FetchCourses.error);
            setShowErrorModal(true);
            return;
        }

        if (!res) return;
           
        setCourses(res.courses);
    }

    useEffect(() => {
        HandleFetchInstituitions();
    }, [reloadInstituitions]);

    useEffect(() => {
        document.body.style.overflow = showLevels || showInstituitions || showCourses ? "hidden" : "";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [showCourses, showInstituitions, showLevels])

    return (
        <fieldset className="search">
            <legend>search</legend>

            <div onClick={() => {
                if (instituitions.length === 0) return;
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
                        <span onClick={() => setShowInstituitions(!showInstituitions)}><X /></span>
                        <h2>select</h2>
                        {instituitions.map(instituition => (
                            <li key={instituition.id} onClick={() => {
                                setCourses([]);
                                setSearchData(prev => ({...prev, course: "", instituition: instituition.instituition_name}));
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
                        <span onClick={() => setShowLevels(!showLevels)}><X /></span>
                        <h2>select</h2>
                        {LevelOptions.map(level => (
                            <li key={level.id} onClick={() => {
                                setCourses([]);
                                setSearchData(prev => ({...prev,course: "", level: level.level}));
                                setShowLevels(!showLevels);
                            }}>
                            {level.level}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div onClick={() => {
                if (courses.length === 0) return;
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
                    <button onClick={HandleFetchCourses}>
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
                        <span onClick={() => setShowCourses(!showCourses)}><X /></span>
                        <h2>select</h2>
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

            <button onClick={search} type="button">
                {!loading ? <SearchIcon /> : <ClipLoader size={20} color="black"/>}
            </button>
        </fieldset>
    )
}

export { Search }