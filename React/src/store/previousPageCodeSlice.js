import { createSlice } from '@reduxjs/toolkit';



export const previousPageCodeSlice = createSlice({
    name: 'previous-page-code',
    initialState: "",
    reducers: {
        previousPageCode: (state, action) =>
        {
            state = action.payload;
            return state;
        },
    },
});


export const { previousPageCode } = previousPageCodeSlice.actions;

export default previousPageCodeSlice.reducer;