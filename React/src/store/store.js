import { configureStore } from '@reduxjs/toolkit';
import zoneReducer from './zoneSlice';

export default configureStore({
    reducer: {
        zone: zoneReducer,
    },
});
