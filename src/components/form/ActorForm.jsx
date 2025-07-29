import React, { useState } from 'react'
import { commonInputClasses } from '../../utils/theme';
import PosterSelector from '../PosterSelector';
import Selector from '../Selector';
import { useNotification } from '../../hooks';

const defaultActorInfo = {
    name: '',
    about: '',
    avatar: null,
    gender: '',
}

const genderOptions = [
    { title: 'Male', value: 'male' },
    { title: 'Female', value: 'female' },
    { title: 'Other', value: 'Other' },
]

const validateActor = ({ avatar, name, about, gender }) => {
    if (!name.trim()) return { error: 'Actor name is missing!' };
    if (!about.trim()) return { error: 'About section is empty!' };
    if (!gender.trim()) return { error: 'Actor gender is missing!' };
    if (avatar && !avatar.type?.startsWith('image')) return { error: 'Invalid image / avatar file!' };

    return { error: null };
}

export default function ActorForm({ title, btnTitle, onSubmit }) {
    const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
    const [selectedAvatarForUI, setSelectedAvatarForUI] = useState('');

    const { updateNotification } = useNotification();

    const updateAvatarForUI = file => {
        const url = URL.createObjectURL(file);
        setSelectedAvatarForUI(url);
    }

    const handleChange = ({ target }) => {
        const { value, files, name } = target;
        if (name === 'avatar') {
            const avatar = files[0];
            updateAvatarForUI(avatar);
            return setActorInfo((prev) => ({ ...prev, avatar }));
        }
        setActorInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { error } = validateActor(actorInfo);
        if (error) return updateNotification('error', error);

        // submit form
        onSubmit(actorInfo);
    }

    const { name, about, gender } = actorInfo;

    return (
        <form
            onSubmit={handleSubmit}
            className='dark:bg-primary bg-white p-3 w-[35rem] rounded'
        >
            <div className="flex justify-between items-center mb-3">
                <h1 className='font-semibold text-xl dark:text-white text-primary'>
                    {title}
                </h1>
                <button
                    className='px-3 py-1 bg-primary text-white dark:bg-white dark:text-primary
                    transition rounded hover:opacity-80'
                    type='submit'
                >
                    {btnTitle}
                </button>
            </div>

            <div className="flex space-x-2">
                <PosterSelector
                    selectedPoster={selectedAvatarForUI}
                    className='w-36 h-36 aspect-square object-cover'
                    name='avatar'
                    onChange={handleChange}
                    accept='image/jpg, image/jpeg, image/png'
                    label='Select Avatar'
                />

                <div className='flex-grow flex flex-col space-y-2'>
                    <input
                        type="text"
                        placeholder='Enter name'
                        name='name'
                        onChange={handleChange}
                        value={name}
                        className={`${commonInputClasses} border-2 p-1 rounded`}
                    />
                    <textarea
                        name='about'
                        onChange={handleChange}
                        value={about}
                        placeholder='About'
                        className={`${commonInputClasses} border-2 p-1 rounded resize-none h-full`}
                    ></textarea>
                </div>
            </div>

            <div className="mt-2">
                <Selector
                    options={genderOptions}
                    label='Gender'
                    value={gender}
                    onChange={handleChange}
                    name='gender'
                />
            </div>
        </form>
    );
};
