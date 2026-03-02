import { useState, useEffect } from "react";
import { AiFillStar } from 'react-icons/ai';

import { getTopRatedMovies } from "../../api/movie";
import GridContainer from "../GridContainer";
import { useNotification } from '../../hooks';

export default function TopRatedMovies() {
    const [movies, setMovies] = useState([]);
    const { updateNotification } = useNotification();

    const fetchMovies = async () => {
        const { error, movies } = await getTopRatedMovies();
        if (error) return updateNotification('error', error);
        setMovies([...movies]);
    };

    const trimTitle = (text = '') => {
        if (text.length <= 20) return text;
        return text.substring(0, 20) + '..';
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <GridContainer>
            {movies.map((movie) => {
                return <div key={movie.id}>
                    <img
                        className='aspect-video object-cover'
                        src={movie.poster}
                        alt={movie.title}
                    />
                    <h1
                        className='text-lg dark:text-white text-secondary font-semibold'
                        title={movie.title}
                    >
                        {trimTitle(movie.title)}
                    </h1>
                    {movie.reviews.ratingAvg ? (
                        <p className='text-highlight dark:text-highlight-dark flex items-center space-x-1'>
                            <span>{movie.reviews?.ratingAvg}</span>
                            <AiFillStar />
                        </p>
                    ) : (
                        <p className='text-highlight dark:text-highlight-dark'>No reviews</p>
                    )}
                </div>;
            })}
        </GridContainer>
    );
};
