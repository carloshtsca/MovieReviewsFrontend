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