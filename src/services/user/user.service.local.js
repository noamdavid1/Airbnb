import { storageService } from '../async-storage.service'
import { loadFromStorage, saveToStorage } from '../util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'userDB'
_createUsers()

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
}




async function getUsers() {
    const users = await storageService.query(STORAGE_KEY)
    console.log("get users:", users);
    
    return users.map(user => {
        delete user.password
        return user
    })
}

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

async function _createUsers() {
    let users = loadFromStorage(STORAGE_KEY)
    if (!users) {
        const res = await fetch('/data/user.json') // keep in local 
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`)
        users = await res.json()
        saveToStorage(STORAGE_KEY, users) // שמירת הנתונים ב-localStorage
    }
}

async function getById(userId) {
    return await storageService.get(STORAGE_KEY, userId)
}

function remove(userId) {
    return storageService.remove(STORAGE_KEY, userId)
}

async function update({ _id, score }) {
    const user = await storageService.get(STORAGE_KEY, _id)
    user.score = score
    await storageService.put(STORAGE_KEY, user)

	// When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

    return user
}

async function login(userCred) {
    console.log("user service:", {userCred});
    
    const users = await storageService.query(STORAGE_KEY)
    const user = users.find(user => user.username === userCred.username)

    console.log(user);
    
    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    userCred.score = 10000

    const user = await storageService.post(STORAGE_KEY, userCred)
    return saveLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
	user = { 
        _id: user._id, 
        fullname: user.fullname, 
        imgUrl: user.imgUrl, 
        score: user.score, 
        isAdmin: user.isAdmin 
    }
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    console.log("saveLoggedinUser", user);
    
	return user
}

// To quickly create an admin user, uncomment the next line
// _createAdmin()
async function _createAdmin() {
    const user = {
        username: 'admin',
        password: 'admin',
        fullname: 'Mustafa Adminsky',
        imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
        score: 10000,
    }

    const newUser = await storageService.post('user', userCred)
    console.log('newUser: ', newUser)
}