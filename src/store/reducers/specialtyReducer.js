import actionTypes from '../actions/actionTypes';

const initialState = {
    isCreatingSpecialty: false,
    isLoadingAllNameSpecialties: false,
    allNameSpecialties: [],
    isLoadingSpecialtyDetail: false,
    specialtyDetail: []
}

const specialtyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_SPECIALTY_SUCCESS:
            state.isCreatingSpecialty = true
            return {
                ...state
            }
        case actionTypes.CREATE_SPECIALTY_SUCCESS:
            state.isCreatingSpecialty = false
            return {
                ...state
            }
        case actionTypes.CREATE_SPECIALTY_FAILED:
            state.isCreatingSpecialty = false
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_NAME_SPECIALTIES_START:
            state.isLoadingAllNameSpecialties = true
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_NAME_SPECIALTIES_SUCCESS:
            state.allNameSpecialties = action.data
            state.isLoadingAllNameSpecialties = false
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_NAME_SPECIALTIES_FAILED:
            state.allNameSpecialties = []
            state.isLoadingAllNameSpecialties = false
            return {
                ...state
            }

        case actionTypes.FETCH_SPECIALTY_DETAIL_START:
            state.isLoadingSpecialtyDetail = true
            return {
                ...state
            }
        case actionTypes.FETCH_SPECIALTY_DETAIL_SUCCESS:
            state.specialtyDetail = action.data
            state.isLoadingSpecialtyDetail = false
            return {
                ...state
            }
        case actionTypes.FETCH_SPECIALTY_DETAIL_FAILED:
            state.specialtyDetail = []
            state.isLoadingSpecialtyDetail = false
            return {
                ...state
            }
        default:
            return state;
    }
}

export default specialtyReducer