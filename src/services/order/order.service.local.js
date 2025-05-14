import { storageService } from '../async-storage.service.js'
// import { userService } from '../user'
import { makeId } from '../util.service.js'

const ORDER_KEY = 'orderDB'

export const orderService = {
  addOrder,
  // query,
  // removeOrder,
  // getOrder,
  // saveOrder
}

// function query() {
//   const user = userService.getLoggedinUser()
//   if (!user) return Promise.reject('Not logged in')
//   return storageService.query(ORDER_KEY).then(orders =>
//     orders.filter(order => order.userId === user._id)
//   )
// }

// function getOrder(orderId) {
//   return storageService.get(ORDER_KEY, orderId)
// }

// function removeOrder(orderId) {
//   return storageService.remove(ORDER_KEY, orderId)
// }

// function saveOrder(order) {
//   return order._id
//     ? storageService.put(ORDER_KEY, order)
//     : storageService.post(ORDER_KEY, order)
// }

async function addOrder({ stayId, from, to, guests }) {
  //const user = userService.getLoggedinUser()
  //if (!user) throw new Error('User must be logged in to place order')

  const order = {
    _id: makeId(),
    stayId,
    //userId: user._id,
    createdAt: Date.now(),
    from,
    to,
    guests: {
      adults: guests.adults || 1,
      children: guests.children || 0,
      infants: guests.infants || 0,
      pets: guests.pets || 0
    }
  }

  return storageService.post(ORDER_KEY, order)
}
