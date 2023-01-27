import actionTypes from './actionTypes';
import * as services from '../../services'
import { toast } from 'react-toastify';
import * as utils from '../../utils'
import { FormattedMessage } from 'react-intl';

export const fetchAllNameSpecialtiesStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ALL_NAME_SPECIALTIES_START
            })
            let res = await services.fetchAllNameSpecialtiesService(id)
            if (res && res.errCode === '0') {
                dispatch(fetchAllNameSpecialtiesSuccess(res.data))
            } else {
                dispatch(fetchAllNameSpecialtiesFailed())
            }
        } catch (e) {
            console.log('fetchAllNameSpecialtiesStart error:', e)
        }
    }
}
export const fetchAllNameSpecialtiesSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_NAME_SPECIALTIES_SUCCESS,
    data
})
export const fetchAllNameSpecialtiesFailed = () => ({
    type: actionTypes.FETCH_ALL_NAME_SPECIALTIES_FAILED
})

export const createSpecialtyStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.CREATE_SPECIALTY_START
            })
            let res = await services.createSpecialtyService(data)
            if (res && res.errCode === '0') {
                dispatch(createSpecialtySuccess())
                toast.success(<FormattedMessage id='users.user-redux.toast.create.success' />)
                utils.emitter.emit('CREATE SPECIALTY SUCCESSFULLY')
            } else {
                toast.error(<FormattedMessage id='manage-specialties.toast-error' />)
                dispatch(createSpecialtyFailed())
            }
        } catch (e) {
            console.log('createSpecialtyStart error:', e)
        }
    }
}
export const createSpecialtySuccess = () => ({
    type: actionTypes.CREATE_SPECIALTY_SUCCESS
})
export const createSpecialtyFailed = () => ({
    type: actionTypes.CREATE_SPECIALTY_FAILED
})