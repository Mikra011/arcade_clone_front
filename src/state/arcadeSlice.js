import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null,           // For storing general challenge data
    challengeName: '',    // For storing the challenge name
    progress: [],         // For storing user progress data
};

export const arcadeSlice = createSlice({
    name: 'challenge',
    initialState,
    reducers: {
        getChallenge(state, action) {
            // Store general challenge details
            state.data = action.payload;
            state.challengeName = action.payload.challenge_name; // Store challenge_name globally
        },
        resetChallenge(state) {
            // Reset challenge data
            state.data = null;
            state.challengeName = ''; // Reset challengeName
        },
        setProgress(state, action) {
            // Store progress data separately
            state.progress = action.payload;
        }
    }
});

export const {
    getChallenge,
    resetChallenge,
    setProgress
} = arcadeSlice.actions;

export default arcadeSlice.reducer;
