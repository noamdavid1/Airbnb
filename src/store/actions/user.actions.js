import { userService } from '../../services/user'
// import { socketService } from '../../services/socket.service'
import { store } from '../store'

import { showErrorMsg } from '../../services/event-bus.service'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER } from '../reducers/user.reducer'

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        console.log("load users ", users);

        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const loggedinUser = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            loggedinUser
        })
        // console.log("user action login", {credentials}, {user});

        // socketService.login(user._id)
        return loggedinUser
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const loggedinUser = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            loggedinUser
        })
        // socketService.login(user._id)
        return loggedinUser
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            loggedinUser: null
        })
        // socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

//?
export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}
export async function updateWishlist(stayId) {
    try {
        const user = await userService.updateWishlist(stayId)
        //// ------------- check if there is other option
        store.dispatch({
            type: SET_USER,
            loggedinUser: user
        })
    } catch (err) {
        showErrorMsg('Cannot updateWishlist')
        console.log('Cannot updateWishlist', err)
    }
}

export async function getUserById(userId) {
    try {
    const user = await userService.getById(userId)
    return user
    }catch (err) {
        showErrorMsg('Cannot getUserById')
        console.log('Cannot getUserById', err)
    }
}
