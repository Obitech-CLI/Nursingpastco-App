import { UseFetch } from "@/hooks/useFetch";
import { PastQuestionDataTypes } from "@/types/types";
import { useState } from "react";
import { Search } from "./Search";
import styles from "../style.module.css";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { Edit, Edit3Icon, X } from "lucide-react";

function ModifyPastQuestions() {

    const [searchedPastQuestions, setSearchedPastQuestions] = useState<PastQuestionDataTypes[]>([]);

    const [searchData, setSearchData] = useState({
        instituition: "",
        course: "",
        level: "",
    });

    const FetchPastQuestions = UseFetch();

    const HandleSearch = async () =>
    {
        if (!searchData.instituition) {
            toast.error("no instituition selected");
            return;
        }
        if (!searchData.level) {
            toast.error("no level selected");
            return;
        }
        if (!searchData.course) {
            toast.error("no course selected");
            return;
        }
        
        const res = await FetchPastQuestions.Fetch(`/pastQuestions?instituition=${searchData.instituition}&level=${searchData.level}&course=${searchData.course}`);
        
        if (!res) {
            setSearchedPastQuestions([]);
            return;
        };

        setSearchedPastQuestions(res.pastQuestions);
    }

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

                    <h2>{searchedPastQuestions[0].instituition}</h2>
                    <h3>{searchedPastQuestions[0].course} past-questions</h3>
                    <h3>{searchedPastQuestions[0].level}</h3>

                    <div className="data">
                    {searchedPastQuestions.map(pastQuestions => (
                        <div key={pastQuestions.id}>
                            <h4>{pastQuestions.title}</h4>

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