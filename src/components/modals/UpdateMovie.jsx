import React from 'react'
import ModalContainer from './ModalContainer';
import MovieForm from '../admin/MovieForm';

export default function UpdateMovie({ visible, initialState }) {
    return (
        <ModalContainer visible={visible}>
            <MovieForm initialState={initialState} btnTitle='Update' />
        </ModalContainer>
    );
};
