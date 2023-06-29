import React, { useEffect, useState } from 'react'

interface ICityData {
    city_id: number;
    city_name: string;
    country_name: string;
    lat: number;
    lng: number;
    state_code: null | string;
}

interface ICities {
    cities: ICityData[];
    error: null;
}

interface IExchangeRate {
    [key: string]: number;
}

interface IExchangeRatesUpdated {
    date: string;
    timestamp: number
}

interface ICityPricesUsd {
    min: string; avg: string; max: string;
}

interface ICityPrices {
    avg: number,
    category_id: number,
    category_name: string,
    currency_code: string,
    good_id: number,
    item_name: string,
    max: number,
    measure: string,
    min: number,
    usd: ICityPricesUsd
}

interface ICityDetails {
    city_id: number;
    city_name: string;
    country_name: string;
    error: null;
    exchange_rate: IExchangeRate;
    exchange_rates_updated: IExchangeRatesUpdated;
    prices: ICityPrices[];
    state_code: null;
}

//TODO - mock do usunięcia
const apiResponseCitiesMock: ICities = {
    cities: [
        {
            city_id: 1,
            city_name: "Herat",
            country_name: "Afghanistan",
            lat: 34.352865,
            lng: 62.20402869999999,
            state_code: null
        },
        {
            city_id: 2,
            city_name: "Kabul",
            country_name: "Afghanistan",
            lat: 34.5553494,
            lng: 69.207486,
            state_code: null
        },
        {
            city_id: 11,
            city_name: "Tirana",
            country_name: "Albania",
            lat: 41.3275459,
            lng: 19.8186982,
            state_code: null
        },
        {
            city_id: 30,
            city_name: "Buenos Aires",
            country_name: "Argentina",
            lat: -34.6036844,
            lng: -58.3815591,
            state_code: null
        },
        {
            city_id: 1588,
            city_name: "Gdynia",
            country_name: "Poland",
            lat: 54.5188898,
            lng: 18.5305409,
            state_code: null
        },
    ],
    error: null
}

// TODO - mock do usunięcia | tablica z 53 indexami
const apiResponseGdyniaMock: ICityDetails = {
    city_id: 1588,
    city_name: 'Gdynia',
    country_name: 'Poland',
    error: null,
    exchange_rate: {
        AUD: 1.5044384337004684,
        CAD: 1.365551246061353,
        CHF: 0.8978689485149004,
        CNY: 6.958206234740171,
        CZK: 21.75104642096151,
        DKK: 6.863042486656362,
        EUR: 0.9141043559814876,
        GBP: 0.8026009925345098,
        HKD: 7.847752263093859,
        JPY: 135.73507701786255,
        KRW: 1342.4607515583195,
        NOK: 10.724763178413976,
        NZD: 1.6151181891227067,
        RUB: 77.36039478338927,
        SEK: 10.473343345823046,
        UAH: 36.81677509467836,
        USD: 1,
    },
    exchange_rates_updated: { date: '2023-05-13', timestamp: 1684019043 },
    prices: [
        {
            avg: 7261.71,
            category_id: 1,
            category_name: "Buy Apartment",
            currency_code: "PLN",
            good_id: 1,
            item_name: "Price per square meter to Buy Apartment Outside of City Center",
            max: 8410.14,
            measure: "money",
            min: 6250.65,
            usd: { min: '1500.59', avg: '1743.32', max: '2019.02' }
        },
        {
            avg: 3.58,
            category_id: 4,
            category_name: "Markets",
            currency_code: "PLN",
            good_id: 9,
            item_name: "Apples, 1 kg",
            max: 5.91,
            measure: "money",
            min: 1.25,
            usd: { min: '0.30', avg: '0.86', max: '1.42' }
        },
        {
            avg: 10.16,
            category_id: 6,
            category_name: "Restaurants",
            currency_code: "PLN",
            good_id: 32,
            item_name: "Cappuccino",
            max: 14.05,
            measure: "money",
            min: 6.27,
            usd: { min: '1.51', avg: '2.44', max: '3.37' }
        },
        {
            avg: 4.44,
            category_id: 4,
            category_name: "Markets",
            currency_code: "PLN",
            good_id: 58,
            item_name: "Water, 0.33 liter Bottle",
            max: 6.78,
            measure: "money",
            min: 2.1,
            usd: { min: '0.50', avg: '1.07', max: '1.63' }
        },
    ],
    state_code: null,
}


const TestApi = () => {
    // TODO - odkomentować przy zastosowaniu API
    // const url = 'https://cost-of-living-and-prices.p.rapidapi.com/cities';
    // const url = 'https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=Gdynia&country_name=Poland'

    const [cities, setCities] = useState<ICities>()
    const [city, setCity] = useState<ICityDetails>()


    // TODO - odkomentować przy zastosowaniu API
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_KEY as string,
            'X-RapidAPI-Host': process.env.REACT_APP_HOST as string,
        }
    };


    useEffect(() => {
        const getApi = async () => {
            try {
                // TODO - odkomentować i dostosować do 2 typów API (miasta i miasto)
                // const response = await fetch(url, options);
                // const data = await response.json()
                // console.log(data);
                setCities(apiResponseCitiesMock)
                setCity(apiResponseGdyniaMock)
            } catch (error) {
                console.error(error);
            }
        }
        getApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // useEffect(() => {
    //     console.log({ cities })
    // }, [cities])

    // useEffect(() => {
    //     console.log({ city })
    // }, [city])

    return (
        <div>
            <div>
                <p>Miasto z CITIES: {cities?.cities[0].city_name}</p>
                <p>Miasto z CITIES: {cities?.cities[4].city_name}</p>
            </div>
            <hr />
            <div>
                <p>Miasto z CITY: {city?.city_name}</p>
                <p>Cena z CITY: {city?.prices[3].avg}</p>
                <p>nazwa z CITY: {city?.prices[3].item_name} </p>
            </div>
        </div>
    )
}

export default TestApi
