import React from 'react'
import './CategoryPricesDetails.css'
import { ICityPrices, IExchangeRate } from '../../utils/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { translate } from '../../utils/dict'
import { setTwoDecimals } from '../../utils/setTwoDecimal'

interface ICategoryPricesDetailsProps {
    categoryName: string;
}

const CategoryPricesDetails = (props: ICategoryPricesDetailsProps) => {

    const cityExcancheRate: IExchangeRate = useSelector((state: RootState) => state.cityDetails.cityDetailsState.exchange_rate)
    const cityPrices: ICityPrices[] = useSelector((state: RootState) => state.cityDetails.cityDetailsState.prices)
    const lang: string = useSelector((state: RootState) => state.lang.langState)
    const curr: string = useSelector((state: RootState) => state.curr.currState)

    return (
        <div className='categoryPricesDetails'>
            <h3 className='categoryPricesDetails__category_name'>
                {translate(props.categoryName, lang)}
            </h3>
            <div className='categoryPricesDetails__cntr'>
                {cityPrices
                    .filter((elem: ICityPrices) => elem.category_name === props.categoryName)
                    .map((elem: ICityPrices, index: number) =>
                        elem.measure === 'money'
                            ?
                            <div key={index}>
                                <div className='categoryPricesDetails__elem_cntr'>
                                    <p className='categoryPricesDetails__elem_name'>{translate(elem.item_name, lang)}</p>
                                    <div className='categoryPricesDetails__price_cntr'>
                                        <p className='categoryPricesDetails__price_amount'>{setTwoDecimals(elem.avg)}</p>
                                        <p className='categoryPricesDetails__price_curr'>{elem.currency_code}</p>
                                    </div>
                                    <div className='categoryPricesDetails__price_cntr'>
                                        {/* <p className='categoryPricesDetails__price_amount'>{(Number(elem.usd?.avg) * cityExcancheRate[curr]).toFixed(2)}</p> */}
                                        <p className='categoryPricesDetails__price_amount'>{setTwoDecimals(+(Number(elem.usd?.avg) * cityExcancheRate[curr]))}</p>
                                        <p className='categoryPricesDetails__price_curr'>{curr}</p>
                                    </div>
                                </div>
                                <hr className='categoryPricesDetails_hr'></hr>
                            </div>
                            :
                            <div key={index}>
                                <div className='categoryPricesDetails__elem_cntr'>
                                    <p className='categoryPricesDetails__elem_name'>{translate(elem.item_name, lang)}</p>
                                    <div className='categoryPricesDetails__price_cntr'>
                                        <p className='categoryPricesDetails__price_amount'>{setTwoDecimals(elem.avg)}</p>
                                        <p className='categoryPricesDetails__price_curr'>%</p>
                                    </div>
                                    <div className='categoryPricesDetails__price_cntr'>
                                        <p className='categoryPricesDetails__price_amount'>{setTwoDecimals(elem.avg)}</p>
                                        <p className='categoryPricesDetails__price_curr'>%</p>
                                    </div>
                                </div>
                                <hr className='categoryPricesDetails_hr'></hr>
                            </div>
                    )}
            </div>
        </div>
    )
}

export default CategoryPricesDetails
