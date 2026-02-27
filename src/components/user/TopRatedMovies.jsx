export default function TopRatedMovies() {
    return (
        <div className='grid grid-cols-5 gap-3'>
            {Array(5).fill('').map((_, index) => {
                return <div className='p-5 bg-red-200' key={index}></div>
            })}
        </div>
    );
};
