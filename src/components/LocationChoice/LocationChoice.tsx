import React, { useState } from 'react'
import './LocationChoice.css'
import Select from 'react-select'
import { ICityData } from '../../utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { translate } from '../../utils/dict'
import { setCityOneDetails, setCityTwoDetails } from '../../store/citiesCompareSlice'
import { options, IUrlOptions } from '../../utils/options'
import { Location, ICityDetails } from '../../utils/types'

interface IChoosenCity extends ICityData {
    value?: number;
    label?: string;
}

interface ILocationChoiceProps {
    locationChoice: Location;
    setIsSpinner?: React.Dispatch<React.SetStateAction<boolean>>;
    isSpinner?: boolean;
}

const LocationChoice = (props: ILocationChoiceProps) => {
    const [location, setLocation] = useState<string>('')

    const citiesList: ICityData[] = useSelector((state: RootState) => state.citiesList.citiesListState)

    const lang: string = useSelector((state: RootState) => state.lang.langState)
    const curr: string = useSelector((state: RootState) => state.curr.currState)

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
    const dispatch = useDispatch()

    const getDataFromUrl = async (url: string, options: IUrlOptions, locationChoose: number): Promise<void> => {
        if (props.setIsSpinner !== undefined) {
            props.setIsSpinner(true)
        }

        try {
            const res = await fetch(url, options)
            const data: ICityDetails = await res.json()

            const pricesWithQty = data.prices.map(price => ({
                ...price,
                qty: 1,
                itemValue: +(1 * Number(price.usd?.avg) * data.exchange_rate[curr]).toFixed(2)
            }))

            if (locationChoose === Location.CITY_ONE) {
                dispatch(setCityOneDetails({ ...data, prices: pricesWithQty }))
            }
            if (locationChoose === Location.CITY_TWO) {
                dispatch(setCityTwoDetails({ ...data, prices: pricesWithQty }))
            }

        } catch (error) {
            console.log('Error: ', error);
        } finally {
            if (props.setIsSpinner !== undefined) {
                props.setIsSpinner(false)
            }
        }
    }

    const chooseCityHandler = (elem: IChoosenCity) => {
        if (props.locationChoice === Location.CITY_ONE || props.locationChoice === Location.CITY_TWO) {
            const url = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${elem.city_name}&country_name=${elem.country_name}`
            getDataFromUrl(url, options, props.locationChoice)
        }
        if (props.locationChoice === Location.GENERAL) {
            const navigateLink: string = `${elem.city_id},%20${elem.city_name.replaceAll(' ', '%20')}`
            navigate(`/city/${navigateLink}`)
        }
    }

    return (
        <div className="navbar_settings__location_choose_cntr navbarSettings__el">
            {props.locationChoice === 0
                ?
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
                            marginBottom: '1rem',
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
                :
                <Select
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
            }
        </div>
    )
}

export default LocationChoice
