import './CountryPage.css'
import { useParams, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { ICityData } from '../../store/citiesListSlice'
import { translate } from '../../utils/dict'


export type idParams = {
    id: string;
}

const CountryPage = (): JSX.Element => {
    const { id } = useParams<idParams>()

    const lang: string = useSelector((state: RootState) => state.lang.langState)
    const citiesList: ICityData[] = useSelector((state: RootState) => state.citiesList.citiesListState)
    const countryCities: ICityData[] = (citiesList?.filter((elem: ICityData) => elem.country_name === id)) as ICityData[]

    return (
        <div className='country_page page'>
            <NavLink to='/home' className='back'>{translate('Back', lang)}</NavLink>
            <h1 className='country_page__title page__title'>{id}</h1>
            <div className='country_page__content page__content'>
                <h2 className='country_page__content_title page__content_title'>{translate('Cities', lang)}</h2>
                <div className='country_page__cities_cntr'>
                    {countryCities.map((elem: ICityData, index: number) =>
                        elem.state_code
                            ?
                            <NavLink to={`/city/${elem.city_id}, ${elem.city_name}, ${elem.state_code}`}
                                key={index}
                                className='country_page__city'
                            >{elem.city_name}, {elem.state_code} </NavLink>
                            :
                            <NavLink to={`/city/${elem.city_id}, ${elem.city_name}`}
                                key={index}
                                className='country_page__city'
                            >{elem.city_name}</NavLink>)}

                </div>
            </div>
        </div>
    )
}

export default CountryPage
