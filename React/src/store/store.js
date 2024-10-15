import { configureStore } from '@reduxjs/toolkit';
import zoneReducer from './zoneSlice';
import searchNewsReducer from './searchNewsSlice';
import searchChargeReducer from './searchChargeSlice';
import searchRegisterDireccionReducer from './searchRegisterDireccionSlice';
import searchRegisterNombreReducer from './searchRegisterNombreSlice';
import searchRegisterPuertaReducer from './searchRegisterPuertaSlice';
import searchRegisterDniReducer from './searchRegisterDniSlice';
import searchRegisterCorreoReducer from './searchRegisterCorreoSlice';
import searchRegisterTelefonoReducer from './searchRegisterTelefonoSlice';
import previousPageCodeReducer from './previousPageCodeSlice';
import previousPagePathReducer from './previousPagePathSlice';

export default configureStore({
    reducer: {
        zone: zoneReducer,
        searchNews: searchNewsReducer,
        searchCharge: searchChargeReducer,
        searchRegisterDireccion: searchRegisterDireccionReducer,
        searchRegisterNombre: searchRegisterNombreReducer,
        searchRegisterPuerta: searchRegisterPuertaReducer,
        searchRegisterDni: searchRegisterDniReducer,
        searchRegisterCorreo: searchRegisterCorreoReducer,
        searchRegisterTelefono: searchRegisterTelefonoReducer,
        previousPageCode: previousPageCodeReducer,
        previousPagePath: previousPagePathReducer,
    },
});
