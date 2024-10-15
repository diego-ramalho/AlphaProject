import { createSlice } from '@reduxjs/toolkit';


export const searchRegisterTelefonoSlice = createSlice({
    name: 'search-register-telefono',
    initialState: "",
    reducers: {
        searchRegisterTelefono: (state, action) =>
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


export const { searchRegisterTelefono } = searchRegisterTelefonoSlice.actions;

export default searchRegisterTelefonoSlice.reducer;