import React from 'react'
import ModalContainer from './ModalContainer';
import genres from '../../utils/genres';

export default function GenresModal({ visible, onClose }) {
    return (
        <ModalContainer visible={visible} onClose={onClose}>
            <h1 className='dark:text-white text-primary text-2xl font-semibold text-center'>Select Genres</h1>
            <div className="space-y-3">
                {genres.map((gen, index) => {
                    return (
                        <button
                            className={`${index === 5 ? 'dark:bg-white dark:text-primary bg-light-subtle text-white' : 'dark:text-white text-primary'}
                            border-2 dark:border-dark-subtle border-light-subtle  p-1 rounded mr-3`}
                            key={gen}
                        >
                            {gen}
                        </button>
                    )
                })}
            </div>
        </ModalContainer>
    );
};
