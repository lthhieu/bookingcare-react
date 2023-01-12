import axios from '../axios';

export const loadDoctorsService = () => {
    return axios.get('api/get-all-doctors')
}
export const createDoctorInfoService = (data) => {
    return axios.post('api/create-doctor-info', data)
}