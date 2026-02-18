import React, { useEffect, useState } from 'react';
import ModalContainer from './ModalContainer';
import MovieForm from '../admin/MovieForm';
import { getMovieForUpdate, updateMovie } from '../../api/movie';
import { useNotification } from '../../hooks';

export default function UpdateMovie({ visible, movieId, onSuccess, onClose }) {
    const [busy, setBusy] = useState(false);
    const [ready, setReady] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { updateNotification } = useNotification();

    const handleSubmit = async (data) => {
        setBusy(true);
        const { error, movie, message } = await updateMovie(movieId, data);
        setBusy(false);
        if (error) return updateNotification('error', error);
        updateNotification('success', message);
        onSuccess(movie);
        onClose();
    };

    const fetchMovieToUpdate = async () => {
        const { movie, error } = await getMovieForUpdate(movieId);
        if (error) return updateNotification("error", error);
        setSelectedMovie(movie);
        setReady(true);
    };

    useEffect(() => {
        if (movieId) fetchMovieToUpdate()
    }, [movieId]);

    return (
        <ModalContainer visible={visible}>
            {ready ? (
                <MovieForm
                    initialState={selectedMovie}
                    btnTitle='Update'
                    onSubmit={!busy ? handleSubmit : null}
                    busy={busy}
                />
            ) : (
                <div className='w-full h-full flex justify-center items-center'>
                    <p className='text-light-subtle dark:text-dark-subtle animate-pulse text-xl'>
                        Please wait...
                    </p>
                </div>
            )
            }
        </ModalContainer>
    );
};
