import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null,
    challengeName: '', // Store challengeName
}

export const arcadeSlice = createSlice({
    name: 'challenge',
    initialState,
    reducers: {
        getChallenge(state, action) {
            state.data = action.payload;
            state.challengeName = action.payload.challenge_name; // Store challenge_name globally
        },
        resetChallenge(state) {
            state.data = null;
            state.challengeName = ''; // Reset challengeName
        },
    }
})

export const { getChallenge, resetChallenge } = arcadeSlice.actions;

export default arcadeSlice.reducer;
