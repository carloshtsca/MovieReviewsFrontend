import { useState } from 'react'
import MovieListItem from '../MovieListItem';

export default function Movies() {
    const [movies, setMovies] = useState([]);

    return (
        <div className='space-y-3 p-5'>
            {movies.map(movie => {
                return <MovieListItem movie={movie} />
            })}
        </div>
    );
};
