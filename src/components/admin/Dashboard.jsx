import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function Dashboard() {
    return (
        <div className="flex items-center justify-between">
            <input
                type="text"
                className="border-2 dark:border-dark-subtle border-light-subtle 
                dark:focus:border-white focus:border-primary dark:text-white 
                transition bg-transparent rounded text-lg p-1 outline-none"
                placeholder="Search Movies..."
            />
            <button
                className="flex items-center space-x-2 border-secondary 
                hover:border-primary text-secondary hover:opacity-80 
                transition font-semibold border-2 rounded text-lg px-3
                py-1"
            >
                <span>Create</span>
                <AiOutlinePlus />
            </button>
        </div>
    );
};
