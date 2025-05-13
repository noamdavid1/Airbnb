
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
    getStayCategories
}

window.cs = stayService


async function query(filterBy = {category: '', txt: '', price: 0 }) {
    try{
        let stays= await storageService.query(STORAGE_KEY)
        if (filterBy.category) {
            console.log('service, query, filter type:', filterBy.category);
            stays = stays.filter(stay => (Array.isArray(stay.categories) && stay.categories.includes(filterBy.category)))
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
        const res = await fetch('/data/stay.json') // keep in local 
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`)
        stays = await res.json()
        saveToStorage(STORAGE_KEY, stays) // שמירת הנתונים ב-localStorage
    }
}
function getStayCategories() {
    const stays = loadFromStorage(STORAGE_KEY) || [];

    const allCategories = stays.flatMap(stay => stay.categories || []);
    const uniqueCategories = [...new Set(allCategories)];

    return uniqueCategories;
}

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
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}