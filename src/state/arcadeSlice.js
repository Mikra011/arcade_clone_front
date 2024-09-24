import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null,
}

export const arcadeSlice = createSlice({
    name: 'challenge',
    initialState,
    reducers: {
        getChallenge(state, action) {
            state.data = action.payload
        },
    }
})

export const {
    getChallenge
} = arcadeSlice.actions

export default arcadeSlice.reducer
