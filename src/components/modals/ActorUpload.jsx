import React from 'react'
import ModalContainer from './ModalContainer';
import ActorForm from '../form/ActorForm';
import { createActor } from '../../api/actor';

export default function ActorUpload({ visible, onClose }) {
    const handleSubmit = async (data) => {
        console.log(data);
        const res = await createActor(data);
        console.log(res);
    };

    return (
        <ModalContainer
            visible={visible}
            onClose={onClose}
            ignoreContainer
        >
            <ActorForm onSubmit={handleSubmit} title='Create New Actor' btnTitle='Create' />
        </ModalContainer>
    );
};
