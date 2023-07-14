export enum Location {
    GENERAL = 0,
    ONE = 1,
    TWO = 2,
}

export interface ICityData {
    city_id: number;
    city_name: string;
    country_name: string;
    lat: number;
    lng: number;
    state_code: null | string;
}

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
    usd?: ICityPricesUsd,
    qty: number,
    itemValue: number,
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



export interface IInputNumberQty {
    good_id: number;
    qty: number;
    curr: string;
}

export interface IIncreaseDecreaseQty {
    good_id: number;
    curr: string;
}