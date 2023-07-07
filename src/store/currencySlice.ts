import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { languageSlice } from './languageSlice'


interface ICurrState {
    currState: string
}

const initialState: ICurrState = {
    currState: languageSlice.getInitialState().langState === 'PL' ? 'EUR' : 'USD'
}

export const currencySlice = createSlice({
    name: 'curr',
    initialState,
    reducers: {
        changeCurr: (state, action: PayloadAction<string>) => {
            state.currState = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeCurr } = currencySlice.actions

export default currencySlice.reducer