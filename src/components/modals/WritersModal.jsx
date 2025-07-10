import React from 'react'
import ModalContainer from './ModalContainer';

export default function WritersModal({ profiles = [], visible, onClose }) {
    return (
        <ModalContainer onClose={onClose} visible={visible}>
            {profiles.map(({ id, name, avatar }) => {
                return <div key={id} className='flex'>
                    <img src={avatar} alt={name} />
                    <p>{name}</p>
                </div>
            })}
        </ModalContainer>
    );
};
