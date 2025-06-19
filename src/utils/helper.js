export const isValidEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return isValid.test(email);
}