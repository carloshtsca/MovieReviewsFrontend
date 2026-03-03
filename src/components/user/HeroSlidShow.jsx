import { useEffect, useRef, useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { getLatestUploads } from "../../api/movie";
import { useNotification } from '../../hooks';

let count = 0;

export default function HeroSlidShow() {
    const [slide, setSlide] = useState({});
    const [clonedSlide, setClonedSlide] = useState({});
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const slideRef = useRef(null);
    const clonedSlideRef = useRef(null);

    const { updateNotification } = useNotification();

    const fetchLatestUploads = async () => {
        const { error, movies } = await getLatestUploads();
        if (error) return updateNotification('error', error);
        setSlides([...movies]);
        setSlide(movies[0]);
    };

    const handleOnNextClick = () => {
        setClonedSlide(slides[count]);
        count = (count + 1) % slides.length;
        setSlide(slides[count]);
        setCurrentIndex(count);

        clonedSlideRef.current.classList.add('slide-out-to-left');
        slideRef.current.classList.add('slide-in-from-right');
    };

    const handleAnimationEnd = () => {
        slideRef.current.classList.remove('slide-in-from-right');
        clonedSlideRef.current.classList.remove('slide-out-to-left');
        setClonedSlide({});
    };

    useEffect(() => {
        fetchLatestUploads();
        console.log((1 + 1) % 5)
    }, [])

    return (
        <div className='w-full flex'>
            {/* Slide show section */}
            <div className='w-4/5 aspect-video relative overflow-hidden'>
                <img
                    onAnimationEnd={handleAnimationEnd}
                    ref={slideRef}
                    className='aspect-video object-cover'
                    src={slide.poster}
                    alt=""
                />
                <img
                    onAnimationEnd={handleAnimationEnd}
                    ref={clonedSlideRef}
                    className='aspect-video object-cover absolute inset-0'
                    src={clonedSlide.poster}
                    alt=""
                />
                <SlideShowController onNextClick={handleOnNextClick} />
            </div>

            {/* Up Next Section */}
            <div className='w-1/5 aspect-video bg-red-300'></div>
        </div>
    );
};

const SlideShowController = ({ onNextClick, onPrevClick }) => {
    const btnClass = 'bg-primary rounded border-2 text-white text-xl p-2 outline-none';

    return (
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between px-2">
            <button
                onClick={onPrevClick}
                className={btnClass}
                type='button'
            >
                <AiOutlineDoubleLeft />
            </button>
            <button
                onClick={onNextClick}
                className={btnClass}
                type='button'
            >
                <AiOutlineDoubleRight />
            </button>
        </div>
    );
};