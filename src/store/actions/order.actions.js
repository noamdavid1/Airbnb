

import { store } from '../store'
import { ADD_ORDER, REMOVE_ORDER, SET_ORDERS, UPDATE_ORDER } from '../reducers/order.reducer'
import { orderService } from '../../services/order/order.service.local'
// import { SET_SCORE } from '../reducers/user.reducer'

export async function loadOrders(userType) {
	try {		
		const orders = await orderService.query(userType)
		store.dispatch({ type: SET_ORDERS, orders })
	} catch (err) {
		console.log('OrderActions: err in loadOrders', err)
		throw err
	}
}

export async function addOrder(order) {
	try {
		const addedOrder = await orderService.addOrder(order)
		store.dispatch(getActionAddOrder(addedOrder))
		const { score } = addedOrder.byUser
		// store.dispatch({ type: SET_SCORE, score })
	} catch (err) {
		console.log('OrderActions: err in addOrder', err)
		throw err
	}
}

export async function removeOrder(orderId) {
	try {
		await orderService.removeOrder(orderId)
		store.dispatch(getActionRemoveOrder(orderId))
	} catch (err) {
		console.log('OrderActions: err in removeOrder', err)
		throw err
	}
}

export async function updateOrder(order) {
	try {
		await orderService.saveOrder(order)
		store.dispatch(getActionUpdateOrder(order))
	} catch (err) {
		console.log('OrderActions: err in removeOrder', err)
		throw err
	}
}

// Command Creators
export function getActionRemoveOrder(orderId) {
	return { type: REMOVE_ORDER, orderId }
}
export function getActionAddOrder(order) {
	return { type: ADD_ORDER, order }
}
export function getActionUpdateOrder(order) {
	return { type: UPDATE_ORDER, order }
}
