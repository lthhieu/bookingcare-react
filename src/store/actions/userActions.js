import actionTypes from './actionTypes';
import * as services from '../../services'

import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

//make by me
export const loginStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.LOGIN_START
            })
            let res = await services.loginService(data)
            if (res && res.errCode === '0') {
                dispatch(loginSuccess(res.data))
            } else {
                if (res.msg === 'Missing email or password') {
                    toast.error(<FormattedMessage id="login.error1" />)
                }
                else if (res.msg === 'Email is not exist in database') {
                    toast.error(<FormattedMessage id="login.error2" />)
                } else if (res.msg === 'Password is not correct') {
                    toast.error(<FormattedMessage id="login.error3" />)
                }
                dispatch(loginFailed())
            }
        } catch (e) {
            console.log('loginStart error:', e)
        }
    }
}
export const loginSuccess = (data) => ({
    type: actionTypes.LOGIN_SUCCESS,
    data
})
export const loginFailed = () => ({
    type: actionTypes.LOGIN_FAILED
})

