import React, { createContext, useState } from 'react'
import { useNotification } from '../hooks';

export const SearchContext = createContext();

let timeoutId;
const debounce = (func, delay) => {
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

export default function SearchProvider({ children }) {
    const [searching, setSearching] = useState(false);
    const [results, setResults] = useState([]);
    const [resultNotFound, setResultNotFound] = useState(false);

    const { updateNotification } = useNotification();

    const search = async (method, query) => {
        const { error, results } = await method(query);
        if (error) return updateNotification('error', error);

        if (!results.length) return setResultNotFound(true);

        setResults(results);
    };

    const debounceFunc = debounce(search, 300);

    const handleSearch = (method, query) => {
        setSearching(true);

        if (!query.trim()) {
            resetSearch();
        };

        debounceFunc(method, query);
    };

    const resetSearch = () => {
        setSearching(false);
        setResults([]);
        setResultNotFound(false);
    }

    return (
        <SearchContext.Provider
            value={{ handleSearch, resetSearch, searching, resultNotFound, results }}
        >
            {children}
        </SearchContext.Provider>
    );
};
