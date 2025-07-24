import React from 'react'
import ModalContainer from './ModalContainer';
import ActorForm from '../form/ActorForm';

export default function ActorUpload({ visible, onClose }) {
    return (
        <ModalContainer
            visible={visible}
            onClose={onClose}
            ignoreContainer
        >
            <ActorForm title='Create New Actor' btnTitle='Create' />
        </ModalContainer>
    );
};
