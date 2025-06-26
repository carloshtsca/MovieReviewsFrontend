import React from 'react'

export default function TagsInput() {
    return (
        <div>
            <div className='border-2 bg-transparent dark:border-dark-subtle
             border-light-subtle px-2 h-10 rounded w-full text-white flex
              items-center space-x-2'>
                <span>Tag one</span>
                <span>Tag two</span>
                <span>Tag three</span>
                <input
                    type="text"
                    className='h-full flex-grow bg-transparent outline-none dark:text-white'
                />
            </div>
        </div>
    );
};
