import MovieListItem from "./MovieListItem";

export default function LatestUploads() {
    return (
        <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded col-span-2">
            <h1 className='font-semibold text-2xl mb-2 text-primary dark:text-white'>
                Recent Uploads
            </h1>

            <MovieListItem
                movie={{
                    poster: 'https://images.unsplash.com/photo-1735029660539-59df2bded95b?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    title: 'Lorem ipsum dolor sit amet',
                    status: 'public',
                    genres: ['Action', 'Comedy'],
                }}
            />
        </div>
    );
};