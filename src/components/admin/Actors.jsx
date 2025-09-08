import { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { getActors } from "../../api/actor";

export default function Actors() {
    const fetchActors = async () => {
        const res = await getActors(0, 5);
        console.log(res);
    };

    useEffect(() => {
        fetchActors();        
    }, []);

    return (
        <div className="grid grid-cols-4 gap-3 my-5">
            <ActorProfile
                profile={{
                    name: 'John Doe',
                    avatar: "https://images.unsplash.com/photo-1735029660539-59df2bded95b?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    about: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas exercitationem ut ad officiis sit illum voluptates! Vel temporibus dicta, fuga animi dolorem id illum itaque, distinctio maxime odio obcaecati neque.'
                }}
            />
            <ActorProfile
                profile={{
                    name: 'John Doe',
                    avatar: "https://images.unsplash.com/photo-1735029660539-59df2bded95b?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    about: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas exercitationem ut ad officiis sit illum voluptates! Vel temporibus dicta, fuga animi dolorem id illum itaque, distinctio maxime odio obcaecati neque.'
                }}
            />
            <ActorProfile
                profile={{
                    name: 'John Doe',
                    avatar: "https://images.unsplash.com/photo-1735029660539-59df2bded95b?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    about: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas exercitationem ut ad officiis sit illum voluptates! Vel temporibus dicta, fuga animi dolorem id illum itaque, distinctio maxime odio obcaecati neque.'
                }}
            />
            <ActorProfile
                profile={{
                    name: 'John Doe',
                    avatar: "https://images.unsplash.com/photo-1735029660539-59df2bded95b?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    about: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas exercitationem ut ad officiis sit illum voluptates! Vel temporibus dicta, fuga animi dolorem id illum itaque, distinctio maxime odio obcaecati neque.'
                }}
            />
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
