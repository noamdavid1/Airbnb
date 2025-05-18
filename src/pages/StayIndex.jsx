import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'

import { loadStays, addStay, updateStay, removeStay, addStayMsg, setFilterBy } from '../store/actions/stay.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

import { StayList } from '../cmps/StayList'
import { CategoryFilter } from '../cmps/CategoryFilter'

export function StayIndex() {

    const [searchParams] = useSearchParams()

    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    const navigate = useNavigate()

    const defaultFilter = {
        category: '',
        location: '',
        checkIn: '',
        checkOut: '',
        guests: ''
    }

    useEffect(() => {
        //console.log(Object.fromEntries(searchParams))
        const newFilter = {}
        for (const [key, value] of searchParams.entries()) {
            newFilter[key] = value
        }
        const mergedFilter = { ...defaultFilter, ...newFilter }
        setFilterBy(mergedFilter)
    }, [searchParams])


    
    useEffect(() => {
        loadStays(filterBy)
    }, [filterBy])

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    // async function onAddStay() {
    //     const stay = stayService.getEmptyStay()
    //     stay.vendor = prompt('Vendor?')
    //     try {
    //         const savedStay = await addStay(stay)
    //         showSuccessMsg(`Stay added (id: ${savedStay._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add stay')
    //     }        
    // }

    async function onUpdateStay(stay) {
        const speed = +prompt('New speed?', stay.speed)
        if (speed === 0 || speed === stay.speed) return

        const stayToSave = { ...stay, speed }
        try {
            const savedStay = await updateStay(stayToSave)
            showSuccessMsg(`Stay updated, new speed: ${savedStay.speed}`)
        } catch (err) {
            showErrorMsg('Cannot update stay')
        }
    }

    function onDisplayStay(stay) {
        console.log(stay);

        navigate(`/stay/${stay._id}`)
    }

    return (
        <main className="stay-index">
            <header>
                {/* <h2>Stays</h2> */}
                {/* {userService.getLoggedinUser() && <button onClick={onAddStay}>Add a Stay</button>} */}
            </header>
            <CategoryFilter filterBy={filterBy} />
            {/* <StayFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
            <StayList
                stays={stays}
                onDisplayStay={onDisplayStay}
                onRemoveStay={onRemoveStay}
                onUpdateStay={onUpdateStay} />
        </main>
    )
}