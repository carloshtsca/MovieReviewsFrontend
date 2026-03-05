import { useState, useEffect } from "react";
import { getSingleMovie } from "../../api/movie";
import { Link, useParams } from "react-router-dom";
import { useNotification } from "../../hooks";
import Container from "../Container";
import RatingStar from "../RatingStar";

const convertReviewCount = (count) => {
    if (count <= 999) return count;
    return parseFloat(count / 1000).toFixed(2) + 'K';
};

export default function SingleMovie() {
    const { movieId } = useParams();

    const [ready, setReady] = useState(false);
    const [movie, setMovie] = useState({});

    const { updateNotification } = useNotification();

    const fetchMovie = async () => {
        const { error, movie } = await getSingleMovie(movieId);
        if (error) return updateNotification('error', error);

        setReady(true);
        setMovie(movie);
    };

    useEffect(() => {
        if (movieId) fetchMovie();
    }, [movieId]);

    if (!ready) return (
        <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
            <div className="text-light-subtle dark:text-dark-subtle animate-pulse">
                Please wait
            </div>
        </div>
    );

    const { id, trailer, poster, title, storyLine, director, reviews = {}, writers } = movie;

    return (
        <div className='dark:bg-primary bg-white min-h-screen'>
            <Container>
                <video poster={poster} controls src={trailer}></video>

                <div className='flex justify-between items-center'>
                    <h1 className='text-4xl text-highlight dark:text-highlight-dark font-semibold py-3'>
                        {title}
                    </h1>
                    <div className='flex flex-col items-end'>
                        <RatingStar rating={reviews.ratingAvg} />

                        <Link
                            className='text-highlight dark:text-highlight-dark hover:underline'
                            to={`/movie/reviews/${id}`}
                        >
                            {convertReviewCount(reviews.reviewCount)} Reviews
                        </Link>

                        <button className='text-highlight dark:text-highlight-dark hover:underline' type='button'>
                            Rate the movie
                        </button>
                    </div>
                </div>

                <div className='space-y-3'>
                    {/* Storyline */}
                    <p className='text-light-subtle dark:text-dark-subtle'>
                        {storyLine}
                    </p>

                    {/* Director */}
                    <div className="flex space-x-2">
                        <p className='text-light-subtle dark:text-dark-subtle font-semibold'>
                            Director:
                        </p>
                        <p className='text-highlight dark:text-highlight-dark hover:underline cursor-pointer'>
                            {director.name}
                        </p>
                    </div>

                    {/* Writers */}
                    <div className="flex">
                        <p className='text-light-subtle dark:text-dark-subtle font-semibold mr-2'>
                            Writers:
                        </p>

                        <div className="flex items-center space-x-1">
                            {writers.map((w, i) => {
                                return <p key={i} className='text-highlight dark:text-highlight-dark hover:underline cursor-pointer'>
                                    {w.name} 
                                    {i !== writers.length-1 && <span>,</span>}
                                </p>
                            })}
                        </div>
                    </div>
                </div>

            </Container>
        </div>
    );
};
