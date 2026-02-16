import { useState, createContext } from 'react';
import { useNotification } from '../hooks';
import { getMovies } from '../api/movie';

export const MovieContext = createContext();

const limit = 10;
let currentPageNo = 0;

const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [reachedToEnd, setReachedToEnd] = useState(false);

    const { updateNotification } = useNotification();

    const fetchMovies = async (pageNo) => {
        const { error, movies } = await getMovies(pageNo, limit);
        if (error) updateNotification('error', error);

        if (!movies.length) {
            currentPageNo = pageNo - 1;
            return setReachedToEnd(true);
        };

        setReachedToEnd(false);
        setMovies([...movies]);
    };

    const fetchNextPage = () => {
        if (reachedToEnd) return;
        currentPageNo += 1;
        fetchMovies(currentPageNo);
    };

    const fetchPrevPage = () => {
        if (currentPageNo <= 0) return;
        if (reachedToEnd) setReachedToEnd(false);

        currentPageNo -= 1;
        fetchMovies(currentPageNo);
    };

    return <MovieContext.Provider value={{ movies, fetchMovies, fetchNextPage, fetchPrevPage }}>{children}</MovieContext.Provider>
};

export default MoviesProvider;