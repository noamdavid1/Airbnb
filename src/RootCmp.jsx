import React from 'react'
import { Routes, Route, useLocation  } from 'react-router'

import { StayIndex } from './pages/StayIndex.jsx'
import { StayDetails } from './pages/StayDetails.jsx'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { Wishlist } from './pages/Wishlist.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { HostOrders } from './pages/HostOrders.jsx'
import { GuestOrders } from './pages/GuestOrders.jsx'



export function RootCmp() {

    const location = useLocation()
    const isStayDetails = location.pathname.startsWith('/stay/')
    return (
        <div className={`main-container ${isStayDetails ? 'stay-layout' : ''}`}>
            <AppHeader/>
            <main>
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="stay/:stayId" element={<StayDetails />} />   
                    <Route path="wishlist" element={<Wishlist />} />   
                    <Route path="/hosting/order" element={<HostOrders />} />   
                    <Route path="/trips" element={<GuestOrders />} />   
                </Routes>
                <UserMsg />
            </main>
            <AppFooter />
        </div>
    )
}


