import React from 'react'
import { Routes, Route } from 'react-router'

import { StayIndex } from './pages/StayIndex.jsx'
import { StayDetails } from './pages/StayDetails.jsx'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { Wishlist } from './pages/Wishlist.jsx'


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
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


