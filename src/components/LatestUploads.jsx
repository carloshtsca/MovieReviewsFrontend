import React from 'react'

export default function LatestUploads() {
    return (
        <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded col-span-2">
            <h1 className='font-semibold text-2xl mb-2 text-primary dark:text-white'>
                Recent Uploads
            </h1>

            <MovieListItem />
        </div>
    );
};

const MovieListItem = () => {
    return (
        <p>Movie list </p>
    );
};