import React, { useState } from 'react'
import './LocationChoose.css'
import Select from 'react-select'
import { ICityData } from '../../store/citiesListSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { translate } from '../../utils/dict'


interface IChoosenCity extends ICityData {
    value: number;
    label: string;
}

const LocationChoose = () => {
    const [location, setLocation] = useState<string>('')

    const citiesList: ICityData[] = useSelector((state: RootState) => state.citiesList.citiesListState)

    const lang: string = useSelector((state: RootState) => state.lang.langState)

    const selectLocationOptions =
        location.length < 1
            ?
            []
            :
            citiesList
                .filter((cityEl: ICityData) => cityEl.city_name.toLowerCase().includes(location.toLowerCase())
                    || cityEl.country_name.toLowerCase().includes(location.toLowerCase()))
                .slice(0, 40)
                .map((cityEl: ICityData, index: number) => ({
                    value: index,
                    label: `${cityEl.city_name}, ${cityEl.country_name}`,
                    city_id: cityEl.city_id,
                    city_name: cityEl.city_name,
                    country_name: cityEl.country_name,
                    lat: cityEl.lat,
                    lng: cityEl.lng,
                    state_code: cityEl.state_code,
                }))

    const navigate = useNavigate()

    const chooseCityHandler = (elem: IChoosenCity) => {
        const navigateLink: string = `${elem.city_id},%20${elem.city_name.replaceAll(' ', '%20')}`
        navigate(`/city/${navigateLink}`)
    }

    return (
        <div className="navbar_settings__location_choose_cntr navbarSettings__el">
            <Select
                value={location as any}
                onInputChange={(value) => setLocation(value)}
                placeholder={translate('Choose a location', lang)}
                options={selectLocationOptions}
                menuIsOpen={location.length > 0}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                defaultValue={selectLocationOptions}

                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        border: 'none',
                        outline: state.isFocused ? '2px solid var(--aqua)' : 'none',
                        width: '17.5rem',
                        minHeight: '2.2rem',
                        height: '2.2rem',
                    }),
                }}
                onChange={(elem) => {
                    elem
                        &&
                        chooseCityHandler(
                            {
                                city_id: elem.city_id,
                                city_name: elem.city_name,
                                country_name: elem.country_name,
                                lat: elem.lat,
                                lng: elem.lng,
                                state_code: elem.state_code,
                                value: elem.value,
                                label: elem.label,
                            }
                        )
                }}
            />
        </div>
    )
}

export default LocationChoose
