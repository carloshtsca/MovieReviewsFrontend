import { useState, useEffect } from "react";
import { getSingleMovie } from "../../api/movie";
import { useParams } from "react-router-dom";
import { useNotification } from "../../hooks";

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

    if (!ready) return <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <div className="text-light-subtle dark:text-dark-subtle animate-pulse">
            Please wait
        </div>
    </div>

    return (
        <div>
            {movie.title}
        </div>
    );
};
