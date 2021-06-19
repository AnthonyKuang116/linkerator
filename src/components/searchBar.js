import React, { useState } from "react";
import SearchBar from "material-ui-search-bar";

const SearchBarValue = ({ links }) => {
    const [search, setSearch] = useState("");
    const filterSearch = () => {
        try {
            const {searchedList} = links.filter(object => Object.keys(object).some(key => object[key].toLowerCase().includes(search.toLowerCase())));
            return searchedList;
        } catch (error) {
            console.error("Could not search", error);
            throw error;
        }

    }
    return (
        <div className="searchBar" style={{gridColumn: "2/10", marginTop: "20px"}}>
            <SearchBar
                onChange={(value) => setSearch(value)}
                onRequestSearch={() => filterSearch()}
                style={{
                    margin: "0 auto",
                    maxWidth: 800
                }}
            />
        </div>
    )

}

export default SearchBarValue;