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
                        <Genre selected={index === 5} key={gen}>{gen}</Genre>
                    )
                })}
            </div>
        </ModalContainer>
    );
};

const Genre = ({ children, selected, onClick }) => {
    const getSelectedStyle = () => {
        return selected
            ? 'dark:bg-white bg-light-subtle dark:text-primary text-white'
            : 'dark:text-white text-primary'
    };

    return (
        <button
            onClick={onClick}
            className={`${getSelectedStyle()} border-2 dark:border-dark-subtle 
            border-light-subtle  p-1 rounded mr-3`}
        >
            {children}
        </button>
    );
};