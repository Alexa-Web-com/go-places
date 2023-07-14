import './PriceComparisonPage.css'
import { useEffect } from 'react'
import LocationChoice from '../../components/LocationChoice/LocationChoice'
import { translate } from '../../utils/dict'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { ICityDetails, ICityPrices, Location } from '../../utils/types'
import Comparison from '../../components/Comparison/Comparison'
import { NavLink } from 'react-router-dom'
import { setCityOneDetails, setCityTwoDetails } from '../../store/citiesCompareSlice'

const PriceComparisionPage = (): JSX.Element => {
    const lang: string = useSelector((state: RootState) => state.lang.langState)
    const curr: string = useSelector((state: RootState) => state.curr.currState)

    const dispatch = useDispatch()

    useEffect(() => {
        const initialStateSitiesCompare: ICityDetails = {
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
        dispatch(setCityOneDetails(initialStateSitiesCompare))
        dispatch(setCityTwoDetails(initialStateSitiesCompare))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const citiesCompareState: ICityDetails[] = useSelector((state: RootState) => state.citiesCompare.citiesCompareState)

    const cityOneGoodsId: number[] = citiesCompareState[0].prices.map(item => item.good_id)
    const cityTwoGoodsId: number[] = citiesCompareState[1].prices.map(item => item.good_id)
    const isItemInBothCities = (itemId: number): boolean => cityOneGoodsId.includes(itemId) && cityTwoGoodsId.includes(itemId)

    const allItemsValueCityOne: number[] = citiesCompareState[0].prices.map(el => isItemInBothCities(el.good_id) ? (el.measure === 'money' ? Number(el.itemValue) : 0) : 0)
    const allItemsValueCityTwo: number[] = citiesCompareState[1].prices.map(el => isItemInBothCities(el.good_id) ? (el.measure === 'money' ? Number(el.itemValue) : 0) : 0)

    const cityOnePrices: ICityPrices[] = citiesCompareState[0].prices
    const cityOneName: string = citiesCompareState[0].city_name
    const PricesCategoryNamesCityOne: string[] = [...new Set(cityOnePrices.map((priceElem) => priceElem.category_name))]

    const cityTwoPrices: ICityPrices[] = citiesCompareState[1].prices
    const cityTwoName: string = citiesCompareState[1].city_name
    const PricesCategoryNamesCityTwo: string[] = [...new Set(cityTwoPrices.map((priceElem) => priceElem.category_name))]

    const PricesCategoryNamesBothCities: string[] = []

    PricesCategoryNamesCityOne.forEach((priceCategoryNameCityOne: string) => PricesCategoryNamesCityTwo.filter((priceCategoryNameCityTwo: string) => priceCategoryNameCityTwo === priceCategoryNameCityOne ? PricesCategoryNamesBothCities.push(priceCategoryNameCityOne) : PricesCategoryNamesBothCities))

    const filtersalaryValue = (index: number): number => (citiesCompareState[index].prices.filter(el => el.good_id === 40))[0].itemValue
    const calculateTotalValueCityOne = (): number => (allItemsValueCityOne.reduce((s, e) => s + e) - Number(filtersalaryValue(0)))
    const calculateTotalValueCityTwo = (): number => (allItemsValueCityTwo.reduce((s, e) => s + e) - Number(filtersalaryValue(1)))

    return (
        <div className='priceComparisonPage page'>
            <NavLink to='/home' className='back'>{translate('Back', lang)}</NavLink>
            <h1 className='priceComparisonPage__title page__title'>{translate('Price Comparison', lang)}</h1>
            <div className='priceComparisonPage__content page__content'>
                <div className="priceComparisonPage__choose_location_cntr">
                    <div className='priceComparisonPage_location_cntr'>
                        <div className='priceComparisonPage_location_el'>
                            <LocationChoice locationChoice={Location.CITY_ONE} />
                        </div>
                        <div className='priceComparisonPage_location_el'>
                            <LocationChoice locationChoice={Location.CITY_TWO} />
                        </div>
                    </div>

                </div>
                {cityOneName && cityTwoName
                    &&
                    <div className='priceComparisonPage__cites_names_cntr'>
                        <p className='priceComparisonPage__empty'></p>
                        <p className='priceComparisonPage__subtitle'>{translate('Total costs:', lang)}</p>
                        <div className='priceComparisonPage__city_wrapper'>
                            <p className='priceComparisonPage__city'>{cityOneName}</p>
                            <div className='priceComparisonPage__totalCostValue'>
                                <p>
                                    {+calculateTotalValueCityOne().toFixed(2)}
                                </p>
                                <p className='comparison__cityOne_price_curr'>{curr}</p>
                            </div>
                        </div>
                        <div>
                            <p className='priceComparisonPage__city'>{cityTwoName}</p>
                            <div className='priceComparisonPage__totalCostValue'>
                                <p>
                                    {+calculateTotalValueCityTwo().toFixed(2)}
                                </p>
                                <p className='comparison__cityOne_price_curr'>{curr}</p>

                            </div>
                        </div>
                        <div>
                            <p className='priceComparisonPage__cityTwo_percent' style={{ color: `${+(calculateTotalValueCityTwo() * 100 / calculateTotalValueCityOne()).toFixed(2) > 100 ? 'red' : 'limegreen'}` }}>
                                {`${+(calculateTotalValueCityTwo() * 100 / calculateTotalValueCityOne()).toFixed(2)} %`}
                            </p>
                        </div>
                    </div>}
                {
                    cityOneName && cityTwoName
                    &&
                    PricesCategoryNamesBothCities.length > 0
                    &&
                    <div className='priceComparisonPage__prices_cntr'>
                        {
                            PricesCategoryNamesBothCities.map((categoryName: string, index: number) =>
                                <div key={index}>
                                    <Comparison categoryName={categoryName} />
                                </div>
                            )}
                    </div>
                }
            </div>
        </div>
    )
}

export default PriceComparisionPage
