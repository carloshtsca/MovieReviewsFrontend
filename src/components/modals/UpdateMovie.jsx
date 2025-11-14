import React from 'react'
import ModalContainer from './ModalContainer';
import MovieForm from '../admin/MovieForm';

export default function UpdateMovie({ visible }) {
    return (
        <ModalContainer visible={visible}>
            <MovieForm />
        </ModalContainer>
    );
};
