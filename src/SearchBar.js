import React, {useState} from 'react';

export default function SearchBar(){
    const [query, setQuery] = useState("");

    return (
        <input value={query} onChange={e => setQuery(e.target.value)} type="search" placeholder="Search here...."/>
    );
}