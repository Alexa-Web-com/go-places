import React, { useEffect } from 'react'
import './Comparison.css'
import { ICityDetails, ICityPrices, IInputNumberQty, IIncreaseDecreaseQty } from '../../utils/types'
import { translate } from '../../utils/dict'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { decreaceItemQty, increaceItemQty, setItemsQty, setItemValueNewCurr } from '../../store/citiesCompareSlice'
import { setTwoDecimals, setZeroDecimals } from '../../utils/setTwoDecimal'

interface IComparisonProps {
    categoryName: string;
}
const Comparison = (props: IComparisonProps) => {
    const dispatch = useDispatch()

    const lang: string = useSelector((state: RootState) => state.lang.langState)
    const curr: string = useSelector((state: RootState) => state.curr.currState)

    const citiesPrices: ICityDetails[] = useSelector((state: RootState) => state.citiesCompare.citiesCompareState)

    const cityOneGoodsId: number[] = citiesPrices[0].prices.map(item => item.good_id)
    const cityTwoGoodsId: number[] = citiesPrices[1].prices.map(item => item.good_id)
    const isItemInBothCities = (itemId: number): boolean => cityOneGoodsId.includes(itemId) && cityTwoGoodsId.includes(itemId)

    useEffect(() => {

        const newStateCityOne = citiesPrices[0].prices.map((price, index) => ({
            ...price,
            itemValue: citiesPrices[0].exchange_rate[curr] * Number(citiesPrices[0].prices[index].usd?.avg)
        })
        )

        const newStateCityTwo = citiesPrices[1].prices.map((price, index) => ({
            ...price,
            itemValue: citiesPrices[1].exchange_rate[curr] * Number(citiesPrices[1].prices[index].usd?.avg)
        })
        )

        const payload = {
            newStatePricesCityOne: newStateCityOne,
            newStatePricesCityTwo: newStateCityTwo,
        }

        dispatch(setItemValueNewCurr(payload))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curr])

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, good_id: number) => {
        const payload: IInputNumberQty = {
            good_id: good_id,
            qty: (typeof e.target.value === 'number' && e.target.value >= 0) ? Number(e.target.value) : 0,
            curr: curr,
        }
        dispatch(setItemsQty(payload))
    }

    const decreaseItemQtyHandler = (good_id: number) => {
        const payload: IIncreaseDecreaseQty = {
            good_id: good_id,
            curr: curr,
        }
        dispatch(decreaceItemQty(payload))
    }

    const increaseItemQtyHandler = (good_id: number) => {
        const payload: IIncreaseDecreaseQty = {
            good_id: good_id,
            curr: curr,
        }
        dispatch(increaceItemQty(payload))
    }

    const findItemValue = (elem: ICityPrices) => citiesPrices[1].prices.find(item => item.good_id === elem.good_id)?.itemValue as number

    return (
        <div className='comparison'>
            <h3 className='comparison__category_name'>
                {translate(props.categoryName, lang)}
            </h3>
            <div className='comparison__cntr'>
                {citiesPrices[0].prices
                    .filter((elem: ICityPrices) => elem.category_name === props.categoryName)
                    .map((elem: ICityPrices, index: number) =>
                        isItemInBothCities(elem.good_id)
                        &&
                        (elem.measure === 'money'
                            ?
                            <div key={index}>
                                <div className='comparison__elem_cntr'>
                                    <div className='comparison__quantity_cntr'>
                                        <p className='comparison__quantity_minus'
                                            onClick={(e) => decreaseItemQtyHandler(elem.good_id)}
                                        >-</p>
                                        <input
                                            value={elem.qty}
                                            onChange={(e) => inputChangeHandler(e, elem.good_id)}
                                            className='comparison__quantity_input'
                                            type='text'
                                            inputMode='numeric'
                                        />
                                        <p className='comparison__quantity_plus'
                                            onClick={(e) => increaseItemQtyHandler(elem.good_id)}
                                        >+</p>
                                    </div>
                                    <div className='comparison__elem_name'>{translate(elem.item_name, lang)}</div>
                                    <div className='comparison__city_price_cntr'>
                                        <p className='comparison__cityOne_price_amount'>{setTwoDecimals(elem.itemValue)}</p>
                                        <p className='comparison__cityOne_price_curr'>{curr}</p>
                                    </div>
                                    <div className='comparison__city_price_cntr'>
                                        <p className='comparison__cityOne_price_amount'>{setTwoDecimals(findItemValue(elem))}</p>
                                        <p className='comparison__cityOne_price_curr'>{curr}</p>
                                    </div>

                                    {elem.qty === 0
                                        ?
                                        <div className='comparison__cityTwo_percent'>0 %</div>
                                        :
                                        <div className='comparison__cityTwo_percent'
                                            style={{ color: `${(+(findItemValue(elem) * 100 / elem.itemValue)) > 100 ? 'red' : 'limegreen'}` }}>
                                            {`${setZeroDecimals(+(findItemValue(elem) * 100 / elem.itemValue))} %`}
                                        </div>
                                    }

                                </div>
                                <hr className='comparison_hr'></hr>
                            </div>
                            :
                            <div key={index}>
                                <div className='comparison__elem_cntr'>
                                    <div className='comparison__quantity_cntr comparison__quantity_cntr_for_percent'></div>
                                    <div className='comparison__elem_name'>{translate(elem.item_name, lang)}</div>
                                    <div className='comparison__city_price_cntr'>
                                        <p className='comparison__cityOne_price_amount'>{elem.avg}</p>
                                        <p className='comparison__cityOne_price_curr'>%</p>
                                    </div>
                                    <div className='comparison__city_price_cntr'>
                                        <p className='comparison__cityOne_price_amount'>{citiesPrices[1].prices.find(item => item.good_id === elem.good_id)?.avg}</p>
                                        <p className='comparison__cityOne_price_curr'>%</p>
                                    </div>
                                </div>
                                <hr className='comparison_hr'></hr>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}
export default Comparison


