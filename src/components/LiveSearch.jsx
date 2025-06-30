import React from 'react'
import { commonInputClasses } from '../utils/theme';

export default function LiveSearch() {
    return (
        <div className='relative'>
            <input
                type='text'
                className={`${commonInputClasses} border-2 rounded p-1 text-lg`}
                placeholder='Search Profile'
            />
            <div className='absolute right-0 left-0 top-10 bg-white 
            dark:bg-secondary shadow-md p-2 max-h-64 space-y-2 mt-1
            overflow-auto'>
                <p>Hello</p>
                <p>World</p>
                <p>How</p>
                <p>Are</p>
                <p>You</p>
            </div>
        </div>
    );
};
