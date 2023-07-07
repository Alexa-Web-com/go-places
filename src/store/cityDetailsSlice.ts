import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IExchangeRate {
    [key: string]: number;
}

interface IExchangeRatesUpdated {
    date: string;
    timestamp: number
}

interface ICityPricesUsd {
    min: string; avg: string; max: string;
}

export interface ICityPrices {
    avg: number,
    category_id: number,
    category_name: string,
    currency_code?: string,
    good_id: number,
    item_name: string,
    max: number,
    measure: string,
    min: number,
    usd?: ICityPricesUsd
}

export interface ICityDetails {
    city_id: number;
    city_name: string;
    country_name: string;
    exchange_rate: IExchangeRate;
    exchange_rates_updated: IExchangeRatesUpdated;
    prices: ICityPrices[];
    state_code: null;
    error: null;
}

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
            }
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