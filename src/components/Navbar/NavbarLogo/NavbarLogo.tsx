import React from 'react'
import './NavbarLogo.css'
import { NavLink } from 'react-router-dom'
import { MdModeOfTravel } from 'react-icons/md'

const NavbarLogo = () => {
    return (
        <NavLink to='/home' className='navbarLogo__cntr'>
            <MdModeOfTravel className='navbarLogo__img' />
            <p className='navbarLogo__name'>GoPlaces</p>
        </NavLink>
    )
}

export default NavbarLogo
