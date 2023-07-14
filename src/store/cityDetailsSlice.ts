import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICityDetails } from '../utils/types';


interface ICityDetailsState {
    cityDetailsState: ICityDetails
}

const initialState: ICityDetailsState = {
    cityDetailsState: {
        city_id: 0,
        city_name: '',
        country_name: '',
        error: null,
        exchange_rate: {
            USD: 0,
        },
        exchange_rates_updated: {
            date: '',
            timestamp: 0,
        },
        prices: [{
            avg: 0,
            category_id: 0,
            category_name: '',
            currency_code: '',
            good_id: 0,
            item_name: '',
            max: 0,
            measure: '',
            min: 0,
            usd: {
                min: '', avg: '', max: '',
            },
            qty: 1,
            itemValue: 0,
        },],
        state_code: null,
    }
}

export const cityDetailsSlice = createSlice({
    name: 'cityDetails',
    initialState,
    reducers: {
        setCityDetails: (state, action: PayloadAction<ICityDetails>) => {
            state.cityDetailsState = action.payload
        },
    },
})

export const { setCityDetails } = cityDetailsSlice.actions

export default cityDetailsSlice.reducer