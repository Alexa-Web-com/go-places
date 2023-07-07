import React from 'react'
import './Navbar.css'
import NavbarLinks from './NavbarLinks/NavbarLinks'
import NavbarSettings from './NavbarSettings/NavbarSettings'
import NavbarLogo from './NavbarLogo/NavbarLogo'


const Navbar = (): JSX.Element => {
    return (
        <div className='navbar'>
            <div className='navbar__main'>
                <NavbarLogo />
                <NavbarLinks />
            </div>
            <div className='navbar__settings'>
                <NavbarSettings />
            </div>
        </div>
    )
}

export default Navbar
