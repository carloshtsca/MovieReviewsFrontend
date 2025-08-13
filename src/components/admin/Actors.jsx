import { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

export default function Actors() {
    const [showOptions, setShowOptions] = useState(false);

    const handleOnMouseEnter = () => {
        setShowOptions(true);
    };

    const handleOnMouseLeave = () => {
        setShowOptions(false);
    };

    return (
        <div className="grid grid-cols-4 gap-3 my-5">
            <div className="bg-white shadow dark:shadow dark:bg-secondary rounded h-20 overflow-hidden">
                <div
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                    className="flex cursor-pointer relative"
                >
                    <img
                        className='w-20 aspect-square object-cover'
                        src="https://images.unsplash.com/photo-1735029660539-59df2bded95b?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />

                    <div className="px-2">
                        <h1 className="text-xl text-primary dark:text-white font-semibold">John Doe</h1>
                        <p className="text-primary dark:text-white">Lorem ipsum dolor sit amet.</p>
                    </div>

                    {showOptions
                        ?
                        <div className="absolute inset-0 bg-primary bg-opacity-25 
                        backdrop-blur-sm flex justify-center items-center space-x-5">
                            <button
                                type="button"
                                className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
                            >
                                <BsTrash />
                            </button>
                            <button
                                type="button"
                                className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
                            >
                                <BsPencilSquare />
                            </button>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    );
};
