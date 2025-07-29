import { useEffect, useRef, useState } from "react";
import { MdUpload } from "react-icons/md";

const commonPosterUI = `flex justify-center items-center border border-dashed 
rounded aspect-video dark:border-dark-subtle border-light-subtle cursor-pointer`

export default function PosterSelector({ name, label, accept, selectedPoster, className, onChange }) {
    const [dragzone, setDragZone] = useState(false);
    const dropzone = useRef();

    const dragCounter = useRef(0); // contador interno

    useEffect(() => {
        const dz = dropzone.current;

        const handleDragOver = (e) => {
            e.preventDefault();
        };

        const handleDragEnter = (e) => {
            e.preventDefault();
            dragCounter.current += 1;
            setDragZone(true);
        };

        const handleDragLeave = (e) => {
            e.preventDefault();
            dragCounter.current -= 1;

            if (dragCounter.current === 0) {
                setDragZone(false);
            }
        };

        const handleDrop = (e) => {
            e.preventDefault();
            dragCounter.current = 0;
            setDragZone(false);

            const files = e.dataTransfer.files;
            if (files && files.length > 0) {
                const fakeEvent = {
                    target: {
                        name,
                        files
                    }
                };
                onChange(fakeEvent);
            }
        };

        dz.addEventListener("dragover", handleDragOver);
        dz.addEventListener("dragenter", handleDragEnter);
        dz.addEventListener("dragleave", handleDragLeave);
        dz.addEventListener("drop", handleDrop);

        return () => {
            dz.removeEventListener("dragover", handleDragOver);
            dz.removeEventListener("dragenter", handleDragEnter);
            dz.removeEventListener("dragleave", handleDragLeave);
            dz.removeEventListener("drop", handleDrop);
        };
    }, [onChange, name]);


    return (
        <div
            ref={dropzone}
        >
            <input
                accept={accept}
                onChange={onChange}
                name={name}
                id={name}
                type='file'
                hidden
            />
            <label htmlFor={name}>
                {selectedPoster
                    ?
                    <img
                        className={`${commonPosterUI} object-cover ${className}`}
                        src={selectedPoster}
                        alt="" />
                    :
                    <PosterUI dragzone={dragzone} className={className} label={label} />
                }
            </label>
        </div>
    );
};

const PosterUI = ({ dragzone, className, label }) => {
    return (
        <div className={`${commonPosterUI} ${className} ${dragzone ? 'bg-blue-200 animate-pulse' : ''} `}>
            {dragzone
                ?
                <div className="flex flex-col-reverse items-center justify-center gap-2">
                    <span>Drop the file here</span>
                    <span><MdUpload /></span>
                </div>
                :
                <span className='dark:text-dark-subtle text-light-subtle'>{label}</span>
            }
        </div >
    );
};