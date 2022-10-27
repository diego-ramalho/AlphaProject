import { configureStore } from '@reduxjs/toolkit';
import zoneReducer from './zoneSlice';
import searchNewsReducer from './searchNewsSlice';
import searchChargeReducer from './searchChargeSlice';
import searchRegisterReducer from './searchRegisterSlice';
import previousPageCodeReducer from './previousPageCodeSlice';
import previousPagePathReducer from './previousPagePathSlice';

export default configureStore({
    reducer: {
        zone: zoneReducer,
        searchNews: searchNewsReducer,
        searchCharge: searchChargeReducer,
        searchRegister: searchRegisterReducer,
        previousPageCode: previousPageCodeReducer,
        previousPagePath: previousPagePathReducer,
    },
});
