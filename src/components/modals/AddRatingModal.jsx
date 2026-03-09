import RatingForm from '../form/RatingForm';
import ModalContainer from '../modals/ModalContainer';

export default function AddRatingModal({ visible, onClose }) {
    const handleSubmit = (data) => {
        console.log(data);
    };

    return (
        <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
            <RatingForm onSubmit={handleSubmit} />
        </ModalContainer>
    );
};
