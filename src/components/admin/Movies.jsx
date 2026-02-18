import { useEffect } from 'react'
import MovieListItem from '../MovieListItem';
import { useMovies } from '../../hooks';
import NextAndPrevButton from '../NextAndPrevButton';

export default function Movies() {
    const { fetchMovies, fetchPrevPage, fetchNextPage, movies: newMovies } = useMovies();

    const handleUIUpdate = () => fetchMovies();

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <>
            <div className='space-y-3 p-5'>
                {newMovies.map(movie => {
                    return (
                        <MovieListItem
                            key={movie.id}
                            movie={movie}
                            afterDelete={handleUIUpdate}
                            afterUpdate={handleUIUpdate}
                        />
                    )
                })}

                <NextAndPrevButton
                    className="mt-5"
                    onNextClick={fetchNextPage}
                    onPrevClick={fetchPrevPage}
                />
            </div>
        </>
    );
};
