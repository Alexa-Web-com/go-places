import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { languages } from '../utils/dict'

interface ILangState {
    langState: string
}
const langFromNavivgator: string = (navigator.language.substring(0, 2)).toUpperCase()

const initialState: ILangState = {
    langState: languages.find((lang) => lang === langFromNavivgator) ? langFromNavivgator : 'EN'
}

export const languageSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        changeLang: (state, action: PayloadAction<string>) => {
            state.langState = action.payload
        },
    },
})

export const { changeLang } = languageSlice.actions

export default languageSlice.reducer