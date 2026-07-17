"use client";

import { SetStateAction } from "react";
import styles from "../styles.module.css";
import { LevelOptions } from "@/ui/AppContent";

type Props = {
    setSelectedLevel: React.Dispatch<SetStateAction<string>>;
    setSelectedInstituition: React.Dispatch<SetStateAction<string>>;
    HandleSelections: () => void;
}

function SelectLevel({setSelectedLevel, setSelectedInstituition, HandleSelections}:Props) {
    return (
        <div className={styles.level_modal}>
            <button onClick={() => {
                setSelectedInstituition("");
                setSelectedLevel("")
            }}>
                close
            </button>
            <ul>
                {LevelOptions.length > 0 && (
                    <>
                    {LevelOptions.map(level => (
                        <li onClick={() => {
                            setSelectedLevel(level.level);
                            HandleSelections();
                            }}
                            key={level.id}
                        >
                            {level.level}
                        </li>
                    ))}
                    </>
                )}
            </ul>
        </div>
    )
}

export { SelectLevel }