import { createSlice } from '@reduxjs/toolkit';


export const searchRegisterNombreSlice = createSlice({
    name: 'search-register-nombre',
    initialState: "",
    reducers: {
        searchRegisterNombre: (state, action) =>
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


export const { searchRegisterNombre } = searchRegisterNombreSlice.actions;

export default searchRegisterNombreSlice.reducer;