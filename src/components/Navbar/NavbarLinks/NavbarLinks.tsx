import React from 'react'
import './NavbarLinks.css'
import { NavLink } from 'react-router-dom'
import { translate } from '../../../utils/dict'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

const NavbarLinks = (): JSX.Element => {
    const lang: string = useSelector((state: RootState) => state.lang.langState)

    return (
        <nav className='navbar_links'>
            <NavLink to='/home' className='navbar_links__link'>{translate('Home', lang)}</NavLink>
            <NavLink to='/price-comparision' className='navbar_links__link'>{translate('Price Comparision', lang)}</NavLink>
            <NavLink to='/contact' className='navbar_links__link'>{translate('Contact', lang)}</NavLink>
        </nav>
    )
}

export default NavbarLinks
