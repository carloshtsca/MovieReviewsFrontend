export default function AppSearchForm({ placeholder }) {
    return (
        <form>
            <input
                type="text"
                className="border-2 dark:border-dark-subtle border-light-subtle 
                dark:focus:border-white focus:border-primary dark:text-white 
                transition bg-transparent rounded text-lg p-1 outline-none"
                placeholder={placeholder}
            />
        </form>
    );
};
