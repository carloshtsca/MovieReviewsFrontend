import React, { useState } from 'react'
import LiveSearch from '../LiveSearch';
import { commonInputClasses } from '../../utils/theme';

// const cast = [{ actor: id, roleAs: '', leadActor: true }];

const defaultCastInfo = {
    profile: {},
    roleAs: '',
    leadActor: false,
}

export default function CastForm() {
    const [castInfo, setCastInfo] = useState({ ...defaultCastInfo })

    const { leadActor } = castInfo;
    return (
        <div className='flex items-center space-x-2'>
            <input
                type='checkbox'
                name='leadActor'
                className='w-4 h-4'
                checked={leadActor}
            />

            <LiveSearch placeholder='Search profile' />

            <span className='dark:text-dark-subtle text-light-subtle font-semibold'>
                as
            </span>

            <div className='flex-grow'>
                <input
                    type="text"
                    className={`${commonInputClasses} rounded p-1 text-lg border-2`}
                    placeholder='Role as'
                />
            </div>

            <button
                type='button'
                className='bg-secondary dark:bg-white dark:text-primary text-white 
                px-1 rounded'
            >
                Add
            </button>
        </div>
    );
};
