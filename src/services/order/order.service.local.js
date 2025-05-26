import { storageService } from '../async-storage.service.js'
import { userService } from '../user/user.service.local.js'
import { loadFromStorage, makeId, saveToStorage } from '../util.service.js'

const ORDER_KEY = 'orderDB'

_createOrders()

export const orderService = {
  addOrder,
  query,
  removeOrder,
  getOrder,
  saveOrder
}

async function query(userType) {
  const loggedinUser = userService.getLoggedinUser()
  if (!loggedinUser) return []

  let orders = await storageService.query(ORDER_KEY)

  // if (!user) return Promise.reject('Not logged in')
  if (userType === 'guest') {    
    orders = orders.filter(order => order.user._id === loggedinUser._id)
  } else if (userType === 'host') {
    let hostStays = await stayService.query()
    hostStays = hostStays.filter(stay => stay.host._id === loggedinUser._id)
    let hostStayIds = hostStays.map(hostStay => hostStay._id)
    orders = orders.filter(order => hostStayIds.includes(order.stayId))
  }

  return orders
}

function getOrder(orderId) {
  return storageService.get(ORDER_KEY, orderId)
}

function removeOrder(orderId) {
  return storageService.remove(ORDER_KEY, orderId)
}

function saveOrder(order) {
  return order._id
    ? storageService.put(ORDER_KEY, order)
    : storageService.post(ORDER_KEY, order)
}

async function addOrder({ stayId, from, to, price, guests }) {
  const user = userService.getLoggedinUser()
  if (!user) throw new Error('User must be logged in to place order')

  const order = {
    _id: makeId(),
    stayId,
    user,
    createdAt: Date.now(),
    from,
    to,
    price,
    status: 'pending',
    guests: {
      adults: guests.adults || 1,
      children: guests.children || 0,
      infants: guests.infants || 0,
      pets: guests.pets || 0
    }
  }

  return storageService.post(ORDER_KEY, order)
}

async function _createOrders() {
  let orders = loadFromStorage(ORDER_KEY)
  if (!orders) {
    const res = await fetch('/data/order.json') // keep in local 
    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`)
    orders = await res.json()
    saveToStorage(ORDER_KEY, orders) // שמירת הנתונים ב-localStorage
  }
}