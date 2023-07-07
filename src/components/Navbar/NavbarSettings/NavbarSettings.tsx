import React from 'react'
import Select from 'react-select'
import './NavbarSettings.css'
import { languages } from '../../../utils/dict'
import { currencies } from '../../../utils/dict'
import { useSelector, useDispatch } from 'react-redux'
import { changeLang } from '../../../store/languageSlice'
import { changeCurr } from '../../../store/currencySlice'
import { RootState } from '../../../store/store'

import LocationChoose from '../../LocationChoose/LocationChoose'

const NavbarSettings = () => {
    const lang = useSelector((state: RootState) => state.lang.langState)
    const curr = useSelector((state: RootState) => state.curr.currState)

    const dispatch = useDispatch()

    const langChangeHandler = (langValue: string): void => {
        dispatch(changeLang(langValue))
    }

    const currChangeHandler = (currValue: string): void => {
        dispatch(changeCurr(currValue))
    }

    const selectCurrOptions = currencies.map((currency: string, index: number) => ({
        value: index,
        label: currency,
    }))

    const selectLangOptions = languages.map((language: string, index: number) => ({
        value: index,
        label: language,
    }))


    return (
        <div className='navbarSettings'>
            <div className="navbarSettings__el_cntr">
                <div className="navbarSettings__lang_cntr navbarSettings__el">
                    <Select
                        options={selectLangOptions}
                        components={{ IndicatorSeparator: () => null }}
                        defaultValue={selectLangOptions.filter((langOption) => langOption.label === lang)}
                        onChange={(elem) => {
                            elem
                                &&
                                langChangeHandler(elem.label)
                        }}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                border: 'none',
                                outline: state.isFocused ? '2px solid var(--aqua)' : 'none',
                                minWidth: '6rem',
                                minHeight: '2.2rem',
                                height: '2.2rem',
                            }),
                        }}
                    />
                </div>
                <div className="navbarSettings__currency_cntr navbarSettings__el">
                    <Select
                        options={selectCurrOptions}
                        components={{ IndicatorSeparator: () => null }}
                        defaultValue={selectCurrOptions.filter((currOption) => currOption.label === curr)}
                        onChange={(elem) => {
                            elem
                                &&
                                currChangeHandler(elem.label)
                        }}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                border: 'none',
                                outline: state.isFocused ? '2px solid var(--aqua)' : 'none',
                                minWidth: '6rem',
                                minHeight: '2.2rem',
                                height: '2.2rem',
                            }),
                        }}
                    />
                </div>
            </div>
            <LocationChoose />
        </div>
    )
}

export default NavbarSettings
