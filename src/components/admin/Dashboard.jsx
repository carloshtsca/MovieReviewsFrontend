import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function Dashboard() {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className="flex items-center justify-between relative">
            <input
                type="text"
                className="border-2 dark:border-dark-subtle border-light-subtle 
                dark:focus:border-white focus:border-primary dark:text-white 
                transition bg-transparent rounded text-lg p-1 outline-none"
                placeholder="Search Movies..."
            />
            <button
                onClick={() => setShowOptions(!showOptions)}
                className="flex items-center space-x-2 border-secondary 
                hover:border-primary text-secondary hover:opacity-80 
                transition font-semibold border-2 rounded text-lg px-3
                py-1"
            >
                <span>Create</span>
                <AiOutlinePlus />
            </button>

            <CreateOptions visible={showOptions} />
        </div>
    );
};

const CreateOptions = ({ visible }) => {
    if (!visible) return null;

    return (
        <div className="absolute animate-scale right-0 top-12 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded">
            <Option>Add Movie</Option>
            <Option>Add Actor</Option>
        </div>
    );
};

const Option = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="dark:text-white text-secondary hover:opacity-80 transition"
        >
            {children}
        </button>
    )
}
