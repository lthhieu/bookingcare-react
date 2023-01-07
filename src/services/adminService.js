import axios from '../axios';
export const createNewUserRedux = (data) => {
    return axios.post('api/create-new-users', data)
}
export const fetchUsersRedux = (id) => {
    return axios.get('api/get-all-users', { params: { id } })
}
export const deleteUserRedux = (id) => {
    return axios.delete('api/delete-users', { data: { id } })
}
export const updateUserRedux = (data) => {
    return axios.put('api/update-users', data)
}