import { useState } from "react";

export default function HeroSlidShow() {
    const [slide, setSlide] = useState({  });

    return (
        <div className='w-full flex'>
            <div className='w-4/5 aspect-video'>
                <img src={slide.poster} alt="" />
            </div>
            <div className='w-1/5 aspect-video bg-red-300'></div>
        </div>
    );
};
