
import { storageService } from '../async-storage.service'
import { makeId , loadFromStorage, saveToStorage} from '../util.service'

const STORAGE_KEY = 'stayDB'
_createStays()

export const stayService = {
    query,
    getById,
    save,
    remove,
    addStayMsg,
    getStayTypes
}

window.cs = stayService


async function query(filterBy = { txt: '', price: 0 }) {
    try{
        let stays= await storageService.query(STORAGE_KEY)
        //console.log('qurey:' ,stays)
        if (filterBy.category) {
            console.log('service, query, filter type:', filterBy.category);
            stays = stays.filter(stay => stay.type === filterBy.category)
        }

        return stays
    } catch (err) {
        console.error('Failed to load stays:', err)
        return []
    }
}

async function _createStays() {
    let stays = loadFromStorage(STORAGE_KEY)
    if (!stays) {
        // JSON.parse(localStorage.getItem(STORAGE_KEY))
        const res = await fetch('/data/stay.json') // keep in local 
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`)
        stays = await res.json()
        saveToStorage(STORAGE_KEY, stays) // שמירת הנתונים ב-localStorage
    }
}

function getStayTypes() {
    const stays = loadFromStorage(STORAGE_KEY) || [];
    console.log([...new Set(stays.map(stay => stay.type))])
    //console.log('get stays types',stays.map(stay => stay.type))
    // return []
    return stays.length ? [...new Set(stays.map(stay => stay.type))] : [];
}
console.log('cheack')
// var stays = await storageService.query(STORAGE_KEY)
// const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

// if (txt) {
//     const regex = new RegExp(filterBy.txt, 'i')
//     stays = stays.filter(stay => regex.test(stay.vendor) || regex.test(stay.description))
// }
// if (minSpeed) {
//     stays = stays.filter(stay => stay.speed >= minSpeed)
// }
// if(sortField === 'vendor' || sortField === 'owner'){
//     stays.sort((stay1, stay2) => 
//         stay1[sortField].localeCompare(stay2[sortField]) * +sortDir)
// }
// if(sortField === 'price' || sortField === 'speed'){
//     stays.sort((stay1, stay2) => 
//         (stay1[sortField] - stay2[sortField]) * +sortDir)
// }

// stays = stays.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
// return stays
//}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        const stayToSave = {
            _id: stay._id,
            price: stay.price,
            speed: stay.speed,
        }
        savedStay = await storageService.put(STORAGE_KEY, stayToSave)
    } else {
        const stayToSave = {
            vendor: stay.vendor,
            price: stay.price,
            speed: stay.speed,
            // Later, owner is set by the backend
            // owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedStay = await storageService.post(STORAGE_KEY, stayToSave)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)

    const msg = {
        id: makeId(),
        // by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}