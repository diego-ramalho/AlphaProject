import { createSlice } from '@reduxjs/toolkit';



export const zoneSlice = createSlice({
    name: 'zone',
    initialState: 0,
    reducers: {
        updateZone: (state, action) =>
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


export const { updateZone } = zoneSlice.actions;

export default zoneSlice.reducer;