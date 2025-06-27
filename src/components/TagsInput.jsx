import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';

export default function TagsInput() {
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);

    const handleOnChange = ({ target }) => {
        const { value } = target;
        if (value !== ',') setTag(value);
    };

    const handleKeyDown = ({ key }) => {
        if (key === ',' || key === 'Enter') {
            if (!tag) return;

            if (tags.includes(tag)) return setTag('');

            setTags([...tags, tag]);
            setTag('');
        }

        if (key === 'Backspace' && !tag && tags.length) {
            const newTags = tags.filter((_, index) => index !== tags.length - 1);
            setTags([...newTags]);
        }
    };

    return (
        <div>
            <div
                onKeyDown={handleKeyDown}
                className='border-2 bg-transparent dark:border-dark-subtle
                border-light-subtle px-2 h-10 rounded w-full text-white flex
                items-center space-x-2'
            >
                {tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                ))}
                <input
                    type="text"
                    className='h-full flex-grow bg-transparent outline-none dark:text-white'
                    placeholder='Tag one, Tag two'
                    value={tag}
                    onChange={handleOnChange}
                />
            </div>
        </div>
    );
};

const Tag = ({ children, onClick }) => {
    return (
        <span
            className='dark:bg-white bg-primary dark:text-primary text-white
            flex items-center text-sm px-1'
        >
            {children}
            <button onClick={onClick}><AiOutlineClose size={12} /></button>
        </span>
    );
};