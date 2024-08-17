import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  displayAllQuotes: true,
  highlightedQuote: null,
}

export const arcadeSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    toggleVisibility(state) {
      state.displayAllQuotes = !state.displayAllQuotes
    },
    setHighlightedQuote(state, action) {
      if (state.highlightedQuote === action.payload) {
        state.highlightedQuote = null
      } else {
        state.highlightedQuote = action.payload
      }
    },
  }
})

export const {
  setHighlightedQuote,
  toggleVisibility,
} = quotesSlice.actions

export default arcadeSlice.reducer
