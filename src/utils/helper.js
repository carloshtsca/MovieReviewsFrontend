export const isValidEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return isValid.test(email);
}

export const getToken = () => localStorage.getItem('auth-token');

export const catchError = (error) => {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.response || error };
}

export const renderItem = (result) => {
    return (
        <div key={result.id} className='flex space-x-2 rounded overflow-hidden'>
            <img src={result.avatar} alt={result.name} className='w-16 h-16 rounded object-cover' />
            <p className='dark:text-white font-semibold'>{result.name}</p>
        </div>
    );
};