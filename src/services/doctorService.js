import axios from '../axios';

export const getNameAllDoctorsService = () => {
    return axios.get('api/get-name-all-doctors')
}
export const createOrUpdateDoctorInfoService = (data) => {
    return axios.post('api/create-or-update-doctor-info', data)
}

export const bulkCreateScheduleService = (data) => {
    return axios.post('api/bulk-create-schedule', data)
}