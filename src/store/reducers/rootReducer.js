import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import adminReducer from './adminReducer'
import homepageReducer from './homepageReducer';
import doctorReducer from './doctorReducer'

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import patientReducer from './patientReducer';
import specialtyReducer from './specialtyReducer';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo']
};
const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language']
};
export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    admin: adminReducer,
    homepage: homepageReducer,
    doctor: doctorReducer,
    patient: patientReducer,
    specialty: specialtyReducer
})