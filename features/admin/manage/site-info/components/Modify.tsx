"use client";

import { AppInfoCategories } from "@/ui/AppContent";
import { useState } from "react";

function ModifySiteInfo() {

    const [selectedCategory, setSelectedCategory] = useState("");

    return (
        <>
        <div className="modify">

            {AppInfoCategories.length > 0 && (
                <div className="site-info-btns">
                {AppInfoCategories.map(category => (
                    <button type="button" key={category.id}
                    onClick={() => {
                        setSelectedCategory(category.category)
                    }}
                    style={{
                        backgroundColor: selectedCategory === category.category ? "transparent" : "",
                        color: selectedCategory === category.category ? "var(--bg-txt-color)" : "",
                        border: selectedCategory === category.category ? "var(--border)" : ""
                    }}
                    >
                        {category.category}
                    </button>
                ))}
                </div>
            )}

            {selectedCategory && (
                <>
                <h2>{selectedCategory}</h2>
                </>
            )}

        </div>
        </>
    )
}

export { ModifySiteInfo }