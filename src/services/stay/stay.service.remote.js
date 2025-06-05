import { httpService } from '../http.service'

export const stayService = {
    query,
    getById,
    save,
    remove,
    addStayMsg,
    removeStayReview
}

async function query(filterBy = {}) {
    if(filterBy.wishlist){
        filterBy.wishlist = true
    }
    console.log("----stayService remote query", filterBy);
    return await httpService.get(`stay`, filterBy)
}

function getById(stayId) {
    return httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
    // return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
    var savedStay
    if (stay._id) {
        // savedStay = await httpService.put(`stay/${stay._id}`, stay)
    } else {
        // savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // const savedMsg = await httpService.post(`stay/${stayId}/msg`, {txt})
    // return savedMsg
}

async function getStayReviews(stayId, review) {
    // const savedMsg = await httpService.post(`stay/${stayId}/msg`, {txt})
    // return savedMsg
}

async function removeStayReview(stayId, reviewId) {
    return await httpService.delete(`stay/${stayId}/review/${reviewId}`)
}