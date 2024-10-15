import { createSlice } from '@reduxjs/toolkit';


export const searchRegisterDniSlice = createSlice({
    name: 'search-register-dni',
    initialState: "",
    reducers: {
        searchRegisterDni: (state, action) =>
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


export const { searchRegisterDni } = searchRegisterDniSlice.actions;

export default searchRegisterDniSlice.reducer;