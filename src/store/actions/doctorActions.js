import actionTypes from './actionTypes';
import * as services from '../../services'
import { toast } from 'react-toastify';
import * as utils from '../../utils'
import { FormattedMessage } from 'react-intl';

export const getNameDoctorsStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.GET_DOCTOR_NAME_START
            })
            let res = await services.getNameAllDoctorsService(id)
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
                utils.emitter.emit('CREATE OR UPDATE DOCTOR INFO SUCCESSFULLY')
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
            let res = await services.getAllCodeService('time')
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

export const fetchScheduleDoctorStart = (doctorId, date) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_SCHEDULE_DOCTOR_START
            })
            let res = await services.fetchDoctorScheduleService(doctorId, date)
            if (res && res.errCode === '0') {
                dispatch(fetchScheduleDoctorSuccess(res.data))
            } else {
                dispatch(fetchScheduleDoctorFailed())
            }
        } catch (e) {
            console.log('fetchScheduleDoctorStart error:', e)
        }
    }
}
export const fetchScheduleDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_SCHEDULE_DOCTOR_SUCCESS,
    data
})
export const fetchScheduleDoctorFailed = () => ({
    type: actionTypes.FETCH_SCHEDULE_DOCTOR_FAILED
})

export const fetchDoctorInfoFromDoctorInfosTableStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_DOCTOR_INFO_FROM_DOCTOR_INFOS_TABLE_START
            })
            let resPrice = await services.getAllCodeService('price')
            let resPayment = await services.getAllCodeService('payment')
            let resProvince = await services.getAllCodeService('province')
            if (resPrice && resPrice.errCode === '0' && resPayment && resPayment.errCode === '0' && resProvince && resProvince.errCode === '0') {
                let data = {
                    prices: resPrice.data,
                    payments: resPayment.data,
                    provinces: resProvince.data,
                }
                dispatch(fetchDoctorInfoFromDoctorInfosTableSuccess(data))
            } else {
                dispatch(fetchDoctorInfoFromDoctorInfosTableFailed())
            }
        } catch (e) {
            console.log('fetchDoctorInfoFromDoctorInfosTableStart error:', e)
        }
    }
}
export const fetchDoctorInfoFromDoctorInfosTableSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_INFO_FROM_DOCTOR_INFOS_TABLE_SUCCESS,
    data
})
export const fetchDoctorInfoFromDoctorInfosTableFailed = () => ({
    type: actionTypes.FETCH_DOCTOR_INFO_FROM_DOCTOR_INFOS_TABLE_FAILED
})

export const fetchDoctorInfoStart = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_DOCTOR_INFO_START
            })
            let res = await services.fetchDoctorInfoService(doctorId)
            if (res && res.errCode === '0') {
                dispatch(fetchDoctorInfoSuccess(res.data))
            } else {
                dispatch(fetchDoctorInfoFailed())
            }
        } catch (e) {
            console.log('fetchDoctorInfoStart error:', e)
        }
    }
}
export const fetchDoctorInfoSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_INFO_SUCCESS,
    data
})
export const fetchDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_DOCTOR_INFO_FAILED
})

export const fetchDoctorDetailStart = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_DOCTOR_DETAIL_START
            })
            let res = await services.fetchDoctorDetailService(doctorId)
            if (res && res.errCode === '0') {
                dispatch(fetchDoctorDetailSuccess(res.data))
            } else {
                dispatch(fetchDoctorDetailFailed())
            }
        } catch (e) {
            console.log('fetchDoctorDetailStart error:', e)
        }
    }
}
export const fetchDoctorDetailSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_DETAIL_SUCCESS,
    data
})
export const fetchDoctorDetailFailed = () => ({
    type: actionTypes.FETCH_DOCTOR_DETAIL_FAILED
})

export const fetchDoctorProfileStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_DOCTOR_PROFILE_START
            })
            let res = await services.fetchDoctorProfileService(id)
            if (res && res.errCode === '0') {
                dispatch(fetchDoctorProfileSuccess(res.data))
            } else {
                dispatch(fetchDoctorProfileFailed())
            }
        } catch (e) {
            console.log('fetchDoctorProfileStart error:', e)
        }
    }
}
export const fetchDoctorProfileSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_PROFILE_SUCCESS,
    data
})
export const fetchDoctorProfileFailed = () => ({
    type: actionTypes.FETCH_DOCTOR_PROFILE_FAILED
})
