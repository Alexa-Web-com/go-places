import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './languageSlice'
import currencyReducer from './currencySlice'
import citiesListReducer from './citiesListSlice'
import cityDetailsReducer from './cityDetailsSlice'

export const store = configureStore({
    reducer: {
        lang: languageReducer,
        curr: currencyReducer,
        citiesList: citiesListReducer,
        cityDetails: cityDetailsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>