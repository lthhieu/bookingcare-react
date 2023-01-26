import actionTypes from './actionTypes';
import * as services from '../../services'

import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

export const fetchGenderRolePositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_ROLE_POSITION_START
            })
            let resGender = await services.getAllCodeService('gender')
            let resRole = await services.getAllCodeService('role')
            let resPosition = await services.getAllCodeService('position')
            if (resGender && resGender.errCode === '0' && resRole && resRole.errCode === '0' && resPosition && resPosition.errCode === '0') {
                let data = {
                    genders: resGender.data,
                    roles: resRole.data,
                    positions: resPosition.data,
                }
                dispatch(fetchGenderRolePositionSuccess(data))
            } else {
                dispatch(fetchGenderRolePositionFailed())
            }
        } catch (e) {
            console.log('fetchGenderRolePositionStart error:', e)
        }
    }
}
export const fetchGenderRolePositionSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_ROLE_POSITION_SUCCESS,
    data
})
export const fetchGenderRolePositionFailed = () => ({
    type: actionTypes.FETCH_GENDER_ROLE_POSITION_FAILED
})


export const addNewUserReduxStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.ADD_NEW_USER_REDUX_START
            })
            let res = await services.createNewUserRedux(data)
            if (res && res.errCode === '0') {
                dispatch(addNewUserReduxSuccess())
                dispatch(fetchUsersStart())
                toast.success(<FormattedMessage id="users.user-redux.toast.create.success" />)

            } else {
                if (res.msg === 'This email is already existed') {
                    toast.error(<FormattedMessage id="users.user-redux.toast.create.error" />)
                }
                dispatch(addNewUserReduxFailed())
            }
        } catch (e) {
            console.log('addNewUserReduxStart error:', e)
        }
    }
}
export const addNewUserReduxSuccess = () => ({
    type: actionTypes.ADD_NEW_USER_REDUX_SUCCESS
})
export const addNewUserReduxFailed = () => ({
    type: actionTypes.ADD_NEW_USER_REDUX_FAILED
})

export const fetchUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_USERS_START
            })
            let res = await services.fetchUsersRedux('ALL')
            if (res && res.errCode === '0') {
                dispatch(fetchUsersSuccess(res.users.reverse()))
            } else {

                dispatch(fetchUsersFailed())
            }
        } catch (e) {
            console.log('fetchUsersStart error:', e)
        }
    }
}
export const fetchUsersSuccess = (data) => ({
    type: actionTypes.FETCH_USERS_SUCCESS,
    data
})
export const fetchUsersFailed = () => ({
    type: actionTypes.FETCH_USERS_FAILED
})

export const deleteUserReduxStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.DELETE_USERS_START
            })
            let res = await services.deleteUserRedux(data)
            if (res && res.errCode === '0') {
                toast.success(<FormattedMessage id="users.user-redux.toast.delete.success" />)
                dispatch(deleteUserReduxSuccess())
                dispatch(fetchUsersStart())

            } else {
                toast.error(<FormattedMessage id="users.user-redux.toast.delete.error" />)
                dispatch(deleteUserReduxFailed())
            }
        } catch (e) {
            console.log('deleteUserReduxStart error:', e)
        }
    }
}
export const deleteUserReduxSuccess = () => ({
    type: actionTypes.DELETE_USERS_SUCCESS
})
export const deleteUserReduxFailed = () => ({
    type: actionTypes.DELETE_USERS_FAILED
})

export const updateUserReduxStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.UPDATE_USERS_START
            })
            let res = await services.updateUserRedux(data)
            if (res && res.errCode === '0') {
                toast.success(<FormattedMessage id="users.user-redux.toast.update.success" />)
                dispatch(updateUserReduxSuccess())
                dispatch(fetchUsersStart())

            } else {
                if (res.msg === 'This email is used') {
                    toast.error(<FormattedMessage id="users.user-redux.toast.update.error" />)
                }
                dispatch(updateUserReduxFailed())
            }
        } catch (e) {
            console.log('updateUserReduxStart error:', e)
        }
    }
}
export const updateUserReduxSuccess = () => ({
    type: actionTypes.UPDATE_USERS_SUCCESS
})
export const updateUserReduxFailed = () => ({
    type: actionTypes.UPDATE_USERS_FAILED
})