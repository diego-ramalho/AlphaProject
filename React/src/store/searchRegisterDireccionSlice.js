import { createSlice } from '@reduxjs/toolkit';


export const searchRegisterDireccionSlice = createSlice({
    name: 'search-register-direccion',
    initialState: "",
    reducers: {
        searchRegisterDireccion: (state, action) =>
        {
            state = action.payload;
            return state;
            // return [
            //     ...state,
            //     action.payload
            //   ]
        },
    },
});


export const { searchRegisterDireccion } = searchRegisterDireccionSlice.actions;

export default searchRegisterDireccionSlice.reducer;