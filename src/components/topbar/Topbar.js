import React from 'react'

import "./topbar.css"

//local
import Header from './parts/Header'
import NavIcons from './parts/NavIcons'
import NavLinks from './parts/NavLinks'
import Search from './parts/Search'
import UserInfo from './parts/UserInfo'

export default function Topbar() {
    return (
        <div className='topbar'>
            <div className='topbar-left'>
                <Header />
            </div>
            <div className='topbar-center'>
                <Search />
            </div>
            <div className='topbar-right'>
                <div className='topbar-right-links'>
                <NavLinks />
                <NavIcons />
                </div>
                <div className='topbar-right-userInfo'>
                <UserInfo />
                </div>
            </div>
        </div>
    )
}
