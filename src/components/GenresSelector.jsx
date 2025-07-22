import React from 'react'
import { ImTree } from 'react-icons/im';

export default function GenresSelector({ badge, onClick }) {
    const renderBadge = () => {
        if (!badge) return null;
        return (
            <span className='dark:bg-white bg-black text-white dark:text-primary absolute 
            top-0 right-0 translate-x-2 -translate-y-2 text-xs w-5 h-5 rounded-full flex 
            justify-center items-center'
            >{badge <= 9 ? badge : '9+'}</span>
        );
    };

    return (
        <button
            type='button'
            onClick={onClick}
            className='relative w-full flex items-center space-x-2 py-1 px-3 border-2 dark:border-dark-subtle 
            border-light-subtle dark:hover:border-white hover:border-primary 
            transition dark:text-dark-subtle text-light-subtle dark:hover:text-white
            hover:text-primary rounded'
        >
            <ImTree />
            <span>Select Genres</span>
            {renderBadge()}
        </button>
    );
};