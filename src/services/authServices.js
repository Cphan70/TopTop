import * as httpRequest from '~/utils/httpRequest';
import {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
} from '~/redux/authSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await httpRequest.post('auth/login', user);
        dispatch(loginSuccess(res));
        navigate('/');
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await httpRequest.post('auth/register', user);
        dispatch(registerSuccess());
        navigate('/');
    } catch (err) {
        dispatch(registerFailed());
    }
};
