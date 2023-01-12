import actionTypes from './actionTypes';
import * as services from '../../services'
import { toast } from 'react-toastify';

export const getNameDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.GET_DOCTOR_NAME_START
            })
            let res = await services.loadDoctorsService()
            if (res && res.errCode === '0') {
                dispatch(getNameDoctorsSuccess(res.data))
            } else {
                dispatch(getNameDoctorsFailed())
            }
        } catch (e) {
            console.log('getNameDoctorsStart error:', e)
        }
    }
}
export const getNameDoctorsSuccess = (data) => ({
    type: actionTypes.GET_DOCTOR_NAME_SUCCESS,
    data
})
export const getNameDoctorsFailed = () => ({
    type: actionTypes.GET_DOCTOR_NAME_FAILED
})

export const createDoctorInfoStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.CREATE_DOCTOR_INFO_START
            })
            let res = await services.createDoctorInfoService(data)
            if (res && res.errCode === '0') {
                dispatch(createDoctorInfoSuccess())
                toast.success('Success..')
                // toast.success(<FormattedMessage id="users.user-redux.toast.create.success" />)

            } else {
                toast.error('Error..')
                dispatch(createDoctorInfoFailed())
            }
        } catch (e) {
            console.log('createDoctorInfoStart error:', e)
        }
    }
}
export const createDoctorInfoSuccess = () => ({
    type: actionTypes.CREATE_DOCTOR_INFO_SUCCESS
})
export const createDoctorInfoFailed = () => ({
    type: actionTypes.CREATE_DOCTOR_INFO_FAILED
})


