import React from 'react'
import { Routes, Route } from 'react-router'

import { StayIndex } from './pages/StayIndex.jsx'
import { StayDetails } from './pages/StayDetails.jsx'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { Wishlist } from './pages/Wishlist.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { HostOrders } from './pages/HostOrders.jsx'
import { GuestOrders } from './pages/GuestOrders.jsx'


export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />
            {/* <UserMsg /> */}
            <main>
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="stay/:stayId" element={<StayDetails />} />   
                    <Route path="wishlist" element={<Wishlist />} />   
                    <Route path="/hosting/order" element={<HostOrders />} />   
                    <Route path="/trips" element={<GuestOrders />} />   
                </Routes>
                {/* <UserMsg /> */}
            </main>
            <AppFooter />
        </div>
    )
}


