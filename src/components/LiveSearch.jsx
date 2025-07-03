import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { commonInputClasses } from '../utils/theme';

export const results = [
    {
        id: "1",
        avatar:
            "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        name: "John Doe",
    },
    {
        id: "2",
        avatar:
            "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        name: "Chandri Anggara",
    },
    {
        id: "3",
        avatar:
            "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        name: "Amin RK",
    },
    {
        id: "4",
        avatar:
            "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        name: "Edward Howell",
    },
    {
        id: "5",
        avatar:
            "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        name: "Amin RK",
    },
    {
        id: "6",
        avatar:
            "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        name: "Edward Howell",
    },
];

export default function LiveSearch() {
    const [displaySearch, setDisplaySearch] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const handleOnFocus = () => {
        if (results.length) setDisplaySearch(true);
    }

    const handleOnBlur = () => {
        setDisplaySearch(false);
        setFocusedIndex(-1);
    }

    const handleSelection = (selectedItem) => {
        console.log(selectedItem);
    }

    const handleKeyDown = ({ key }) => {
        let nextCount;
        const keys = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape'];
        if (!keys.includes(key)) return;

        // move selection up and down
        if (key === 'ArrowDown') {
            nextCount = (focusedIndex + 1) % results.length;
        }
        if (key === 'ArrowUp') {
            nextCount = (focusedIndex + results.length - 1) % results.length;
        }

        if (key === 'Enter') return handleSelection(results[focusedIndex]);

        setFocusedIndex(nextCount);
    }

    return (
        <div className='relative'>
            <input
                type='text'
                className={`${commonInputClasses} border-2 rounded p-1 text-lg`}
                placeholder='Search Profile'
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                onKeyDown={handleKeyDown}
            />
            <SearchResults
                focusedIndex={focusedIndex}
                visible={displaySearch}
                results={results}
                onSelect={handleSelection}
            />
        </div>
    );
};


const SearchResults = ({
    visible,
    results = [],
    focusedIndex,
    onSelect,
    renderItem,
    resultContainerStyle,
    selectedResultStyle
}) => {
    const resultContainer = useRef();

    useEffect(() => {
        resultContainer.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }, [focusedIndex]);

    if (!visible) return null;

    return (
        <div className='absolute right-0 left-0 top-10 bg-white 
        dark:bg-secondary shadow-md p-2 max-h-64 space-y-2 mt-1
        overflow-auto custom-scroll-bar'>
            {results.map((result, index) => {

                const getSelectedClass = () => {
                    return selectedResultStyle
                        ? selectedResultStyle
                        : 'dark:bg-dark-subtle bg-light-subtle'
                }

                return (
                    <ResultCard
                        ref={index === focusedIndex ? resultContainer : null}
                        key={result.id}
                        item={result}
                        renderItem={(item) => (
                            <div className='flex space-x-2'>
                                <img src={item.avatar} alt={item.name} className='w-16 h-16 rounded object-cover' />
                                <p className='dark:text-white font-semibold'>{item.name}</p>
                            </div>
                        )}
                        resultContainerStyle={resultContainerStyle}
                        selectedResultStyle={index === focusedIndex ? getSelectedClass() : ''}
                        onMouseDown={() => onSelect(result)}
                    />
                )
            })}
        </div>
    );
};

const ResultCard = forwardRef((props, ref) => {
    const {
        item,
        renderItem,
        resultContainerStyle,
        selectedResultStyle,
        onMouseDown
    } = props;

    const getClasses = () => {
        if (resultContainerStyle) return resultContainerStyle + '' + selectedResultStyle;
        return `${selectedResultStyle} cursor-pointer rounded overflow-hidden 
        dark:hover:bg-dark-subtle hover:bg-light-subtle transition`
    }

    return (
        <div onMouseDown={onMouseDown} ref={ref} className={getClasses()}>
            {renderItem(item)}
        </div>
    );
});
