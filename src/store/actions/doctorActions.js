import actionTypes from './actionTypes';
import * as services from '../../services'
import { toast } from 'react-toastify';
import * as utils from '../../utils'
import { FormattedMessage } from 'react-intl';

export const getNameDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.GET_DOCTOR_NAME_START
            })
            let res = await services.getNameAllDoctorsService()
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

export const createOrUpdateDoctorInfoStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.CREATE_OR_UPDATE_DOCTOR_INFO_START
            })
            let res = await services.createOrUpdateDoctorInfoService(data)
            if (res && res.errCode === '0') {
                dispatch(createOrUpdateDoctorInfoSuccess())
                if (res.msg === utils.ALERTS.CREATE) {
                    toast.success(<FormattedMessage id="users.manage-doctors.toast.create.success" />)
                } else if (res.msg === utils.ALERTS.UPDATE) {
                    toast.success(<FormattedMessage id="users.manage-doctors.toast.update.success" />)
                }
            } else {
                toast.error(<FormattedMessage id="users.manage-doctors.toast.error" />)
                dispatch(createOrUpdateDoctorInfoFailed())
            }
        } catch (e) {
            console.log('createOrUpdateDoctorInfoStart error:', e)
        }
    }
}
export const createOrUpdateDoctorInfoSuccess = () => ({
    type: actionTypes.CREATE_OR_UPDATE_DOCTOR_INFO_SUCCESS
})
export const createOrUpdateDoctorInfoFailed = () => ({
    type: actionTypes.CREATE_OR_UPDATE_DOCTOR_INFO_FAILED
})

export const fetchTimeStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_TIME_START
            })
            let res = await services.getAllCode('time')
            if (res && res.errCode === '0') {
                dispatch(fetchTimeSuccess(res.data))
            } else {
                dispatch(fetchTimeFailed())
            }
        } catch (e) {
            console.log('fetchTimeStart error:', e)
        }
    }
}
export const fetchTimeSuccess = (data) => ({
    type: actionTypes.FETCH_TIME_SUCCESS,
    data
})
export const fetchTimeFailed = () => ({
    type: actionTypes.FETCH_TIME_FAILED
})

export const createBulkScheduleStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.CREATE_BULK_SCHEDULE_START
            })
            let res = await services.bulkCreateScheduleService(data)
            if (res && res.errCode === '0') {
                dispatch(createBulkScheduleSuccess())
                if (res.msg === utils.ALERTS.CREATE) {
                    toast.success(<FormattedMessage id="users.manage-doctors.toast.create.success" />)
                }
            } else {
                toast.error(<FormattedMessage id="users.manage-doctors.toast.error" />)
                dispatch(createBulkScheduleFailed())
            }
        } catch (e) {
            console.log('createBulkScheduleStart error:', e)
        }
    }
}
export const createBulkScheduleSuccess = () => ({
    type: actionTypes.CREATE_BULK_SCHEDULE_SUCCESS
})
export const createBulkScheduleFailed = () => ({
    type: actionTypes.CREATE_BULK_SCHEDULE_FAILED
})
