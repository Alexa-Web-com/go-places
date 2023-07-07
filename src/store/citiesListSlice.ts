import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ICityData {
    city_id: number;
    city_name: string;
    country_name: string;
    lat: number;
    lng: number;
    state_code: null | string;
}

export interface ICitiesList {
    citiesListState: ICityData[];
    error: null;
}

const initialState: ICitiesList = {
    citiesListState: [{
        city_id: 0,
        city_name: '',
        country_name: '',
        lat: 0,
        lng: 0,
        state_code: null,
    }],
    error: null,
}

export const citiesListSlice = createSlice({
    name: 'citiesList',
    initialState,
    reducers: {
        setCitiesList: (state, action: PayloadAction<ICityData[]>) => {
            state.citiesListState = action.payload
        },
    },
})

export const { setCitiesList } = citiesListSlice.actions

export default citiesListSlice.reducer