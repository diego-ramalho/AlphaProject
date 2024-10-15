import { createSlice } from '@reduxjs/toolkit';


export const searchRegisterPuertaSlice = createSlice({
    name: 'search-register-puerta',
    initialState: "",
    reducers: {
        searchRegisterPuerta: (state, action) =>
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


export const { searchRegisterPuerta } = searchRegisterPuertaSlice.actions;

export default searchRegisterPuertaSlice.reducer;