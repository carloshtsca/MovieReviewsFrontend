import { useEffect, useState } from "react";
import { getLatestUploads } from "../../api/movie";
import { useNotification } from '../../hooks';

export default function HeroSlidShow() {
    const [slide, setSlide] = useState({});
    const [movies, setMovies] = useState([]);
    const { updateNotification } = useNotification();

    const fetchLatestUploads = async () => {
        const { error, movies } = await getLatestUploads();
        if (error) return updateNotification('error', error);
        setMovies([...movies]);
        setSlide(movies[0]);
    };

    useEffect(() => {
        fetchLatestUploads();
    }, [])

    return (
        <div className='w-full flex'>
            <div className='w-4/5 aspect-video'>
                <img src={slide.poster} alt="" />
            </div>
            <div className='w-1/5 aspect-video bg-red-300'></div>
        </div>
    );
};
