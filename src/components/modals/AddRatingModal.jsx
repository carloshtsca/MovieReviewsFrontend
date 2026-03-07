import { AiOutlineStar } from 'react-icons/ai';
import ModalContainer from './ModalContainer';

const ratings = new Array(10).fill('');

export default function AddRatingModal({ }) {
    return (
        <ModalContainer visible ignoreContainer>
            <div className="p-5 dark:bg-primary bg-white rounded">
                <div className="text-highlight dark:text-highlight-dark flex items-center">
                    {ratings.map((_, index) => {
                        return <AiOutlineStar key={index} size={24} />
                    })}
                </div>
            </div>
        </ModalContainer>
    );
};
