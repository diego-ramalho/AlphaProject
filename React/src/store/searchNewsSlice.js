import { createSlice } from '@reduxjs/toolkit';



export const searchNewsSlice = createSlice({
    name: 'search-news',
    initialState: "",
    reducers: {
        searchNews: (state, action) =>
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


export const { searchNews } = searchNewsSlice.actions;

export default searchNewsSlice.reducer;