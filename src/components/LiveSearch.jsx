import React from 'react'
import { commonInputClasses } from '../utils/theme';

export default function LiveSearch() {
    return (
        <div>
            <input
                type='text'
                className={`${commonInputClasses} border-2 rounded p-1 text-lg`}
            />
        </div>
    );
};
