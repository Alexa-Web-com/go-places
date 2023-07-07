import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import './CityPage.css'
import { idParams } from '../CountryPage/CountryPage'
import { translate } from '../../utils/dict'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { ICityDetails, ICityPrices, setCityDetails } from '../../store/cityDetailsSlice'
import CategoryPricesDetails from '../../components/CategoryPricesDetails/CategoryPricesDetails'
import { options, IUrlOptions } from '../../utils/options'
import { ICityData } from '../../store/citiesListSlice'
import Spinner from '../../components/Spinner/Spinner'

// TODO - mock do usunięcia | tablica z 53 indexami
export const apiResponseGdyniaMock: ICityDetails = {
    city_id: 1588,
    city_name: 'Gdynia',
    state_code: null,
    country_name: 'Poland',
    exchange_rate: {
        EUR: 0.9141043559814876,
        AUD: 1.5044384337004684,
        USD: 1,
        CAD: 1.365551246061353,
        CNY: 6.958206234740171,
        CZK: 21.75104642096151,
        DKK: 6.863042486656362,
        GBP: 0.8026009925345098,
        HKD: 7.847752263093859,
        JPY: 135.73507701786255,
        NZD: 1.6151181891227067,
        NOK: 10.724763178413976,
        RUB: 77.36039478338927,
        KRW: 1342.4607515583195,
        CHF: 0.8978689485149004,
        UAH: 36.81677509467836,
        SEK: 10.473343345823046
    },
    exchange_rates_updated: {
        date: '2023-05-13',
        timestamp: 1684019043
    },
    prices: [
        {
            good_id: 1,
            item_name: 'Price per square meter to Buy Apartment Outside of City Center',
            category_id: 1,
            category_name: 'Buy Apartment',
            min: 6250.65,
            avg: 7261.71,
            max: 8410.14,
            usd: {
                min: '1500.59',
                avg: '1743.32',
                max: '2019.02'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 2,
            item_name: 'Price per square meter to Buy Apartment in City Center',
            category_id: 1,
            category_name: 'Buy Apartment',
            min: 10938.6,
            avg: 12507.33,
            max: 15626.59,
            usd: {
                min: '2626.03',
                avg: '3002.63',
                max: '3751.47'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 3,
            item_name: 'International Primary School, Yearly for 1 Child',
            category_id: 2,
            category_name: 'Childcare',
            min: 65631.68,
            avg: 72924.09,
            max: 80216.5,
            usd: {
                min: '15756.18',
                avg: '17506.87',
                max: '19257.55'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 4,
            item_name: 'Private Preschool or Kindergarten, Monthly for 1 Child',
            category_id: 2,
            category_name: 'Childcare',
            min: 989.69,
            avg: 1125.11,
            max: 1354.3,
            usd: {
                min: '237.59',
                avg: '270.10',
                max: '325.13'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 5,
            item_name: 'Pair of Jeans in a Chain Store Like George, H&M, Zara, etc.',
            category_id: 3,
            category_name: 'Clothing And Shoes',
            min: 145.85,
            avg: 361.1,
            max: 576.35,
            usd: {
                min: '35.01',
                avg: '86.69',
                max: '138.36'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 6,
            item_name: 'Pair of Leather Business Shoes',
            category_id: 3,
            category_name: 'Clothing And Shoes',
            min: 260.44,
            avg: 399.01,
            max: 624.04,
            usd: {
                min: '62.52',
                avg: '95.79',
                max: '149.81'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 7,
            item_name: 'Pair of Running Shoes, Mid-Range Price',
            category_id: 3,
            category_name: 'Clothing And Shoes',
            min: 229.19,
            avg: 306.69,
            max: 384.19,
            usd: {
                min: '55.02',
                avg: '73.63',
                max: '92.23'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 9,
            item_name: 'Apples, 1 kg',
            category_id: 4,
            category_name: 'Markets',
            min: 1.25,
            avg: 3.58,
            max: 5.91,
            usd: {
                min: '0.30',
                avg: '0.86',
                max: '1.42'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 10,
            item_name: 'Banana, 1 kg',
            category_id: 4,
            category_name: 'Markets',
            min: 4.67,
            avg: 5.06,
            max: 6.27,
            usd: {
                min: '1.12',
                avg: '1.21',
                max: '1.51'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 11,
            item_name: 'Beef Round or Equivalent Back Leg Red Meat, 1 kg ',
            category_id: 4,
            category_name: 'Markets',
            min: 18.76,
            avg: 37.25,
            max: 72.91,
            usd: {
                min: '4.50',
                avg: '8.94',
                max: '17.50'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 12,
            item_name: 'Bottle of Wine, Mid-Range Price',
            category_id: 4,
            category_name: 'Markets',
            min: 18.74,
            avg: 20.82,
            max: 22.91,
            usd: {
                min: '4.50',
                avg: '5.00',
                max: '5.50'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 13,
            item_name: 'Chicken Breasts, Boneless and Skinless, 1 kg',
            category_id: 4,
            category_name: 'Markets',
            min: 13.55,
            avg: 18.41,
            max: 23.27,
            usd: {
                min: '3.25',
                avg: '4.42',
                max: '5.59'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 14,
            item_name: 'Domestic Beer, 0.5 liter Bottle',
            category_id: 4,
            category_name: 'Markets',
            min: 2.61,
            avg: 3.85,
            max: 5.22,
            usd: {
                min: '0.63',
                avg: '0.92',
                max: '1.25'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 15,
            item_name: 'Eggs, 12 pack',
            category_id: 4,
            category_name: 'Markets',
            min: 3.74,
            avg: 9.69,
            max: 15.64,
            usd: {
                min: '0.90',
                avg: '2.33',
                max: '3.75'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 17,
            item_name: 'Lettuce, 1 head',
            category_id: 4,
            category_name: 'Markets',
            min: 3.11,
            avg: 3.89,
            max: 4.67,
            usd: {
                min: '0.75',
                avg: '0.93',
                max: '1.12'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 18,
            item_name: 'Loaf of Fresh White Bread, 0.5 kg',
            category_id: 4,
            category_name: 'Markets',
            min: 2.1,
            avg: 2.88,
            max: 5.22,
            usd: {
                min: '0.50',
                avg: '0.69',
                max: '1.25'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 19,
            item_name: 'Local Cheese, 1 kg',
            category_id: 4,
            category_name: 'Markets',
            min: 20.82,
            avg: 27.79,
            max: 46.87,
            usd: {
                min: '5.00',
                avg: '6.67',
                max: '11.25'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 20,
            item_name: 'Milk, Regular,1 liter',
            category_id: 4,
            category_name: 'Markets',
            min: 2.06,
            avg: 2.76,
            max: 3.46,
            usd: {
                min: '0.49',
                avg: '0.66',
                max: '0.83'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 21,
            item_name: 'Onion, 1 kg',
            category_id: 4,
            category_name: 'Markets',
            min: 2.1,
            avg: 4.16,
            max: 6.27,
            usd: {
                min: '0.50',
                avg: '1.00',
                max: '1.51'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 22,
            item_name: 'Oranges, 1 kg',
            category_id: 4,
            category_name: 'Markets',
            min: 3.11,
            avg: 5.22,
            max: 7.33,
            usd: {
                min: '0.75',
                avg: '1.25',
                max: '1.76'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 23,
            item_name: 'Pack of Cigarettes',
            category_id: 4,
            category_name: 'Markets',
            min: 17.4,
            avg: 18.76,
            max: 20.82,
            usd: {
                min: '4.18',
                avg: '4.50',
                max: '5.00'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 24,
            item_name: 'Potato, 1 kg',
            category_id: 4,
            category_name: 'Markets',
            min: 0.82,
            avg: 2.72,
            max: 4.62,
            usd: {
                min: '0.20',
                avg: '0.65',
                max: '1.11'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 25,
            item_name: 'White Rice, 1 kg',
            category_id: 4,
            category_name: 'Markets',
            min: 3.11,
            avg: 4.32,
            max: 6.27,
            usd: {
                min: '0.75',
                avg: '1.04',
                max: '1.51'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 26,
            item_name: 'Tomato, 1 kg',
            category_id: 4,
            category_name: 'Markets',
            min: 4.16,
            avg: 4.98,
            max: 8.33,
            usd: {
                min: '1.00',
                avg: '1.20',
                max: '2.00'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 27,
            item_name: 'Water, 1.5 liter Bottle',
            category_id: 4,
            category_name: 'Markets',
            min: 1.05,
            avg: 1.95,
            max: 2.85,
            usd: {
                min: '0.25',
                avg: '0.47',
                max: '0.68'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 28,
            item_name: 'One bedroom apartment outside of city centre',
            category_id: 5,
            category_name: 'Rent Per Month',
            min: 1354.3,
            avg: 1687.69,
            max: 2021.08,
            usd: {
                min: '325.13',
                avg: '405.16',
                max: '485.20'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 29,
            item_name: 'One bedroom apartment in city centre',
            category_id: 5,
            category_name: 'Rent Per Month',
            min: 1979.35,
            avg: 2246.33,
            max: 2604.44,
            usd: {
                min: '475.18',
                avg: '539.28',
                max: '625.25'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 30,
            item_name: 'Three bedroom apartment outside of city centre',
            category_id: 5,
            category_name: 'Rent Per Month',
            min: 2500.24,
            avg: 3445.87,
            max: 4391.5,
            usd: {
                min: '600.23',
                avg: '827.25',
                max: '1054.27'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 31,
            item_name: 'Three bedroom apartment in city centre',
            category_id: 5,
            category_name: 'Rent Per Month',
            min: 3125.32,
            avg: 4359.43,
            max: 5593.54,
            usd: {
                min: '750.29',
                avg: '1046.57',
                max: '1342.84'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 32,
            item_name: 'Cappuccino',
            category_id: 6,
            category_name: 'Restaurants',
            min: 6.27,
            avg: 10.16,
            max: 14.05,
            usd: {
                min: '1.51',
                avg: '2.44',
                max: '3.37'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 33,
            item_name: 'Coca-Cola, 0.33 liter Bottle',
            category_id: 6,
            category_name: 'Restaurants',
            min: 2.1,
            avg: 4.24,
            max: 7.28,
            usd: {
                min: '0.50',
                avg: '1.02',
                max: '1.75'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 34,
            item_name: 'Domestic Beer, 0.5 liter Draught',
            category_id: 6,
            category_name: 'Restaurants',
            min: 4.16,
            avg: 8.33,
            max: 12.5,
            usd: {
                min: '1.00',
                avg: '2.00',
                max: '3.00'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 35,
            item_name: 'Imported Beer, 0.33 liter Bottle',
            category_id: 6,
            category_name: 'Restaurants',
            min: 5.22,
            avg: 8.33,
            max: 15.61,
            usd: {
                min: '1.25',
                avg: '2.00',
                max: '3.75'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 36,
            item_name: 'McMeal at McDonalds or Alternative Combo Meal',
            category_id: 6,
            category_name: 'Restaurants',
            min: 18.76,
            avg: 21.88,
            max: 26.04,
            usd: {
                min: '4.50',
                avg: '5.25',
                max: '6.25'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 37,
            item_name: 'Meal for 2 People, Mid-range Restaurant, Three-course',
            category_id: 6,
            category_name: 'Restaurants',
            min: 78.12,
            avg: 114.59,
            max: 156.28,
            usd: {
                min: '18.75',
                avg: '27.51',
                max: '37.52'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 38,
            item_name: 'Meal in Inexpensive Restaurant',
            category_id: 6,
            category_name: 'Restaurants',
            min: 17.71,
            avg: 24.99,
            max: 32.27,
            usd: {
                min: '4.25',
                avg: '6.00',
                max: '7.75'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 40,
            item_name: 'Average Monthly Net Salary, After Tax',
            category_id: 7,
            category_name: 'Salaries And Financing',
            min: 2820.95,
            avg: 3134.39,
            max: 3447.83,
            usd: {
                min: '677.22',
                avg: '752.47',
                max: '827.72'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 42,
            item_name: 'Cinema ticket, 1 Seat',
            category_id: 8,
            category_name: 'Sports And Leisure',
            min: 18.76,
            avg: 26.55,
            max: 34.34,
            usd: {
                min: '4.50',
                avg: '6.37',
                max: '8.24'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 43,
            item_name: 'Fitness Club, Monthly Fee for 1 Adult',
            category_id: 8,
            category_name: 'Sports And Leisure',
            min: 88.55,
            avg: 121.41,
            max: 156.28,
            usd: {
                min: '21.26',
                avg: '29.15',
                max: '37.52'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 44,
            item_name: 'Tennis Court Rent, 1 Hour on Weekend',
            category_id: 8,
            category_name: 'Sports And Leisure',
            min: 36.47,
            avg: 62.51,
            max: 88.55,
            usd: {
                min: '8.76',
                avg: '15.01',
                max: '21.26'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 45,
            item_name: 'Gasoline, 1 liter',
            category_id: 9,
            category_name: 'Transportation',
            min: 4.36,
            avg: 5.18,
            max: 6,
            usd: {
                min: '1.05',
                avg: '1.24',
                max: '1.44'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 46,
            item_name: 'Monthly Pass, Regular Price',
            category_id: 9,
            category_name: 'Transportation',
            min: 85.44,
            avg: 95.83,
            max: 125.03,
            usd: {
                min: '20.51',
                avg: '23.01',
                max: '30.02'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 47,
            item_name: 'One-way Ticket, Local Transport',
            category_id: 9,
            category_name: 'Transportation',
            min: 3.11,
            avg: 3.35,
            max: 3.74,
            usd: {
                min: '0.75',
                avg: '0.80',
                max: '0.90'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 48,
            item_name: 'Taxi, price for 1 hour Waiting, Normal Tariff',
            category_id: 9,
            category_name: 'Transportation',
            min: 37.52,
            avg: 41.69,
            max: 45.86,
            usd: {
                min: '9.01',
                avg: '10.01',
                max: '11.01'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 49,
            item_name: 'Taxi, price for 1 km, Normal Tariff',
            category_id: 9,
            category_name: 'Transportation',
            min: 2.1,
            avg: 2.61,
            max: 3.12,
            usd: {
                min: '0.50',
                avg: '0.63',
                max: '0.75'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 50,
            item_name: 'Taxi Start, Normal Tariff',
            category_id: 9,
            category_name: 'Transportation',
            min: 6.97,
            avg: 8.33,
            max: 10.43,
            usd: {
                min: '1.67',
                avg: '2.00',
                max: '2.50'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 52,
            item_name: 'Volkswagen Golf 1.4 90 KW Trendline (Or Equivalent New Car)',
            category_id: 9,
            category_name: 'Transportation',
            min: 73695.01,
            avg: 81883.34,
            max: 90071.68,
            usd: {
                min: '17691.94',
                avg: '19657.71',
                max: '21623.48'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 53,
            item_name: 'Prepaid Mobile Tariff Local, price per 1 min, No Discounts or Plans',
            category_id: 10,
            category_name: 'Utilities Per Month',
            min: 0.12,
            avg: 0.23,
            max: 0.34,
            usd: {
                min: '0.03',
                avg: '0.06',
                max: '0.08'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 54,
            item_name: 'Basic utilities for 85 square meter Apartment including Electricity, Heating or Cooling, Water and Garbage',
            category_id: 10,
            category_name: 'Utilities Per Month',
            min: 531.32,
            avg: 908.3,
            max: 1377.46,
            usd: {
                min: '127.55',
                avg: '218.06',
                max: '330.69'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 55,
            item_name: 'Internet, 60 Mbps or More, Unlimited Data, Cable/ADSL',
            category_id: 10,
            category_name: 'Utilities Per Month',
            min: 41.69,
            avg: 52.24,
            max: 72.91,
            usd: {
                min: '10.01',
                avg: '12.54',
                max: '17.50'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 58,
            item_name: 'Water, 0.33 liter Bottle',
            category_id: 4,
            category_name: 'Markets',
            min: 2.1,
            avg: 4.44,
            max: 6.78,
            usd: {
                min: '0.50',
                avg: '1.07',
                max: '1.63'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 64,
            item_name: 'Summer Dress in a Chain Store Like George, H&M, Zara, etc.',
            category_id: 3,
            category_name: 'Clothing And Shoes',
            min: 104.16,
            avg: 174.19,
            max: 270.88,
            usd: {
                min: '25.01',
                avg: '41.82',
                max: '65.03'
            },
            measure: 'money',
            currency_code: 'PLN'
        },
        {
            good_id: 65,
            item_name: 'Mortgage Interest Rate in Percentages for 20 Years Fixed-Rate, Yearly, Fixed-Rate',
            category_id: 7,
            category_name: 'Salaries And Financing',
            min: 4.24,
            avg: 4.71,
            max: 5.18,
            measure: 'percent'
        },
        {
            good_id: 68,
            item_name: 'Imported Beer, 0.33 liter Bottle',
            category_id: 4,
            category_name: 'Markets',
            min: 4.16,
            avg: 5.99,
            max: 9.38,
            usd: {
                min: '1.00',
                avg: '1.44',
                max: '2.25'
            },
            measure: 'money',
            currency_code: 'PLN'
        }
    ],
    error: null
}

// TODO - mock do usunięcia | tablica z XXX indexami
// const apiResponseAachenMock: ICityDetails = {
//     city_id: 643,
//     city_name: 'Aachen',
//     state_code: null,
//     country_name: 'Germany',
//     exchange_rate: {
//         EUR: 0.9141043559814876,
//         AUD: 1.5044384337004684,
//         USD: 1,
//         CAD: 1.365551246061353,
//         CNY: 6.958206234740171,
//         CZK: 21.75104642096151,
//         DKK: 6.863042486656362,
//         GBP: 0.8026009925345098,
//         HKD: 7.847752263093859,
//         JPY: 135.73507701786255,
//         NZD: 1.6151181891227067,
//         NOK: 10.724763178413976,
//         RUB: 77.36039478338927,
//         KRW: 1342.4607515583195,
//         CHF: 0.8978689485149004,
//         UAH: 36.81677509467836,
//         SEK: 10.473343345823046
//     },
//     exchange_rates_updated: {
//         date: '2023-05-13',
//         timestamp: 1684019043
//     },
//     prices: [
//         {
//             good_id: 1,
//             item_name: 'Price per square meter to Buy Apartment Outside of City Center',
//             category_id: 1,
//             category_name: 'Buy Apartment',
//             min: 2063.86,
//             avg: 2476.64,
//             max: 2889.42,
//             usd: {
//                 min: '2257.79',
//                 avg: '2709.36',
//                 max: '3160.93'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 2,
//             item_name: 'Price per square meter to Buy Apartment in City Center',
//             category_id: 1,
//             category_name: 'Buy Apartment',
//             min: 3302.18,
//             avg: 6337.06,
//             max: 11107.61,
//             usd: {
//                 min: '3612.48',
//                 avg: '6932.53',
//                 max: '12151.36'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 3,
//             item_name: 'International Primary School, Yearly for 1 Child',
//             category_id: 2,
//             category_name: 'Childcare',
//             min: 7801.4,
//             avg: 10855.91,
//             max: 14447.03,
//             usd: {
//                 min: '8534.47',
//                 avg: '11876.01',
//                 max: '15804.57'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 4,
//             item_name: 'Private Preschool or Kindergarten, Monthly for 1 Child',
//             category_id: 2,
//             category_name: 'Childcare',
//             min: 278.62,
//             avg: 507.97,
//             max: 927.7,
//             usd: {
//                 min: '304.80',
//                 avg: '555.70',
//                 max: '1014.87'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 5,
//             item_name: 'Pair of Jeans in a Chain Store Like George, H&M, Zara, etc.',
//             category_id: 3,
//             category_name: 'Clothing And Shoes',
//             min: 20.64,
//             avg: 81.52,
//             max: 142.4,
//             usd: {
//                 min: '22.58',
//                 avg: '89.18',
//                 max: '155.78'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 6,
//             item_name: 'Pair of Leather Business Shoes',
//             category_id: 3,
//             category_name: 'Clothing And Shoes',
//             min: 41.28,
//             avg: 87.72,
//             max: 154.79,
//             usd: {
//                 min: '45.16',
//                 avg: '95.96',
//                 max: '169.34'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 7,
//             item_name: 'Pair of Running Shoes, Mid-Range Price',
//             category_id: 3,
//             category_name: 'Clothing And Shoes',
//             min: 41.28,
//             avg: 76.1,
//             max: 110.92,
//             usd: {
//                 min: '45.16',
//                 avg: '83.25',
//                 max: '121.34'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 9,
//             item_name: 'Apples, 1 kg',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 1.03,
//             avg: 2.07,
//             max: 3.11,
//             usd: {
//                 min: '1.13',
//                 avg: '2.26',
//                 max: '3.40'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 10,
//             item_name: 'Banana, 1 kg',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 1.03,
//             avg: 1.6,
//             max: 2.17,
//             usd: {
//                 min: '1.13',
//                 avg: '1.75',
//                 max: '2.37'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 11,
//             item_name: 'Beef Round or Equivalent Back Leg Red Meat, 1 kg ',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 7.22,
//             avg: 10.85,
//             max: 30.96,
//             usd: {
//                 min: '7.90',
//                 avg: '11.87',
//                 max: '33.87'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 12,
//             item_name: 'Bottle of Wine, Mid-Range Price',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 3.1,
//             avg: 5.15,
//             max: 7.22,
//             usd: {
//                 min: '3.39',
//                 avg: '5.63',
//                 max: '7.90'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 13,
//             item_name: 'Chicken Breasts, Boneless and Skinless, 1 kg',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 5.16,
//             avg: 7.26,
//             max: 14.44,
//             usd: {
//                 min: '5.64',
//                 avg: '7.94',
//                 max: '15.80'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 14,
//             item_name: 'Domestic Beer, 0.5 liter Bottle',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 0.83,
//             avg: 0.91,
//             max: 1.03,
//             usd: {
//                 min: '0.91',
//                 avg: '1.00',
//                 max: '1.13'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 15,
//             item_name: 'Eggs, 12 pack',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 1.47,
//             avg: 2.27,
//             max: 3.07,
//             usd: {
//                 min: '1.61',
//                 avg: '2.48',
//                 max: '3.36'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 17,
//             item_name: 'Lettuce, 1 head',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 0.5,
//             avg: 0.87,
//             max: 1.24,
//             usd: {
//                 min: '0.55',
//                 avg: '0.95',
//                 max: '1.36'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 18,
//             item_name: 'Loaf of Fresh White Bread, 0.5 kg',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 0.61,
//             avg: 1.1,
//             max: 2.07,
//             usd: {
//                 min: '0.67',
//                 avg: '1.20',
//                 max: '2.26'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 19,
//             item_name: 'Local Cheese, 1 kg',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 6.7,
//             avg: 7.99,
//             max: 10.32,
//             usd: {
//                 min: '7.33',
//                 avg: '8.74',
//                 max: '11.29'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 20,
//             item_name: 'Milk, Regular,1 liter',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 0.64,
//             avg: 0.78,
//             max: 1.08,
//             usd: {
//                 min: '0.70',
//                 avg: '0.85',
//                 max: '1.18'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 21,
//             item_name: 'Onion, 1 kg',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 1.02,
//             avg: 1.27,
//             max: 2.07,
//             usd: {
//                 min: '1.12',
//                 avg: '1.39',
//                 max: '2.26'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 22,
//             item_name: 'Oranges, 1 kg',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 1.03,
//             avg: 1.46,
//             max: 4.13,
//             usd: {
//                 min: '1.13',
//                 avg: '1.60',
//                 max: '4.52'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 23,
//             item_name: 'Pack of Cigarettes',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 6.6,
//             avg: 7.22,
//             max: 8.25,
//             usd: {
//                 min: '7.22',
//                 avg: '7.90',
//                 max: '9.03'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 24,
//             item_name: 'Potato, 1 kg',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 1.03,
//             avg: 1.16,
//             max: 1.55,
//             usd: {
//                 min: '1.13',
//                 avg: '1.27',
//                 max: '1.70'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 25,
//             item_name: 'White Rice, 1 kg',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 1.95,
//             avg: 2.05,
//             max: 2.15,
//             usd: {
//                 min: '2.13',
//                 avg: '2.24',
//                 max: '2.35'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 26,
//             item_name: 'Tomato, 1 kg',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 1.03,
//             avg: 2.51,
//             max: 3.99,
//             usd: {
//                 min: '1.13',
//                 avg: '2.75',
//                 max: '4.36'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 27,
//             item_name: 'Water, 1.5 liter Bottle',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 0.2,
//             avg: 0.34,
//             max: 0.62,
//             usd: {
//                 min: '0.22',
//                 avg: '0.37',
//                 max: '0.68'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 28,
//             item_name: 'One bedroom apartment outside of city centre',
//             category_id: 5,
//             category_name: 'Rent Per Month',
//             min: 309.58,
//             avg: 431.35,
//             max: 722.35,
//             usd: {
//                 min: '338.67',
//                 avg: '471.88',
//                 max: '790.23'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 29,
//             item_name: 'One bedroom apartment in city centre',
//             category_id: 5,
//             category_name: 'Rent Per Month',
//             min: 412.78,
//             avg: 581.06,
//             max: 825.54,
//             usd: {
//                 min: '451.57',
//                 avg: '635.66',
//                 max: '903.11'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 30,
//             item_name: 'Three bedroom apartment outside of city centre',
//             category_id: 5,
//             category_name: 'Rent Per Month',
//             min: 722.35,
//             avg: 866.82,
//             max: 1238.32,
//             usd: {
//                 min: '790.23',
//                 avg: '948.27',
//                 max: '1354.68'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 31,
//             item_name: 'Three bedroom apartment in city centre',
//             category_id: 5,
//             category_name: 'Rent Per Month',
//             min: 825.54,
//             avg: 1087.83,
//             max: 1350.12,
//             usd: {
//                 min: '903.11',
//                 avg: '1190.05',
//                 max: '1476.99'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 32,
//             item_name: 'Cappuccino',
//             category_id: 6,
//             category_name: 'Restaurants',
//             min: 1.55,
//             avg: 2.39,
//             max: 3.23,
//             usd: {
//                 min: '1.70',
//                 avg: '2.61',
//                 max: '3.53'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 33,
//             item_name: 'Coca-Cola, 0.33 liter Bottle',
//             category_id: 6,
//             category_name: 'Restaurants',
//             min: 1.03,
//             avg: 1.8,
//             max: 3.1,
//             usd: {
//                 min: '1.13',
//                 avg: '1.97',
//                 max: '3.39'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 34,
//             item_name: 'Domestic Beer, 0.5 liter Draught',
//             category_id: 6,
//             category_name: 'Restaurants',
//             min: 2.07,
//             avg: 3.45,
//             max: 4.83,
//             usd: {
//                 min: '2.26',
//                 avg: '3.77',
//                 max: '5.28'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 35,
//             item_name: 'Imported Beer, 0.33 liter Bottle',
//             category_id: 6,
//             category_name: 'Restaurants',
//             min: 3.1,
//             avg: 3.5,
//             max: 4.64,
//             usd: {
//                 min: '3.39',
//                 avg: '3.83',
//                 max: '5.08'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 36,
//             item_name: 'McMeal at McDonalds or Alternative Combo Meal',
//             category_id: 6,
//             category_name: 'Restaurants',
//             min: 7.43,
//             avg: 8.25,
//             max: 9.08,
//             usd: {
//                 min: '8.13',
//                 avg: '9.03',
//                 max: '9.93'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 37,
//             item_name: 'Meal for 2 People, Mid-range Restaurant, Three-course',
//             category_id: 6,
//             category_name: 'Restaurants',
//             min: 25.8,
//             avg: 41.28,
//             max: 61.91,
//             usd: {
//                 min: '28.22',
//                 avg: '45.16',
//                 max: '67.73'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 38,
//             item_name: 'Meal in Inexpensive Restaurant',
//             category_id: 6,
//             category_name: 'Restaurants',
//             min: 6.19,
//             avg: 8.25,
//             max: 10.32,
//             usd: {
//                 min: '6.77',
//                 avg: '9.03',
//                 max: '11.29'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 40,
//             item_name: 'Average Monthly Net Salary, After Tax',
//             category_id: 7,
//             category_name: 'Salaries And Financing',
//             min: 2236.71,
//             avg: 2485.23,
//             max: 2733.75,
//             usd: {
//                 min: '2446.89',
//                 avg: '2718.76',
//                 max: '2990.63'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 42,
//             item_name: 'Cinema ticket, 1 Seat',
//             category_id: 8,
//             category_name: 'Sports And Leisure',
//             min: 8.77,
//             avg: 10.32,
//             max: 12.39,
//             usd: {
//                 min: '9.59',
//                 avg: '11.29',
//                 max: '13.55'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 43,
//             item_name: 'Fitness Club, Monthly Fee for 1 Adult',
//             category_id: 8,
//             category_name: 'Sports And Leisure',
//             min: 15.48,
//             avg: 28.55,
//             max: 47.47,
//             usd: {
//                 min: '16.93',
//                 avg: '31.23',
//                 max: '51.93'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 44,
//             item_name: 'Tennis Court Rent, 1 Hour on Weekend',
//             category_id: 8,
//             category_name: 'Sports And Leisure',
//             min: 20.64,
//             avg: 22.36,
//             max: 25.8,
//             usd: {
//                 min: '22.58',
//                 avg: '24.46',
//                 max: '28.22'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 45,
//             item_name: 'Gasoline, 1 liter',
//             category_id: 9,
//             category_name: 'Transportation',
//             min: 1.24,
//             avg: 1.47,
//             max: 1.7,
//             usd: {
//                 min: '1.36',
//                 avg: '1.61',
//                 max: '1.86'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 46,
//             item_name: 'Monthly Pass, Regular Price',
//             category_id: 9,
//             category_name: 'Transportation',
//             min: 72.23,
//             avg: 73.27,
//             max: 105.89,
//             usd: {
//                 min: '79.02',
//                 avg: '80.15',
//                 max: '115.84'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 47,
//             item_name: 'One-way Ticket, Local Transport',
//             category_id: 9,
//             category_name: 'Transportation',
//             min: 1.85,
//             avg: 2.84,
//             max: 3.83,
//             usd: {
//                 min: '2.02',
//                 avg: '3.11',
//                 max: '4.19'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 48,
//             item_name: 'Taxi, price for 1 hour Waiting, Normal Tariff',
//             category_id: 9,
//             category_name: 'Transportation',
//             min: 20.64,
//             avg: 30.96,
//             max: 41.28,
//             usd: {
//                 min: '22.58',
//                 avg: '33.87',
//                 max: '45.16'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 49,
//             item_name: 'Taxi, price for 1 km, Normal Tariff',
//             category_id: 9,
//             category_name: 'Transportation',
//             min: 1.96,
//             avg: 2.02,
//             max: 2.08,
//             usd: {
//                 min: '2.14',
//                 avg: '2.21',
//                 max: '2.28'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 50,
//             item_name: 'Taxi Start, Normal Tariff',
//             category_id: 9,
//             category_name: 'Transportation',
//             min: 3.5,
//             avg: 3.92,
//             max: 4.34,
//             usd: {
//                 min: '3.83',
//                 avg: '4.29',
//                 max: '4.75'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 52,
//             item_name: 'Volkswagen Golf 1.4 90 KW Trendline (Or Equivalent New Car)',
//             category_id: 9,
//             category_name: 'Transportation',
//             min: 18574.76,
//             avg: 18620.68,
//             max: 18666.6,
//             usd: {
//                 min: '20320.17',
//                 avg: '20370.41',
//                 max: '20420.64'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 53,
//             item_name: 'Prepaid Mobile Tariff Local, price per 1 min, No Discounts or Plans',
//             category_id: 10,
//             category_name: 'Utilities Per Month',
//             min: 0.09,
//             avg: 0.1,
//             max: 0.11,
//             usd: {
//                 min: '0.10',
//                 avg: '0.11',
//                 max: '0.12'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 54,
//             item_name: 'Basic utilities for 85 square meter Apartment including Electricity, Heating or Cooling, Water and Garbage',
//             category_id: 10,
//             category_name: 'Utilities Per Month',
//             min: 175.43,
//             avg: 249.88,
//             max: 350.85,
//             usd: {
//                 min: '191.91',
//                 avg: '273.36',
//                 max: '383.82'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 55,
//             item_name: 'Internet, 60 Mbps or More, Unlimited Data, Cable/ADSL',
//             category_id: 10,
//             category_name: 'Utilities Per Month',
//             min: 25.8,
//             avg: 31.99,
//             max: 40.25,
//             usd: {
//                 min: '28.22',
//                 avg: '35.00',
//                 max: '44.03'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 58,
//             item_name: 'Water, 0.33 liter Bottle',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 1.03,
//             avg: 1.9,
//             max: 3.3,
//             usd: {
//                 min: '1.13',
//                 avg: '2.08',
//                 max: '3.61'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 64,
//             item_name: 'Summer Dress in a Chain Store Like George, H&M, Zara, etc.',
//             category_id: 3,
//             category_name: 'Clothing And Shoes',
//             min: 15.48,
//             avg: 37.92,
//             max: 60.36,
//             usd: {
//                 min: '16.93',
//                 avg: '41.48',
//                 max: '66.03'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         },
//         {
//             good_id: 65,
//             item_name: 'Mortgage Interest Rate in Percentages for 20 Years Fixed-Rate, Yearly, Fixed-Rate',
//             category_id: 7,
//             category_name: 'Salaries And Financing',
//             min: 1.66,
//             avg: 1.84,
//             max: 2.02,
//             measure: 'percent'
//         },
//         {
//             good_id: 68,
//             item_name: 'Imported Beer, 0.33 liter Bottle',
//             category_id: 4,
//             category_name: 'Markets',
//             min: 1.12,
//             avg: 1.61,
//             max: 2.1,
//             usd: {
//                 min: '1.23',
//                 avg: '1.76',
//                 max: '2.30'
//             },
//             measure: 'money',
//             currency_code: 'EUR'
//         }
//     ],
//     error: null
// }


const CityPage = (): JSX.Element => {
    const [spinner, setSpinner] = useState<boolean>(true)

    const lang: string = useSelector((state: RootState) => state.lang.langState)
    const curr: string = useSelector((state: RootState) => state.curr.currState)

    const { id } = useParams<idParams>()
    const cityId = Number(id?.split(', ')[0])
    const cityName = id?.split(', ')[1]
    const cityState = id?.split(', ')[2]

    const citiesList: ICityData[] = useSelector((state: RootState) => state.citiesList.citiesListState)

    const country: string[] = citiesList
        .filter((city: ICityData) => city.city_id === cityId)
        .map((elem: ICityData) => elem.country_name)

    const cityPrices: ICityPrices[] = useSelector((state: RootState) => state.cityDetails.cityDetailsState.prices)
    const PricesCategoryNames: string[] = [...new Set(cityPrices.map((priceElem) => priceElem.category_name))]

    const dispatch = useDispatch()

    const getDataFromUrl = async (url: string, options: IUrlOptions): Promise<void> => {
        try {
            //TODO - zamienić data z Mock na data z res
            // const res = await fetch(url, options)
            // const data: ICityDetails = await res.json()

            // TODO - usunać obie linie:
            // const data: ICityDetails = apiResponseAachenMock
            const data: ICityDetails = apiResponseGdyniaMock
            dispatch(setCityDetails(data))
        } catch (error) {
            console.log('error from getDataFromUrl - City Details - function: ', error);
        }
        setSpinner(false)
    }

    useEffect(() => {
        const urlCityDetails = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${cityName}&country_name=${country}`
        getDataFromUrl(urlCityDetails, options)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cityName])



    return (
        <>
            {spinner ?
                <Spinner />
                :
                <div className='city_page page'>
                    <NavLink to={`/${country}`} className='back'>{translate('Back', lang)}</NavLink>
                    {cityState
                        ?
                        <h1 className='city_page__title page__title'>{cityName}, {cityState}, {country}</h1>
                        :
                        <h1 className='city_page__title page__title'>{cityName}, {country}</h1>
                    }
                    <div className='city_page__content page__content'>
                        <h2 className='city_page__content_title page__content_title'>{translate('Prices', lang)}</h2>
                        <div className='city_page__category_cntr'>
                            <p className='city_page__empty'></p>
                            <p className='city_page__currency'>{translate('local currency', lang)}</p>
                            <div className='city_page__currency'>
                                <p>{translate('default currency', lang)}</p>
                                <p>{`(${curr})`}</p>
                            </div>
                        </div>
                        <div className='city_page__cities_cntr'>
                            {PricesCategoryNames.map((categoryName: string, index: number) =>
                                <CategoryPricesDetails categoryName={categoryName} key={index} />
                            )}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CityPage
