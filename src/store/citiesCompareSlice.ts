import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICityDetails } from '../utils/types'

interface ICitiesCompareState {
    citiesCompareState: ICityDetails[]
}

const initialState: ICitiesCompareState = {
    citiesCompareState: [{
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
    },
    {
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
    ]
}

const findIndexInCityPrices = (index: number, state: ICitiesCompareState, action: PayloadAction<{ good_id: number, curr: string }>) => state.citiesCompareState[index].prices.findIndex(el => action.payload.good_id === el.good_id)

const calculateItemValue = (
    index: number,
    indexItem: number,
    indexItemCityOne: number,
    state: ICitiesCompareState,
    action: PayloadAction<{ good_id: number, curr: string }>
) => +(state.citiesCompareState[0].prices[indexItemCityOne].qty * Number(state.citiesCompareState[index].prices[indexItem].usd?.avg) * state.citiesCompareState[index].exchange_rate[action.payload.curr]).toFixed(2)

const calculateItemValueByNumber = (
    index: number,
    indexItem: number,
    state: ICitiesCompareState,
    action: PayloadAction<{ good_id: number, qty: number, curr: string }>
) => +(action.payload.qty * Number(state.citiesCompareState[index].prices[indexItem].usd?.avg) * state.citiesCompareState[index].exchange_rate[action.payload.curr]).toFixed(2)

export const citiesCompareSlice = createSlice({
    name: 'cityDetails',
    initialState,
    reducers: {
        setCityOneDetails: (state, action: PayloadAction<ICityDetails>) => {
            state.citiesCompareState[0] = action.payload
        },
        setCityTwoDetails: (state, action: PayloadAction<ICityDetails>) => {
            state.citiesCompareState[1] = action.payload
        },
        decreaceItemQty: (state, action: PayloadAction<{ good_id: number, curr: string }>) => {
            const indexItemCityOne = findIndexInCityPrices(0, state, action)
            const indexItemCityTwo = findIndexInCityPrices(1, state, action)
            state.citiesCompareState[0].prices[indexItemCityOne].qty -= 1
            state.citiesCompareState[0].prices[indexItemCityOne].itemValue = calculateItemValue(0, indexItemCityOne, indexItemCityOne, state, action)
            state.citiesCompareState[1].prices[indexItemCityTwo].itemValue = calculateItemValue(1, indexItemCityTwo, indexItemCityOne, state, action)
            //TODO - skonsultowac(czy do funkcji można przekazywać 2 takie same argumenty? indexItemCityOne) i usunac:
            // state.citiesCompareState[0].prices[indexItemCityOne].itemValue = +(state.citiesCompareState[0].prices[indexItemCityOne].qty * Number(state.citiesCompareState[0].prices[indexItemCityOne].usd?.avg) * state.citiesCompareState[0].exchange_rate[action.payload.curr]).toFixed(2)

            // state.citiesCompareState[1].prices[indexItemCityTwo].itemValue = +(state.citiesCompareState[0].prices[indexItemCityOne].qty * Number(state.citiesCompareState[1].prices[indexItemCityTwo].usd?.avg) * state.citiesCompareState[1].exchange_rate[action.payload.curr]).toFixed(2)
        },
        increaceItemQty: (state, action: PayloadAction<{ good_id: number, curr: string }>) => {
            const indexItemCityOne = findIndexInCityPrices(0, state, action)
            const indexItemCityTwo = findIndexInCityPrices(1, state, action)

            state.citiesCompareState[0].prices[indexItemCityOne].qty += 1
            state.citiesCompareState[0].prices[indexItemCityOne].itemValue = calculateItemValue(0, indexItemCityOne, indexItemCityOne, state, action)
            state.citiesCompareState[1].prices[indexItemCityTwo].itemValue = calculateItemValue(1, indexItemCityTwo, indexItemCityOne, state, action)

            //TODO - skonsultowac(czy do funkcji można przekazywać 2 takie same argumenty? indexItemCityOne) i usunac:

            // state.citiesCompareState[0].prices[indexItemCityOne].itemValue = +(state.citiesCompareState[0].prices[indexItemCityOne].qty * Number(state.citiesCompareState[0].prices[indexItemCityOne].usd?.avg) * state.citiesCompareState[0].exchange_rate[action.payload.curr]).toFixed(2)

            // state.citiesCompareState[1].prices[indexItemCityTwo].itemValue = +(state.citiesCompareState[0].prices[indexItemCityOne].qty * Number(state.citiesCompareState[1].prices[indexItemCityTwo].usd?.avg) * state.citiesCompareState[1].exchange_rate[action.payload.curr]).toFixed(2)
        },
        setItemsQty: (state, action: PayloadAction<{ good_id: number, qty: number, curr: string }>) => {
            const indexItemCityOne = findIndexInCityPrices(0, state, action)
            const indexItemCityTwo = findIndexInCityPrices(1, state, action)

            state.citiesCompareState[0].prices[indexItemCityOne].qty = action.payload.qty


            state.citiesCompareState[0].prices[indexItemCityOne].itemValue = calculateItemValueByNumber(0, indexItemCityOne, state, action)
            state.citiesCompareState[1].prices[indexItemCityTwo].itemValue = calculateItemValueByNumber(1, indexItemCityTwo, state, action)

            //TODO - usunac:
            // state.citiesCompareState[0].prices[indexItemCityOne].itemValue = +(action.payload.qty * Number(state.citiesCompareState[0].prices[indexItemCityOne].usd?.avg) * state.citiesCompareState[0].exchange_rate[action.payload.curr]).toFixed(2)

            // state.citiesCompareState[1].prices[indexItemCityTwo].itemValue = +(action.payload.qty * Number(state.citiesCompareState[1].prices[indexItemCityTwo].usd?.avg) * state.citiesCompareState[1].exchange_rate[action.payload.curr]).toFixed(2)
        }
    },
})

export const { setCityOneDetails, setCityTwoDetails, decreaceItemQty, increaceItemQty, setItemsQty } = citiesCompareSlice.actions

export default citiesCompareSlice.reducer