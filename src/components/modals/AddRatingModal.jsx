import { useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import ModalContainer from './ModalContainer';
import Submit from '../form/Submit';

const ratings = new Array(10).fill('');

export default function AddRatingModal({ onSubmit }) {
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [content, setContent] = useState('');

    const handleMouseEnter = (index) => {
        const ratings = new Array(index + 1).fill(index);
        setSelectedRatings([...ratings]);
    };

    const handleOnChange = ({ target }) => {
        setContent(target.value);
    };

    const handleSubmit = () => {
        if (selectedRatings.length) return;
        const data = {
            ratings: selectedRatings.length,
            content
        }

        onSubmit(data);
    };

    return (
        <ModalContainer visible ignoreContainer>
            <div className="p-5 dark:bg-primary bg-white rounded space-y-3">
                <div className="text-highlight dark:text-highlight-dark flex items-center relative">
                    {ratings.map((_, index) => {
                        return (
                            <AiOutlineStar
                                key={index}
                                onMouseEnter={() => handleMouseEnter(index)}
                                className='cursor-pointer'
                                size={24}
                            />
                        )
                    })}

                    <div className="absolute flex items-center top-1/2 -translate-y-1/2">
                        {selectedRatings.map((_, index) => {
                            return (
                                <AiFillStar
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    className='cursor-pointer'
                                    size={24}
                                />
                            )
                        })}
                    </div>
                </div>

                <textarea
                    value={content}
                    onChange={handleOnChange}
                    className='w-full h-24 border-2 p-2 dark:text-white text-primary 
                    rounded outline-none bg-transparent resize-none'
                ></textarea>

                <Submit onClick={handleSubmit} value='Rate This Movie' />
            </div>
        </ModalContainer>
    );
};
