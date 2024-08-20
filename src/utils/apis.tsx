import jwtDecode from 'jwt-decode';

const apiBaseUrl = 'https://shyamaceramics.in.net/api';

export const getLoginAuthToken = () => {
    const localAuthToken = localStorage.getItem('accessToken');
    return localAuthToken;
};

export const isTokenExpired = () => {
    const token = getLoginAuthToken();
    if (token) {
        const decoded: any = jwtDecode(token);
        if (decoded) {
            const exp = decoded.exp;
            const currentTime = Math.floor(Date.now() / 1000);
            const fiveMinutesAgo = currentTime + (5 * 60);
            return fiveMinutesAgo >= exp;
        }
    }
    return false;
};

const getApiCall = async (str: string) => {
    try {
        if (!getLoginAuthToken() || isTokenExpired()) {
            // await generateRefreshToken();
        }
        let data: any = await fetch(`${apiBaseUrl}/${str}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getLoginAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });

        if (data.status === 200) {
            data = await data.json();
            return data.data;
        } else {
            return null;
        }
    } catch (error: any) {
        console.log('error -> ', error);
        return 'Server Error';
    }
};

const putApiCall = async (content: any, str: string) => {
    try {
        if (!getLoginAuthToken() || isTokenExpired()) {
            // await generateRefreshToken();
        }
        let data: any = await fetch(`${apiBaseUrl}/${str}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getLoginAuthToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content),
        });
        if (data.status === 200) {
            data = await data.json();
            return data.data;
        } else {
            return null;
        }
    } catch (error: any) {
        return 'Server Error!!';
    }
};

const postApiCall = async (content: any, str: string) => {
    try {
        if (!getLoginAuthToken() || isTokenExpired()) {
            // await generateRefreshToken();
        }
        const data1 = await fetch(`${apiBaseUrl}/${str}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getLoginAuthToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content),
        });
        let data = await data1.json();
        if (data1.status === 201) {
            return data;
        } else {
            return null;
        }
    } catch (error: any) {
        console.error('API call error:', error);
        return error.message;
    }
};

const deleteApiCall = async (content: any, str: any) => {
    try {
        if (!getLoginAuthToken() || isTokenExpired()) {
            // await generateRefreshToken();
        }
        const data1 = await fetch(`${apiBaseUrl}/${str}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getLoginAuthToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content),
        });
        let data = await data1.json();
        if (data1.status === 200) {
            return data;
        } else {
            return null;
        }
    } catch (error: any) {
        console.error('API call error:', error);
        return error.message;
    }
};

export const callToFetchUserDetails = async () => {
    const data = await getApiCall(`user/fetch`);
    return data;
};

export const callToFetchAllUsers = async () => {
    const data = await getApiCall(`user/all`);
    return data;
};

export const callToSaveUserDetails = async (content: any, url: string) => {
    const data = await postApiCall(content, url);
    return data;
};

export const callToSaveProductDetail = async (content: any, url: string) => {
    const data = await postApiCall(content, url);
    return data;
};

export const callToFetchProductDetails = async (content: any) => {
    const data = await putApiCall(content, `product/fetch`);
    return data;
};

export const callToUpdateProductDetail = async (content: any) => {
    const data = await putApiCall(content, `product/update/`);
    return data;
};

export const callToDeleteProductDetail = async (content: any) => {
    const data = await deleteApiCall(content, `product/delete/`);
    return data;
};

export const callToFetchOrdersData = async () => {
    const data = await getApiCall(`order/fetch`);
    return data;
};

export const callToFetchOrderProducts = async (id: any) => {
    const data = await getApiCall(`order/${id}`);
    return data;
};

export const callToMakeOrderData = async (content: any, url: string) => {
    const data = await postApiCall(content, url);
    return data;
};

export const callToMarkOrder = async (content: any, url: string) => {
    const data = await putApiCall(content, url);
    return data;
};

export const callToCheckUserExistOrNot = async (content: any, url: string) => {
    const data = await putApiCall(content, url);
    return data;
};
