import { configureStore } from '@reduxjs/toolkit';
import zoneReducer from './zoneSlice';
import searchNewsReducer from './searchNewsSlice';
import searchChargeReducer from './searchChargeSlice';
import searchRegisterReducer from './searchRegisterSlice';

export default configureStore({
    reducer: {
        zone: zoneReducer,
        searchNews: searchNewsReducer,
        searchCharge: searchChargeReducer,
        searchRegister: searchRegisterReducer,
    },
});
