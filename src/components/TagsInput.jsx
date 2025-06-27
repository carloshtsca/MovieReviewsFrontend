import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';

export default function TagsInput() {
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        console.log(tags);
        console.log(tag);
    }, [tags, tag]);

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

    const removeTag = tagToRemove => {
        const newTags = tags.filter((tag) => tag !== tagToRemove);
        setTags([...newTags]);
    }

    return (
        <div>
            <div
                onKeyDown={handleKeyDown}
                className='border-2 bg-transparent dark:border-dark-subtle
                border-light-subtle px-2 h-10 rounded w-full text-white flex
                items-center space-x-2 overflow-x-auto custom-scroll-bar'
            >
                {tags.map((t) => (
                    <Tag onClick={() => removeTag(t)} key={t}>{t}</Tag>
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
            flex items-center text-sm px-1 gap-1 whitespace-nowrap'
        >
            {children}
            <button type='button' onClick={onClick}><AiOutlineClose size={12} /></button>
        </span>
    );
};