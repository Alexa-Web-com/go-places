import './PriceComparisionPage.css'
import LocationChoose from '../../components/LocationChoose/LocationChoose'
import { translate } from '../../utils/dict'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const PriceComparisionPage = (): JSX.Element => {
    const lang: string = useSelector((state: RootState) => state.lang.langState)

    return (
        <div className='priceComparisionPage page'>
            <div className="priceComparisionPage__choose_location_cntr">
                <div className='priceComparisionPage_location_cntr'>
                    <div className='priceComparisionPage_location_el'>
                        <LocationChoose />
                    </div>
                    <div className='priceComparisionPage_location_el'>
                        <LocationChoose />
                    </div>
                </div>
                <button className='priceComparisionPage_location_compare_btn'>{translate('Compare', lang)}</button>
            </div>
        </div>
    )
}

export default PriceComparisionPage
