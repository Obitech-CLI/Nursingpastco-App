"use client";

import { SelectInstituition } from "@/features/public/components/SelectInstituition";
import { SelectLevel } from "@/features/public/components/SelectLevel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Instituitions() {

    const [selectedInstituition, setSelectedInstituition] = useState("");
    const [selectedLevel, setSelectedLevel]= useState("");

    const router = useRouter();

    useEffect(() => {
        if (!selectedInstituition || !selectedLevel) return;

        localStorage.setItem("selectedLevel", selectedLevel);
        localStorage.setItem("selectedInstituition", selectedInstituition);

    }, [selectedLevel]);

    const HandleSelections = () =>
    {
        router.push("/past-questions")
    }

    return (
        <>
        {selectedInstituition}{selectedLevel}
        <SelectInstituition
        setSelectedInstituition={setSelectedInstituition}
        />
        {selectedInstituition && (
            <SelectLevel
            setSelectedLevel={setSelectedLevel}
            setSelectedInstituition={setSelectedInstituition}
            HandleSelections={HandleSelections}
        />
        )}
        </>
    )
}

export { Instituitions }