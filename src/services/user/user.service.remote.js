import { httpService } from '../http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

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
	updateWishlist
}

function getUsers() {
	return httpService.get(`user`)
}

async function getById(userId) {
	const user = await httpService.get(`user/${userId}`)
	return user
}

function remove(userId) {
	return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
	const user = await httpService.put(`user/${_id}`, { _id, score })

	// When admin updates other user's details, do not update loggedinUser
	const loggedinUser = getLoggedinUser() // Might not work because its defined in the main service???
	if (loggedinUser._id === user._id) saveLoggedinUser(user)

	return user
}

async function login(userCred) {
	// console.log("remote login")
	const user = await httpService.post('auth/login', userCred)
	// console.log("remote login", { user })
	if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
	if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
	userCred.score = 10000

	const user = await httpService.post('auth/signup', userCred)
	return saveLoggedinUser(user)
}

async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	return await httpService.post('auth/logout')
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
	const miniUser = {
		_id: user._id,
		fullname: user.fullname,
		imgUrl: user.imgUrl,
		score: user.score,
		isAdmin: user.isAdmin,
		wishlist: user.wishlist
	}

	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(miniUser))
	// console.log("saveLoggedinUser", miniUser);
	return miniUser
}

export async function updateWishlist(stayId) {
	const loggedInUser = getLoggedinUser()
	if (!loggedInUser) {
		return
	}

	if (!loggedInUser.wishlist) {
		loggedInUser.wishlist = []
	}

	if (loggedInUser.wishlist.includes(stayId)) {
		loggedInUser.wishlist = loggedInUser.wishlist.filter(wishlistStayId => wishlistStayId !== stayId)
	}
	else {
		loggedInUser.wishlist.push(stayId)
	}

	const updatedUser = await httpService.put(`user/${loggedInUser._id}`, loggedInUser)
	// console.log({ updatedUser });

	return saveLoggedinUser(updatedUser)
}