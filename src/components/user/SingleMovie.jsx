import { useState, useEffect } from "react";
import { getSingleMovie } from "../../api/movie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import RatingStar from "../RatingStar";
import RelatedMovies from "../RelatedMovies";
import AddRatingModal from "../modals/AddRatingModal";

const convertReviewCount = (count = 0) => {
    if (count <= 999) return count;
    return parseFloat(count / 1000).toFixed(2) + 'K';
};

const convertDate = (date = '') => {
    return date.split("T")[0];
};

export default function SingleMovie() {
    const { movieId } = useParams();
    const navigate = useNavigate();

    const [ready, setReady] = useState(false);
    const [movie, setMovie] = useState({});

    const [showRatingModal, setShowRatingModal] = useState(false);

    const { updateNotification } = useNotification();
    const { authInfo } = useAuth();
    const { isLoggedIn } = authInfo;

    const fetchMovie = async () => {
        const { error, movie } = await getSingleMovie(movieId);
        if (error) return updateNotification('error', error);

        setReady(true);
        setMovie(movie);
    };

    const handleOnRateMovie = () => {
        if (!isLoggedIn) return navigate('/auth/signin');
        setShowRatingModal(true);
    };

    const hideRatingModal = () => setShowRatingModal(false);

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

    const { id, trailer, poster, title, storyLine, language, releaseDate, director, type, reviews = {}, writers = [], cast = [], genres = [] } = movie;

    return (
        <div className='dark:bg-primary bg-white min-h-screen pb-10'>
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

                        <button
                            className='text-highlight dark:text-highlight-dark hover:underline'
                            type='button'
                            onClick={handleOnRateMovie}
                        >
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
                                return <p key={w.id} className='text-highlight dark:text-highlight-dark hover:underline cursor-pointer'>
                                    {w.name}
                                    {i !== writers.length - 1 && <span>,</span>}
                                </p>
                            })}
                        </div>
                    </div>

                    {/* Cast */}
                    <div className="flex">
                        <p className='text-light-subtle dark:text-dark-subtle font-semibold mr-2'>
                            Cast:
                        </p>

                        <div className="flex items-center space-x-1">
                            {cast.map((c, i) => {
                                return c.leadActor ? (
                                    <p key={c.profile.id} className='text-highlight dark:text-highlight-dark hover:underline cursor-pointer' >
                                        {c.profile.name}
                                        {i !== cast.length - 1 && <span>,</span>}
                                    </p>
                                ) : null;
                            })}
                        </div>
                    </div>

                    {/* Language */}
                    <div className="flex space-x-2">
                        <p className='text-light-subtle dark:text-dark-subtle font-semibold'>
                            Language:
                        </p>
                        <p className='text-highlight dark:text-highlight-dark'>
                            {language}
                        </p>
                    </div>

                    {/* Release */}
                    <div className="flex space-x-2">
                        <p className='text-light-subtle dark:text-dark-subtle font-semibold'>
                            Release Date:
                        </p>
                        <p className='text-highlight dark:text-highlight-dark'>
                            {convertDate(releaseDate)}
                        </p>
                    </div>

                    {/* Cast */}
                    <div className="flex">
                        <p className='text-light-subtle dark:text-dark-subtle font-semibold mr-2'>
                            Genres:
                        </p>

                        <div className="flex items-center space-x-1">
                            {genres.map((g, i) => {
                                return (
                                    <p key={g.id} className='text-highlight dark:text-highlight-dark hover:underline cursor-pointer' >
                                        {g}
                                        {i !== genres.length - 1 ? <span>,</span> : <span>.</span>}
                                    </p>
                                );
                            })}
                        </div>
                    </div>

                    {/* Type */}
                    <div className="flex space-x-2">
                        <p className='text-light-subtle dark:text-dark-subtle font-semibold'>
                            Type:
                        </p>
                        <p className='text-highlight dark:text-highlight-dark'>
                            {type}
                        </p>
                    </div>

                    <div className="mt-5">
                        <h1 className='text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2'>
                            Cast:
                        </h1>
                        <div className='grid grid-cols-10'>
                            {cast.map(c => {
                                return (
                                    <div key={c.profile.id} className='flex flex-col items-center justify-center'>
                                        <img
                                            className='w-24 h-24 aspect-square object-cover rounded-full'
                                            src={c.profile.avatar}
                                            alt=""
                                        />

                                        <p className='text-highlight dark:text-highlight-dark hover:underline cursor-pointer'>
                                            {c.profile.name}
                                        </p>

                                        <span className='text-light-subtle dark:text-dark-subtle text-sm'>as</span>

                                        <p className='text-light-subtle dark:text-dark-subtle'>
                                            {c.roleAs}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="mt-3">
                        <RelatedMovies movieId={movieId} />
                    </div>

                </div>
            </Container >

            <AddRatingModal visible={showRatingModal} onClose={hideRatingModal} />
        </div >
    );
};
