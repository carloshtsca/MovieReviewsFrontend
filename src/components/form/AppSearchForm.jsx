import { useState } from "react";

export default function AppSearchForm({ placeholder, onSubmit }) {
    const [value, setValue] = useState('');
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        onSubmit(value);
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <input
                type="text"
                className="border-2 dark:border-dark-subtle border-light-subtle 
                dark:focus:border-white focus:border-primary dark:text-white 
                transition bg-transparent rounded text-lg p-1 outline-none"
                placeholder={placeholder}
                value={value}
                onChange={({ target }) => setValue(target.value)}
            />
        </form>
    );
};
