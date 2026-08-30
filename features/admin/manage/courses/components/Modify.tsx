"use client";

import { SetStateAction, useEffect, useState } from "react";
import { SearchCourses } from "./Search";
import { UseFetch } from "@/hooks/useFetch";
import { ClipLoader } from "react-spinners";
import { CourseDataTypes } from "@/types/types";
import { Edit, X } from "lucide-react";
import { UseDelete } from "@/hooks/useDelete";
import { useConfirmModal, useErrorModal } from "@/contexts/modals/FeedbackContext";

interface Nav {
    add: boolean;
    view: boolean;
}

interface editData {
    id: string,
    instituition: string,
    course: string,
    level: string
}

type Props = {
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    setNav: React.Dispatch<SetStateAction<Nav>>;
    setEditData: React.Dispatch<SetStateAction<editData>>;
}

function ModifyCourses({edit, setEdit, setNav, setEditData} : Props) {

    const [searchedCourses, setSearchCourses] = useState<CourseDataTypes[]>([]);

    const [searchData, setSearchData] = useState({
        instituition: "",
        level: "",
    });

    const { setErrorMessage, setShowErrorModal, showErrorModal } = useErrorModal();

    const [deleteId, setDeleteId] = useState("");

    const FetchSearchData = UseFetch();
    const DeleteCourse = UseDelete();

    const { confirm, setShowConfirmModal, setConfirmMessage } = useConfirmModal();

    const HandleSearch = async () =>
    {
        if (!searchData.instituition && !searchData.level) {
            setShowErrorModal(true);
            setErrorMessage("no instituition & level selected");
            return;
        }
        if (!searchData.instituition) {
            setShowErrorModal(true);
            setErrorMessage("no instituition");
            return;
        }
        if (!searchData.level) {
            setShowErrorModal(true);
            setErrorMessage("no level selected");
            return;
        }
        
        const res = await FetchSearchData.Fetch(`/courses?instituition=${searchData.instituition}&level=${searchData.level}`);
        
        if (res.success) {
            setSearchCourses([]);
            setSearchCourses(res.courses);
            return;
        }
    
    }

    const HandleDeleteClick = (id: string) =>
    {
        if (!id) return;

        setConfirmMessage("are you sure you want to delete this course?");
        setShowConfirmModal(true);
        setDeleteId(id);
    }

    const Delete = async () => {
        if (!confirm && !deleteId) return;

        const res = await DeleteCourse.Delete(`/courses/${deleteId}`);

        if (res.success) {
            setDeleteId("");
            HandleSearch();
        }
    }

    useEffect(() => {
        Delete();
    }, [confirm])

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
                <>

                    <h3>{searchedCourses[0].instituition}</h3>
                    <h3>{searchedCourses[0].level}<br />courses</h3>

                    <>
                    {searchedCourses.map(course => (
                        <div key={course.id} className="results">
                            <h4>{course.course}</h4>

                            <div className="btns">
                            <button type="button"
                            onClick={() => {
                                setEdit(true);
                                setNav({add: true, view: false});
                                setEditData({
                                    id: String(course.id),
                                    instituition: course.instituition,
                                    course: course.course,
                                    level: course.level
                                })
                            }}>
                                <Edit color="navy" size={30}/>
                            </button>

                            <button onClick={() => HandleDeleteClick(String(course.id))}
                                disabled={DeleteCourse.loading}>
                                <X color="red" size={30}/>
                            </button>

                            {DeleteCourse.loading && (
                                <div className="delete-loading">
                                  <ClipLoader size={40} color="var(--bg-txt-color)"/>
                                  <p>deleting instituition...</p>
                                  <p style={{textTransform: "lowercase"}}>hold on a bit</p>
                                </div>
                            )}
            
                            </div>
                        </div>
                    ))}
                    </>

                </>
            ) : (
                <>
                {FetchSearchData.error && !FetchSearchData.loading ? (
                    <div className="retry">
                        <p>{FetchSearchData.error}</p>
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