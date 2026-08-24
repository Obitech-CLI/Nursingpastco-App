import { UseFetch } from "@/hooks/useFetch";
import { PastQuestionDataTypes } from "@/types/types";
import { SetStateAction, useEffect, useState } from "react";
import { Search } from "./Search";
import { ClipLoader } from "react-spinners";
import { Edit, X } from "lucide-react";
import { UseDelete } from "@/hooks/useDelete";
import { useConfirmModal, useErrorModal } from "@/contexts/modals/FeedbackContext";

interface Nav {
    add: boolean;
    view: boolean;
}

interface editData {
    id: number,
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

function ModifyPastQuestions({edit, setEdit, setNav, setEditData} : Props) {

    const [searchedPastQuestions, setSearchedPastQuestions] = useState<PastQuestionDataTypes[]>([]);

    const [searchData, setSearchData] = useState({
        instituition: "",
        course: "",
        level: "",
    });

    const [deleteId, setDeleteId] = useState(0);
    const [reload, setReload] = useState(0);

    const FetchPastQuestions = UseFetch();
    const DeletePastQuestion = UseDelete();

    const { confirm, setShowConfirmModal, setConfirmMessage } = useConfirmModal();
    const { setErrorMessage, setShowErrorModal } = useErrorModal();

    const HandleSearch = async () =>
    {
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
        if (!searchData.course) {
            setErrorMessage("no course selected");
            setShowErrorModal(true);
            return;
        }
        
        const res = await FetchPastQuestions.Fetch(`/pastQuestions?instituition=${searchData.instituition}&level=${searchData.level}&course=${searchData.course}`);
        
        if (!res) {
            setSearchedPastQuestions([]);
            return;
        };

        setSearchedPastQuestions(res.pastQuestions);
    }

    const HandleDeleteClick = (id: number) =>
    {
        if (!id) return;

        setConfirmMessage("are you sure you want to delete past question?");
        setShowConfirmModal(true);
        setDeleteId(id);
    }

    const Delete = async () => {
        if (!confirm && !deleteId) return;
        await DeletePastQuestion.Delete(`/pastQuestions/${deleteId}`);

        setReload(prev => prev + 1);
    }

    useEffect(() => {
        Delete();
    }, [confirm])

    useEffect(() => {
        if (!searchData.instituition && !searchData.course && !searchData.level) return;
        HandleSearch();
    }, [reload])

    return (
        <>
        <Search
        searchData={searchData}
        setSearchData={setSearchData}
        search={HandleSearch}
        loading={FetchPastQuestions.loading}
        />

        <div className="modify">
            
            {!FetchPastQuestions.loading ? (
            <>
            {searchedPastQuestions.length > 0 ? (
                <div className="searched">

                    <h3>{searchedPastQuestions[0].instituition}</h3>
                    <h4>{searchedPastQuestions[0].course} past-questions</h4>
                    <h4>{searchedPastQuestions[0].level}</h4>

                    <div className="data">
                    {searchedPastQuestions.map(pastQuestions => (
                        <div key={pastQuestions.id}>
                            <h5>{pastQuestions.title}</h5>

                            <div className="btns">
                            <button onClick={() => {
                                setEdit(true);
                                setNav({add: true, view: false});
                                setEditData({
                                    id: pastQuestions.id,
                                    instituition: pastQuestions.instituition,
                                    course: pastQuestions.course,
                                    level: pastQuestions.level
                                })
                            }}>
                                <Edit color="navy" size={25}/>
                            </button>

                            <button onClick={() => HandleDeleteClick(pastQuestions.id as number)}
                                disabled={DeletePastQuestion.loading}>
                                <X color="red" size={25}/>
                            </button>

                            {DeletePastQuestion.loading && (
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
                {FetchPastQuestions.error && !FetchPastQuestions.loading ? (
                    <div className="retry">
                        <h3>{FetchPastQuestions.error}</h3>
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

export { ModifyPastQuestions }