import { AiOutlineStar } from 'react-icons/ai';
import ModalContainer from './ModalContainer';
import Submit from '../form/Submit';

const ratings = new Array(10).fill('');

export default function AddRatingModal({ }) {
    return (
        <ModalContainer visible ignoreContainer>
            <div className="p-5 dark:bg-primary bg-white rounded space-y-3">
                <div className="text-highlight dark:text-highlight-dark flex items-center">
                    {ratings.map((_, index) => {
                        return <AiOutlineStar key={index} size={24} />
                    })}
                </div>

                <textarea className='w-full h-24 border-2 p-2 dark:text-white text-primary 
                rounded outline-none bg-transparent resize-none'>

                </textarea>

                <Submit value='Rate This Movie' />
            </div>
        </ModalContainer>
    );
};
