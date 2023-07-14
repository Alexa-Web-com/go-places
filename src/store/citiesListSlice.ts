import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICityData } from '../utils/types';


interface ICitiesList {
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