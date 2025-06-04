import { httpService } from "../http.service"
import { userService } from "../user"

export const orderService = {
  addOrder,
  query,
  removeOrder,
  getOrder,
  saveOrder
}

async function query(filterBy) {
  return await httpService.get(`order`, filterBy)
}

function getOrder(orderId) {
  return httpService.get(`order/${orderId}`)
}

function removeOrder(orderId) {
  return httpService.delete(`order/${orderId}`)
}

async function saveOrder(order) {
  var savedOrder
  if (order._id) {
    savedOrder = await httpService.put(`order/${order._id}`, order)
  } else {
    savedOrder = await httpService.post('order', order)
  }
  return savedOrder
}

async function addOrder({ stay, from, to, price, guests }) {

  const loggedinUser = userService.getLoggedinUser()
  if (!loggedinUser) throw new Error('User must be logged in to place order')

  const order = {
    stay,
    guest: loggedinUser,
    host: stay.host,
    from,
    to,
    price,
    guests: {
      adults: guests.adults || 1,
      children: guests.children || 0,
      infants: guests.infants || 0,
      pets: guests.pets || 0
    }
  }

  console.log("addOrder", order);
  
  return await httpService.post(`order`, order)

}

