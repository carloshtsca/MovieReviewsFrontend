import { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { getActors, searchActor } from "../../api/actor";
import { useNotification, useSearch } from '../../hooks';
import NextAndPrevButton from "../NextAndPrevButton";
import UpdateActor from "../modals/UpdateActor";
import AppSearchForm from "../form/AppSearchForm";
import NotFoundText from "../NotFoundText";
import ConfirmModal from "../modals/ConfirmModal";

let currentPageNo = 0;
const limit = 20;

export default function Actors() {
    const [actors, setActors] = useState([]);
    const [results, setResults] = useState([]);

    const [reachedToEnd, setReachedToEnd] = useState(false);

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);

    const { updateNotification } = useNotification();
    const { handleSearch, resetSearch, resultNotFound } = useSearch();

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const fetchActors = async (pageNo) => {
        const { profiles, error } = await getActors(pageNo, limit);
        if (error) return updateNotification('error', error);

        if (!profiles.length) {
            currentPageNo = pageNo - 1;
            return setReachedToEnd(true);
        }

        setReachedToEnd(false);
        setActors([...profiles]);
    };

    const handleOnNextClick = () => {
        if (reachedToEnd) return;
        currentPageNo += 1;
        fetchActors(currentPageNo);
    };

    const handleOnPrevClick = () => {
        if (currentPageNo <= 0) return;
        currentPageNo -= 1;
        fetchActors(currentPageNo);
    };

    const handleOnEditClick = (profile) => {
        setShowUpdateModal(true);
        setSelectedProfile(profile);
    };

    const hideUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const handleOnSearchSubmit = (value) => {
        handleSearch(searchActor, value, setResults);
    };

    const handleSearchFormReset = () => {
        resetSearch();
        setResults([]);
    };

    const handleOnActorUpdate = (profile) => {
        const updatedActors = actors.map(actor => {
            if (profile.id === actor.id) {
                return profile;
            }

            return actor;
        });

        setActors([...updatedActors]);
    };

    const handleOnDeleteClick = (profile) => {
        console.log(profile);
        setShowConfirmModal(true);
    };

    useEffect(() => {
        fetchActors(currentPageNo);
    }, []);

    return (
        <>
            <div className="p-5">
                <div className="flex justify-end mb-5">
                    <AppSearchForm
                        placeholder='Search Actors...'
                        onSubmit={handleOnSearchSubmit}
                        showResetIcon={results.length || resultNotFound}
                        onReset={handleSearchFormReset}
                    />
                </div>
                
                <NotFoundText text='Record not found' visible={resultNotFound} />

                <div className="grid grid-cols-4 gap-5">
                    {results.length || resultNotFound ?
                        results.map((actor) => (
                            <ActorProfile
                                key={actor.id}
                                profile={actor}
                                onEditClick={() => handleOnEditClick(actor)}
                                onDeleteClick={() => handleOnDeleteClick(actor)}
                            />
                        )) : actors.map((actor) => (
                            <ActorProfile
                                key={actor.id}
                                profile={actor}
                                onEditClick={() => handleOnEditClick(actor)}
                                onDeleteClick={() => handleOnDeleteClick(actor)}
                            />
                        ))}
                </div>

                {!results.length && !resultNotFound ?
                    <NextAndPrevButton
                        className="mt-5"
                        onNextClick={handleOnNextClick}
                        onPrevClick={handleOnPrevClick}
                    />
                    :
                    null
                }
            </div>

            <ConfirmModal visible={showConfirmModal} title='Are you sure?' subtitle='This action will remove this profile permanently!' busy />

            <UpdateActor
                visible={showUpdateModal}
                onClose={hideUpdateModal}
                initialState={selectedProfile}
                onSuccess={handleOnActorUpdate}
            />
        </>
    );
};

const ActorProfile = ({ profile, onEditClick, onDeleteClick }) => {
    const [showOptions, setShowOptions] = useState(false);
    const acceptedNameLength = 15;

    const handleOnMouseEnter = () => {
        setShowOptions(true);
    };

    const handleOnMouseLeave = () => {
        setShowOptions(false);
    };

    if (!profile) return null;

    const getName = (name) => {
        if (name.length <= acceptedNameLength) return name;
        return name.substring(0, acceptedNameLength) + '...';
    };

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
                    <h1 className="text-xl text-primary dark:text-white font-semibold whitespace-nowrap">
                        {getName(name)}
                    </h1>
                    <p className="text-primary dark:text-white opacity-70">
                        {about.substring(0, 50)}
                    </p>
                </div>

                <Options onEditClick={onEditClick} onDeleteClick={onDeleteClick} visible={showOptions} />
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
