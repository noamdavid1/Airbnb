import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loadStays, addStay, updateStay, removeStay, addStayMsg } from '../store/actions/stay.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay'

import { StayList } from '../cmps/StayList'
import { StayFilter } from '../cmps/StayFilter'

export function StayIndex() {

    const [ filterBy, setFilterBy ] = useState(stayService.getDefaultFilter())
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const navigate = useNavigate()

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
        if(speed === 0 || speed === stay.speed) return

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
                <h2>Stays</h2>
                {/* {userService.getLoggedinUser() && <button onClick={onAddStay}>Add a Stay</button>} */}
            </header>
            <StayFilter filterBy={filterBy} setFilterBy={setFilterBy} />
            <StayList 
                stays={stays}
                onDisplayStay={onDisplayStay}
                onRemoveStay={onRemoveStay} 
                onUpdateStay={onUpdateStay}/>
        </main>
    )
}