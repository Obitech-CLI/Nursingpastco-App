"use client";

import { SetStateAction, useEffect, useState } from "react";
import { SearchCourses } from "./Search";
import { UseFetch } from "@/hooks/useFetch";
import { ClipLoader } from "react-spinners";
import { CourseDataTypes } from "@/types/types";
import { Edit, X } from "lucide-react";
import { UseDelete } from "@/hooks/useDelete";
import { useConfirmModal } from "@/contexts/modals/FeedbackContext";

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

    const [deleteId, setDeleteId] = useState(0);
    const [reload, setReload] = useState(0);

    const FetchSearchData = UseFetch();
    const DeleteCourse = UseDelete();

    const { confirm, setShowConfirmModal, setConfirmMessage } = useConfirmModal();

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

    const HandleDeleteClick = (id: number) =>
    {
        if (!id) return;

        setConfirmMessage("are you sure you want to delete course?");
        setShowConfirmModal(true);
        setDeleteId(id);
    }

    const Delete = async () => {
        if (!confirm && !deleteId) return;
        await DeleteCourse.Delete(`/courses/${deleteId}`);

        setReload(prev => prev + 1);
    }

    useEffect(() => {
        HandleSearch();
    }, [reload]);

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
                <div className="searched">

                    <h3>{searchedCourses[0].instituition}</h3>
                    <h3>{searchedCourses[0].level} courses</h3>

                    <div className="data">
                    {searchedCourses.map(courses => (
                        <div key={courses.id}>
                            <h5>{courses.course}</h5>

                            <div className="btns">
                            <button type="button"
                            onClick={() => {
                                setEdit(true);
                                setNav({add: true, view: false});
                                setEditData({
                                    id: String(courses.id),
                                    instituition: courses.instituition,
                                    course: courses.course,
                                    level: courses.level
                                })
                            }}>
                                <Edit color="navy" size={25}/>
                            </button>

                            <button onClick={() => HandleDeleteClick(courses.id as number)}
                                disabled={DeleteCourse.loading}>
                                <X color="red" size={25}/>
                            </button>

                            {DeleteCourse.loading && (
                                <div className="overlay-loading">
                                  <ClipLoader />
                                  <p>deleting instituition...</p>
                                  <p style={{textTransform: "lowercase"}}>hold on a bit</p>
                                </div>
                            )}
            
                            </div>
                        </div>
                    ))}
                    </div>

                </div>
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