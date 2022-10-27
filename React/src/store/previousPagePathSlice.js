import { createSlice } from '@reduxjs/toolkit';



export const previousPagePathSlice = createSlice({
    name: 'previous-page-path',
    initialState: "",
    reducers: {
        previousPagePath: (state, action) =>
        {
            state = action.payload;
            return state;
        },
    },
});


export const { previousPagePath } = previousPagePathSlice.actions;

export default previousPagePathSlice.reducer;