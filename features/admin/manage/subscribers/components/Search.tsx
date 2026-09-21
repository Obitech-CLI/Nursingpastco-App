"use client";

import { Search } from "lucide-react";
import React, { SetStateAction } from "react";

type Props = {
    search: string;
    setSearch: React.Dispatch<SetStateAction<string>>;
}

function SearchEmail({search, setSearch} : Props) {
    return (
        <fieldset className="search-subscribers">
            <Search />
            <input type="search" value={search} placeholder="enter email address"
            onChange={(e) => setSearch(e.target.value)}
            />
        </fieldset>
    )
}

export { SearchEmail }