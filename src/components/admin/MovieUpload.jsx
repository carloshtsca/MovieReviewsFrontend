import React, { useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNotification } from '../../hooks';
import { uploadTrailer } from '../../api/movie';

export default function MovieUpload() {
    const [videoSelected, setVideoSelected] = useState(true);
    const { updateNotification } = useNotification();

    const handleChange = async (file) => {
        const formData = new FormData();
        formData.append('video', file);
        
        const res = await uploadTrailer(formData);
        console.log(res);
    }

    const handleTypeError = (error) => {
        updateNotification('error', error);
    }

    return (
        <div className='fixed inset-0 dark:bg-white dark:bg-opacity-50 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center'>
            <div className="dark:bg-primary bg-white rounded w-[45rem] h-[40rem] overflow-auto">

                <UploadProgress
                    visible
                    message='Upload progress 20%'
                    width={20}
                />

                <TrailerSelector
                    visible={!videoSelected}
                    onTypeError={handleTypeError}
                    handleChange={handleChange}
                />

            </div>
        </div>
    );
};

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
    if (!visible) return null;

    return (
        <div className="h-full flex items-center justify-center">
            <FileUploader
                handleChange={handleChange}
                onTypeError={onTypeError}
                types={['mp4', 'avi']}
            >
                <div
                    className='w-48 h-48 border border-dashed dark:border-dark-subtle 
                    border-light-subtle rounded-full flex flex-col items-center 
                    justify-center dark:text-dark-subtle text-secondary cursor-pointer'
                >
                    <AiOutlineCloudUpload size={80} />
                    <p>Drop your file here!</p>
                </div>
            </FileUploader>
        </div>
    );
}

const UploadProgress = ({ width, message, visible }) => {
    if (!visible) return null;

    return (
        <div className="p-2">
            <div className="dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
                <div className='relative h-3 dark:bg-dark-subtle bg-light-subtle overflow-hidden'>
                    <div
                        style={{ width: width + '%' }}
                        className="h-full w-[50%] absolute left-0 dark:bg-white bg-secondary"
                    />
                </div>
                <p className='font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-1'>
                    {message}
                </p>
            </div>
        </div>
    );
};