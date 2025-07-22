import React from 'react'

export default function Selector({ name, options, value, label, onChange }) {
    return (
        <select
            className='w-full border-2 dark:border-dark-subtle border-light-subtle
            dark:focus:border-white focus:border-primary p-1 pr-10 outline-none
            transition rounded bg-transparent text-light-subtle dark:text-dark-subtle
            dark:focus:text-white focus:text-primary text-primary'
            id={name}
            name={name}
            value={value}
            onChange={onChange}
        >
            <option className='text-black' value="">{label}</option>
            {options.map(({ title, value }) => {
                return  <option className='text-black' key={title} value={value}>{title}</option>
            })}
        </select>
    );
};
