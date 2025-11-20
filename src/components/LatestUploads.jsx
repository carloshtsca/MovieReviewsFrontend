import { useEffect, useState } from "react";
import { useNotification } from "../hooks";
import MovieListItem from "./MovieListItem";
import { deleteMovie, getMovieForUpdate, getMovies } from "../api/movie";
import ConfirmModal from "./modals/ConfirmModal";
import UpdateMovie from "./modals/UpdateMovie";

const pageNo = 0;
const limit = 5;

export default function LatestUploads() {
    const [movies, setMovies] = useState([]);
    const [busy, setBusy] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const { updateNotification } = useNotification();

    const fetchLatestUploads = async () => {
        const { error, movies } = await getMovies(pageNo, limit);
        if (error) return updateNotification('error', error);
        setMovies([...movies]);
    };

    const handleOnEditClick = async ({ id }) => {
        const { movie, error } = await getMovieForUpdate(id);
        if (error) return updateNotification('error', error);
        setSelectedMovie(movie);
        setShowUpdateModal(true);
    };

    const handleOnDeleteClick = async (movie) => {
        setSelectedMovie(movie);
        setShowConfirmModal(true);
    };

    const handleOnDeleteConfirm = async () => {
        setBusy(true);
        const { error, message } = await deleteMovie(selectedMovie.id);
        setBusy(false);
        if (error) return updateNotification('error', error);
        updateNotification('success', message);
        hideConfirmModal();
        fetchLatestUploads();
    };

    const handleOnUpdate = (movie) => {
        const updatedMovies = movies.map(m => {
            if (m.id === movie.id) return movie;
            return m
        });

        setMovies([...updatedMovies]);
    };

    const hideUpdateForm = () => setShowUpdateModal(false);
    const hideConfirmModal = () => setShowConfirmModal(false);

    useEffect(() => {
        fetchLatestUploads();
    }, []);

    return (
        <>
            <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded col-span-2">
                <h1 className='font-semibold text-2xl mb-2 text-primary dark:text-white'>
                    Recent Uploads
                </h1>

                <div className='space-y-3'>
                    {movies.map((movie) => {
                        return <MovieListItem
                            movie={movie}
                            key={movie.id}
                            onEditClick={() => handleOnEditClick(movie)}
                            onDeleteClick={() => handleOnDeleteClick(movie)}
                        />;
                    })}
                </div>
            </div>

            <ConfirmModal
                visible={showConfirmModal}
                onConfirm={handleOnDeleteConfirm}
                onCancel={hideConfirmModal}
                title='Are you sure?'
                subtitle={`This action will remove this movie '${selectedMovie?.title}' permanently!`}
                busy={busy}
            />

            
        </>
    );
};