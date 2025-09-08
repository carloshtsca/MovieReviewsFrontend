import { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { getActors } from "../../api/actor";
import { useNotification } from '../../hooks';

let currentPageNo = 0;
const limit = 20;

export default function Actors() {
    const [actors, setActors] = useState([]);
    const { updateNotification } = useNotification();

    const fetchActors = async (pageNo) => {
        const { profiles, error } = await getActors(pageNo, limit);
        if (error) return updateNotification('error', error);
        setActors([...profiles]);
    };

    const handleOnNextClick = () => {
        currentPageNo += 1;
        fetchActors(currentPageNo);
    }

    useEffect(() => {
        fetchActors(currentPageNo);
    }, []);

    return (
        <div className="p-5">
            <div className="grid grid-cols-4 gap-5">
                {actors.map(actor => {
                    return <ActorProfile key={actor.id} profile={actor} />
                })}
            </div>

            <div className="flex justify-end items-center space-x-3 mt-5">
                <button
                    type='button'
                    className="text-primary dark:text-white hover:underline"
                >
                    Prev
                </button>
                <button
                    type='button'
                    className="text-primary dark:text-white hover:underline"
                    onClick={handleOnNextClick}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const ActorProfile = ({ profile }) => {
    const [showOptions, setShowOptions] = useState(false);

    const handleOnMouseEnter = () => {
        setShowOptions(true);
    };

    const handleOnMouseLeave = () => {
        setShowOptions(false);
    };

    if (!profile) return null;
    const { name, avatar, about = '' } = profile;

    return (
        <div className="bg-white shadow dark:shadow dark:bg-secondary rounded h-20 overflow-hidden">
            <div
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                className="flex cursor-pointer relative"
            >
                <img
                    className='w-20 aspect-square object-cover'
                    src={avatar}
                    alt={name}
                />

                <div className="px-2">
                    <h1 className="text-xl text-primary dark:text-white font-semibold">{name}</h1>
                    <p className="text-primary dark:text-white">{about.substring(0, 50)}</p>
                </div>

                <Options visible={showOptions} />
            </div>
        </div>
    );
};

const Options = ({ visible, onDeleteClick, onEditClick }) => {
    if (!visible) return null;

    return (
        <div className="absolute inset-0 bg-primary bg-opacity-25 
                        backdrop-blur-sm flex justify-center items-center space-x-5">
            <button
                type="button"
                onClick={onDeleteClick}
                className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
            >
                <BsTrash />
            </button>
            <button
                type="button"
                onClick={onEditClick}
                className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
            >
                <BsPencilSquare />
            </button>
        </div>
    );
};
