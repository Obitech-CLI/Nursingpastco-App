"use client";

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { SetStateAction } from "react";
import { ClipLoader } from "react-spinners";

export interface SubscribersType {
    id: number;
    email: string;
    subscribed_at: string;
}
type Props = {
    subscribers: SubscribersType [];
    page: number;
    setPage: React.Dispatch<SetStateAction<number>>;
    loading: boolean;
    error: string;
    setSubscribers: React.Dispatch<SetStateAction<SubscribersType []>>;
    reload: () => void;
}

function ModifySubscribers({subscribers, setSubscribers, page, setPage, loading, error, reload}:Props) {
    return (
        <div className="modify-subscribers">
            {!loading ? (
                <>
                {subscribers.length > 0 ? (
                    <>
                    <table>
                        <thead>
                        <tr>
                            <th>no</th>
                            <th>email address</th>
                            <th>subscribed_at</th>
                        </tr>
                        </thead>
                        <tbody>
                        {subscribers.map((s, index) => (
                            <tr key={s.id}>
                                <td>{index+1}</td>
                                <td>{s.email}</td>
                                <td>{new Date(s.subscribed_at).toLocaleString("en-NG", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                    hour12: true
                                })}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </>
                ) : (
                    <>
                    {subscribers.length === 0 && error ? (
                        <div className="retry">
                            <p>{error}</p>
                            <button type="button" onClick={reload}>
                                <RotateCcw size={25}/>
                                retry
                            </button>
                        </div>
                    ):null}
                    </>
                )}
                </>
            ) : (

                <div className="loading">
                    <p>loading subscribers...</p>
                    <ClipLoader size={70} color="var(--bg-txt-color)"/>
                </div>

            )}
            
            {subscribers.length > 0 && (
                <div className="pagination">
                    {subscribers.length <= 3 && page > 1 ? (
                    <button type="button" onClick={() => {
                        setSubscribers([]);
                        setPage(prev => prev - 1);
                    }}><ChevronLeft /> </button>
            ): (null)}
                    <>page {page}</>
                    {subscribers.length == 3 && (
                        <button type="button" onClick={() => {
                        setSubscribers([]);
                        setPage(prev => prev + 1);
                        }}><ChevronRight /></button>
                    )}
                </div>
            )}
            
        </div>
    )
}

export { ModifySubscribers }