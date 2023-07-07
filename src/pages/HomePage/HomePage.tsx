import './HomePage.css'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { translate } from '../../utils/dict';
import { ICityData } from '../../store/citiesListSlice';

const HomePage = (): JSX.Element => {
    const citiesList: ICityData[] = useSelector((state: RootState) => state.citiesList.citiesListState)
    const countries: string[] = [...new Set(citiesList.map((city: ICityData) => city.country_name))]
    const lang: string = useSelector((state: RootState) => state.lang.langState)

    return (
        <div className='home_page page'>
            <h1 className='home_page__title page__title'>{translate('Cost of living and prices for cities around the world, prices of food, rent, shopping etc.', lang)}</h1>
            <div className='home_page__content page__content'>
                <h2 className='home_page__content_title page__content_title'>{translate('Countires', lang)}</h2>
                <div className='home_page__content_countries_cntr'>
                    {countries.map((country: string, index: number) =>
                        <div className='home_page__content_country_cntr'
                            key={index}>
                            <NavLink to={`/${country}`} className='home_page__content_country_name'>{country}</NavLink>
                            <div />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage
