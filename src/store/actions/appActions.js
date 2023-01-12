import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
})

export const changeLanguage = (language) => ({
    type: actionTypes.CHANGE_LANGUAGE,
    language
})