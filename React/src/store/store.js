import { configureStore } from '@reduxjs/toolkit';
import zoneReducer from './zoneSlice';
import searchRegisterReducer from './searchRegisterSlice';

export default configureStore({
    reducer: {
        zone: zoneReducer,
        searchRegister: searchRegisterReducer,
    },
});
