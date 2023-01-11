import axios from '../axios';

export const loadDoctorsService = (limit) => {
    return axios.get('api/fetch-doctor-home', { params: { limit } })
}