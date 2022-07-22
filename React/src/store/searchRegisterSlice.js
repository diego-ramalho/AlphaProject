import { createSlice } from '@reduxjs/toolkit';



export const searchRegisterSlice = createSlice({
    name: 'search-register',
    initialState: 0,
    reducers: {
        searchRegister: (state, action) =>
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


export const { searchRegister } = searchRegisterSlice.actions;

export default searchRegisterSlice.reducer;