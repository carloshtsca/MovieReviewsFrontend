export default function NextAndPrevButton({
    className = '',
    onNextClick,
    onPrevClick
}) {
    const getClasses = () => {
        return 'flex justify-end items-center space-x-3 ';
    };

    return (
        <div className={getClasses() + className}>
            <Button title='Prev' onClick={onPrevClick} />
            <Button title='Next' onClick={onNextClick} />
        </div>
    );
};

const Button = ({ title, onClick }) => {
    return (
        <button
            type='button'
            className="text-primary dark:text-white hover:underline"
            onClick={onClick}
        >
            {title}
        </button>
    )
};