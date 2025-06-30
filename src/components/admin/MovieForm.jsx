import React from 'react'
import TagsInput from '../TagsInput';
import LiveSearch from '../LiveSearch';
import { commonInputClasses } from '../../utils/theme';

export default function MovieForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className='flex space-x-3'>
            <div className='w-[70%] h-5 space-y-5'>
                <div>
                    <Label htmlFor='title'>Title</Label>
                    <input
                        id='title'
                        type='text'
                        className={`${commonInputClasses} border-b-2 font-semibold text-xl dark:text-white`}
                        placeholder='Titanic'
                    />
                </div>

                <div>
                    <Label htmlFor="storyLine">Story line</Label>
                    <textarea
                        id='storyLine'
                        className={`${commonInputClasses} border-b-2 resize-none h-24 dark:text-white`}
                        placeholder='Movie story line...'
                    ></textarea>
                </div>

                <div>
                    <Label htmlFor='tags'>Tags</Label>
                    <TagsInput />
                </div>

                <LiveSearch />
            </div>
            <div className='w-[30%] h-5 bg-blue-400'></div>
        </form>
    );
};

const Label = ({ children, htmlFor }) => {
    return (
        <label
            htmlFor={htmlFor}
            className='dark:text-dark-subtle text-light-subtle font-semibold'
        >
            {children}
        </label>
    )
}