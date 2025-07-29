import client from "./client";

export const createActor = async (formData) => {
    const token = localStorage.getItem('auth-token');
    try {
        const { data } = await client.post('/actor/create', formData, {
            headers: {
                authorization: 'Bearer ' + token,
                'content-type': 'multipart/form-data',
            },
        });
        return data;
    } catch (error) {
        const { response } = error;
        if (response?.data) return response.data;
        return { error: error.response || error };
    }
}