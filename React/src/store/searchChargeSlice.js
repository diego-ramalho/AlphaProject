import { createSlice } from '@reduxjs/toolkit';



export const searchChargeSlice = createSlice({
    name: 'search-charge',
    initialState: "",
    reducers: {
        searchCharge: (state, action) =>
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


export const { searchCharge } = searchChargeSlice.actions;

export default searchChargeSlice.reducer;