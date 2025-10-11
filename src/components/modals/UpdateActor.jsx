import React, { useState } from 'react'
import ModalContainer from './ModalContainer';
import ActorForm from '../form/ActorForm';
import { updateActor } from '../../api/actor';
import { useNotification } from '../../hooks';

export default function UpdateActor({ visible, onClose, onSuccess, initialState }) {
    const [busy, setBusy] = useState(false);
    const { updateNotification } = useNotification();

    const handleSubmit = async (data) => {
        setBusy(true);
        const { error, actor } = await updateActor(initialState.id, data);
        setBusy(false);
        if (error) return updateNotification('error', error);

        onSuccess(actor);
        
        updateNotification('success', 'Actor updated successfully.');
        onClose();
    };

    return (
        <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
            <ActorForm
                onSubmit={!busy ? handleSubmit : null}
                title='Update Actor'
                btnTitle='Update'
                busy={busy}
                initialState={initialState}
            />
        </ModalContainer>
    );
};
