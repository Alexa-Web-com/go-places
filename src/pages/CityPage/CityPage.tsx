import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import './CityPage.css'
import { idParams } from '../CountryPage/CountryPage'
import { translate } from '../../utils/dict'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { setCityDetails } from '../../store/cityDetailsSlice'
import { ICityPrices, ICityDetails } from '../../utils/types'
import CategoryPricesDetails from '../../components/CategoryPricesDetails/CategoryPricesDetails'
import { options, IUrlOptions } from '../../utils/options'
import { ICityData } from '../../utils/types'
import Spinner from '../../components/Spinner/Spinner'

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
            const res = await fetch(url, options)
            const data: ICityDetails = await res.json()

            const pricesWithQty = data.prices.map(price => ({
                ...price,
                qty: 1
            }))

            dispatch(setCityDetails({ ...data, prices: pricesWithQty }))
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
                        <div className='city_page__prices_cntr'>
                            {PricesCategoryNames.map((categoryName: string, index: number) =>
                                <div key={index} >
                                    <CategoryPricesDetails categoryName={categoryName} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CityPage
