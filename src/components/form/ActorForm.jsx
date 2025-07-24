import React from 'react'
import { commonInputClasses } from '../../utils/theme';
import PosterSelector from '../PosterSelector';

export default function ActorForm({ title, btnTitle }) {
    return (
        <div className='dark:bg-primary bg-white p-3 w-[35rem] rounded'>
            <div className="flex justify-between items-center mb-3">
                <h1 className='font-semibold text-xl dark:text-white text-primary'>
                    {title}
                </h1>
                <button
                    className='px-3 py-1 bg-primary text-white dark:bg-white dark:text-primary
                    transition rounded hover:opacity-80'
                    type='submit'
                >
                    {btnTitle}
                </button>
            </div>

            <form className="flex space-x-2">
                <PosterSelector className='w-36 h-36 aspect-square object-cover' />

                <div className='flex-grow flex flex-col space-y-2'>
                    <input
                        type="text"
                        placeholder='Enter name'
                        className={`${commonInputClasses} border-b-2`}
                    />
                    <textarea
                        placeholder='About'
                        className={`${commonInputClasses} border-b-2 resize-none h-full`}
                    >

                    </textarea>
                </div>
            </form>
        </div>
    );
};
