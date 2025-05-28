import React from 'react'
import { Routes, Route, useLocation  } from 'react-router'

import { StayIndex } from './pages/StayIndex.jsx'
import { StayDetails } from './pages/StayDetails.jsx'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { Wishlist } from './pages/Wishlist.jsx'



export function RootCmp() {

    const location = useLocation()
    const isStayDetails = location.pathname.startsWith('/stay/')
    return (
        <div className={`main-container ${isStayDetails ? 'stay-layout' : ''}`}>
            <AppHeader />
            {/* <UserMsg /> */}
            <main>
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="stay/:stayId" element={<StayDetails />} />   
                    <Route path="wishlist" element={<Wishlist />} />   
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


