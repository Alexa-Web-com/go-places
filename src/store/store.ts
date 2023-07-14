import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './languageSlice'
import currencyReducer from './currencySlice'
import citiesListReducer from './citiesListSlice'
import cityDetailsReducer from './cityDetailsSlice'
import citiesCompareReducer from './citiesCompareSlice'

export const store = configureStore({
    reducer: {
        lang: languageReducer,
        curr: currencyReducer,
        citiesList: citiesListReducer,
        cityDetails: cityDetailsReducer,
        citiesCompare: citiesCompareReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>