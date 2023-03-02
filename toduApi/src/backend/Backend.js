import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleToast from 'react-native-simple-toast';
import { print } from '../constants/helpers';

// DEMO
export const BASE_URL = 'http://54.144.109.80:5000';
export const API = `${BASE_URL}/api/v1`;
export const statusMessage = {
    400: 'Invalid request format.',
    401: 'Invalid API Key.',
    403: 'The request is forbidden.',
    404: 'The specified resource could not be found.',
    405: 'You tried to access the resource with an invalid method.',
    500: 'We had a problem with our server. Try again later.',
    503: "We're temporarily offline for maintenance. Please try again later.",
};

export const DefaultToast = (MSG = '') => {
    SimpleToast.show(MSG, SimpleToast.SHORT);
};

export const getToken = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    print(token);
    return token;
};

export const getUserData = async (field = null) => {
    const userDataRes = await AsyncStorage.getItem('userData');
    if (!field) {
        return JSON.parse(userDataRes);
    } else {
        const userData = JSON.parse(userDataRes);
        return userData[field];
    }
};

const responseBack = (data, msg, status) => {
    return {
        data,
        msg,
        status,
    };
};
export const logoutHandler = async () => {
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('TOKEN');
    await AsyncStorage.removeItem('userType');
    return;
};
const printAPIDetails = (token, url, body) => {
    // print every api data on console for test purpose you can comment in live build
    print('TOKEN : ', token);
    print('URL : ', url);
    print('BODY : ', body);
    return;
};
export const POST = async (
    route,
    body = {},
    headers = {},
    onSuccess = () => { },
    onError = () => { },
    onFail = () => {
        SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
    },
) => {
    try {
        printAPIDetails('NO TOKEN', route, body);
        const res = await fetch(route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(body),
        });
        // console.log('here 2');
        if (res.status !== 200) {
            const resText = await res.text();
            print('---->', resText);
            onError({ data: null, msg: statusMessage[res.status], status: 'error' });
            return { data: null, msg: statusMessage[res.status], status: 'error' };
        }
        const resJSON = await res.json();
        // print(resJSON)
        if (resJSON.ok === true) {
            onSuccess(resJSON);
            return {
                ...resJSON,
            };
        } else {
            onError(resJSON);
            return {
                ...resJSON,
            };
        }
    } catch (error) {
        console.log(error);
        onFail({ data: null, msg: 'Network Error', status: 'error' });
        return { data: null, msg: 'Network Error', status: 'error' };
    }
};
export const POST_FORMDATA = async (
    route,
    body = {},
    onSuccess = () => { },
    onError = () => { },
    onFail = () => {
        SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
    },
) => {
    // console.log('here');
    printAPIDetails('NO TOKEN', route, body);
    try {
        const res = await fetch(API + route, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body,
        });
        // console.log('here 2');
        // console.log(res.status);
        if (res.status !== 200) {
            const resText = await res.text();
            print(resText);
            // console.log('==>', resText);
            // console.log(res.status, statusMessage[res.status]);
            SimpleToast.show(
                `Try Again, ${statusMessage[res.status]}`,
                SimpleToast.SHORT,
            );
            onError({ data: null, msg: statusMessage[res.status], status: 'error' });
            return { data: null, msg: statusMessage[res.status], status: 'error' };
        }
        const resJSON = await res.json();
        if (resJSON.status === 'success') {
            onSuccess(resJSON);
            return {
                ...resJSON,
            };
        } else {
            onError(resJSON);
            return {
                ...resJSON,
            };
        }
    } catch (error) {
        // console.log('FAIL', error);
        onFail({ data: null, msg: 'Network Error', status: 'error' });
        return { data: null, msg: 'Network Error', status: 'error' };
    }
};
export const GET = async (
    route,
    onSuccess = () => { },
    onError = () => { },
    onFail = () => {
        SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
    },
) => {
    // console.log('LANG', strings.getLanguage());
    printAPIDetails('NO TOKEN', route, 'No Body');
    try {
        const res = await fetch(route, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });
        // console.log(res.status);
        if (res.status !== 200) {
            const resText = await res.text();
            print(resText);
            onError({ data: null, msg: statusMessage[res.status], status: 'error' });
            return { data: null, msg: statusMessage[res.status], status: 'error' };
        }
        const resJSON = await res.json();
        if (resJSON.ok === true) {
            // console.log(route, resJSON.msg);
            onSuccess(resJSON);
            return {
                ...resJSON,
            };
        } else {
            // console.log(route, resJSON.msg);
            onError(resJSON);
            return {
                ...resJSON,
            };
        }
    } catch (error) {
        print('----', error)
        onFail({ data: null, msg: 'Network Error', status: 'error' });
        return { data: null, msg: 'Network Error', status: 'error' };
    }
};
export const POST_WITH_TOKEN = async (
    route,
    body = {},
    onSuccess = () => { },
    onError = () => { },
    onFail = () => {
        SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
    },
    headers = {
        'Content-Type': 'application/json',
    },
) => {
    try {
        const token = await getToken();
        printAPIDetails(token, route, body);

        const res = await fetch(API + route, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...headers,
            },
            body,
            method: 'POST',
        });
        // console.log(res.status);
        if (res.status !== 200) {
            const resText = await res.text();
            print(resText);
            onError({ data: null, msg: statusMessage[res.status], status: 'error' });
            return { data: null, msg: statusMessage[res.status], status: 'error' };
        }
        const resJSON = await res.json();
        if (resJSON.status === 'success') {
            onSuccess(resJSON);
            return {
                ...resJSON,
            };
        } else {
            onError(resJSON);
            return {
                ...resJSON,
            };
        }
    } catch (error) {
        // console.log(route);
        // console.log(error);
        onFail({ data: null, msg: 'Network Error', status: 'error' });
        return { data: null, msg: 'Network Error', status: 'error' };
    }
};
export const GET_WITH_TOKEN = async (
    route,
    onSuccess = () => { },
    onError = () => { },
    onFail = () => {
        SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
    },
    headers = {},
    status = () => { },
) => {
    try {
        // console.log(route);
        const token = await getToken();
        printAPIDetails(token, route, 'NO BODY');
        // console.log(token);
        const res = await fetch(API + route, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                ...headers,
            },
            method: 'GET',
        });
        // console.log('-----------------');
        // console.log(res.status);
        // console.log('-----------------');
        if (res.status !== 200) {
            const resText = await res.text();
            print(resText);
            onError({ data: null, msg: statusMessage[res.status], status: 'error' });
            status(res.status);
            return { data: null, msg: statusMessage[res.status], status: 'error' };
        }
        const resJSON = await res.json();
        if (resJSON.status === 'success') {
            status(res.status);
            onSuccess(resJSON);
            return {
                ...resJSON,
            };
        } else {
            // console.log('Error', resJSON);
            status(res.status);
            onError(resJSON);
            return {
                ...resJSON,
            };
        }
    } catch (error) {
        // console.log(error);
        onFail({ data: null, msg: 'Network Error', status: 'error', error });
        return { data: null, msg: 'Network Error', status: 'error' };
    }
};
export const DELETE_WITH_TOKEN = async (
    route,
    onSuccess = () => { },
    onError = () => { },
    onFail = () => {
        SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
    },
    headers = {},
) => {
    // console.log(route);
    try {
        const token = await getToken();
        printAPIDetails(token, route, null);
        const res = await fetch(API + route, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                ...headers,
            },
            method: 'DELETE',
        });
        if (res.status !== 200) {
            SimpleToast.show(
                `Try Again, ${statusMessage[res.status]}`,
                SimpleToast.SHORT,
            );
            const resText = await res.text();
            print(resText);
            onError({ data: null, msg: statusMessage[res.status], status: 'error' });
            return { data: null, msg: statusMessage[res.status], status: 'error' };
        }
        const resJSON = await res.json();
        if (resJSON.status === 'success') {
            onSuccess(resJSON);
            return {
                ...resJSON,
            };
        } else {
            onError(resJSON);
            return {
                ...resJSON,
            };
        }
    } catch (error) {
        onFail({ data: null, msg: 'Network Error', status: 'error', error });
        return { data: null, msg: 'Network Error', status: 'error' };
    }
};

export function onErrorFound(res, onError) {
    const errorResponse = responseBack(null, statusMessage[res.status], 'error');
    onError(errorResponse);
    return errorResponse;
}
