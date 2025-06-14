import { stayService } from '../../services/stay'
import { store } from '../store'
import { ADD_STAY, REMOVE_STAY, SET_STAYS, SET_STAY, UPDATE_STAY, ADD_STAY_MSG, SET_FILTER } from '../reducers/stay.reducer'

export async function loadStays(filterBy) {
    try {
        // console.log("loadStays")
        const stays = await stayService.query(filterBy)
        store.dispatch(getCmdSetStays(stays))
    } catch (err) {
        console.log('Cannot load stays', err)
        throw err
    }
}

export async function loadStay(stayId) {
    try {
        const stay = await stayService.getById(stayId)
        store.dispatch(getCmdSetStay(stay))
    } catch (err) {
        console.log('Cannot load stay', err)
        throw err
    }
}


export async function removeStay(stayId) {
    try {
        await stayService.remove(stayId)
        store.dispatch(getCmdRemoveStay(stayId))
    } catch (err) {
        console.log('Cannot remove stay', err)
        throw err
    }
}

export async function addStay(stay) {
    try {
        const savedStay = await stayService.save(stay)
        store.dispatch(getCmdAddStay(savedStay))
        return savedStay
    } catch (err) {
        console.log('Cannot add stay', err)
        throw err
    }
}

export async function updateStay(stay) {
    try {
        const savedStay = await stayService.save(stay)
        store.dispatch(getCmdUpdateStay(savedStay))
        return savedStay
    } catch (err) {
        console.log('Cannot save stay', err)
        throw err
    }
}

export async function addStayMsg(stayId, txt) {
    try {
        const msg = await stayService.addStayMsg(stayId, txt)
        store.dispatch(getCmdAddStayMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add stay msg', err)
        throw err
    }
}

export async function removeStayReview(stayId, reviewId) {
    try {
        const msg = await stayService.removeStayReview(stayId, reviewId)
        store.dispatch(getCmdAddStayMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add stay msg', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    console.log('filter action:', filterBy)
    store.dispatch({ type: SET_FILTER, filterBy })
}

// Command Creators:

function getCmdSetStays(stays) {
    return {
        type: SET_STAYS,
        stays
    }
}
function getCmdSetStay(stay) {
    return {
        type: SET_STAY,
        stay
    }
}
function getCmdRemoveStay(stayId) {
    return {
        type: REMOVE_STAY,
        stayId
    }
}
function getCmdAddStay(stay) {
    return {
        type: ADD_STAY,
        stay
    }
}
function getCmdUpdateStay(stay) {
    return {
        type: UPDATE_STAY,
        stay
    }
}
function getCmdAddStayMsg(msg) {
    return {
        type: ADD_STAY_MSG,
        msg
    }
}

function getCmdRemoveStayReview(stayId, reviewId) {
    return {
        type: ADD_STAY_MSG,
        stayId,
        reviewId
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadStays()
    await addStay(stayService.getEmptyStay())
    await updateStay({
        _id: 'm1oC7',
        title: 'Stay-Good',
    })
    await removeStay('m1oC7')
    // TODO unit test addStayMsg
}
