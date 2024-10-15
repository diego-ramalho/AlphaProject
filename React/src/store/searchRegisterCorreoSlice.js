import { createSlice } from '@reduxjs/toolkit';


export const searchRegisterCorreoSlice = createSlice({
    name: 'search-register-correo',
    initialState: "",
    reducers: {
        searchRegisterCorreo: (state, action) =>
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


export const { searchRegisterCorreo } = searchRegisterCorreoSlice.actions;

export default searchRegisterCorreoSlice.reducer;