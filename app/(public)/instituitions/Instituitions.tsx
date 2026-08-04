"use client";

import { SelectInstituition } from "@/features/public/components/SelectInstituition";
import { SelectLevel } from "@/features/public/components/SelectLevel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Instituitions() {

    const [selectedInstituition, setSelectedInstituition] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedLogo, setSelectedLogo] = useState<string | null>(null)

    const router = useRouter();

    useEffect(() => {
        if (!selectedInstituition || !selectedLevel || !selectedLogo) return;

        localStorage.setItem("selectedLevel", selectedLevel);
        localStorage.setItem("selectedInstituition", selectedInstituition);
        localStorage.setItem("selectedLogo", selectedLogo);

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
            setSelectedLogo={setSelectedLogo}
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