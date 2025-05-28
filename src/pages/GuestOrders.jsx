import { useEffect, useState } from "react"
import { orderService } from "../services/order/order.service.local"
import { useSelector } from "react-redux"
import { loadStays } from "../store/actions/stay.actions"
import { MiniStayPreview } from "../cmps/MiniStayPreview"
import { loadOrders, updateOrder } from "../store/actions/order.actions"
import { getUserById } from "../store/actions/user.actions"
import { convertDateToString } from "../services/util.service"

export function GuestOrders() {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const stays = useSelector(storeState => storeState.stayModule.stays)

    const loggedinUser = useSelector(storeState => {

        if (!storeState.userModule.loggedinUser) {
            return { fullname: 'No user logged in' }
        }
        return storeState.userModule.loggedinUser

    })

    useEffect(() => {
        loadStays()
        loadOrders('guest')
    }, [])

    useEffect(() => {
        console.log(stays);
    }, [stays])

    function getStay(stayId) {
        return stays.find(stay => stay._id === stayId)
    }

    function updateOrderStatus(order, status) {
        // console.log("order to update", order, status);
        order.status = status
        updateOrder(order)
    }

    function getHostName(stayId) {
        const stay = getStay(stayId).host.fullname
        return stay?.host?.fullname ?? ''
    }

    return (

        <section className="guest-orders">
            <h1>{`Welcome back, ${loggedinUser.fullname}`}</h1>
            <h2>Orders</h2>
            <table>
                {/* <caption>Orders</caption> */}
                <thead>
                    <tr>
                        <th>STAY</th>
                        <th>HOST</th>
                        <th>DATES</th>
                        <th>TOTAL</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td className="mini-stay-preview">
                                <MiniStayPreview stay={getStay(order.stayId)} />
                            </td>
                            <td>{getHostName(order.stayId)}</td>
                            <td>{convertDateToString(order.from)} - {convertDateToString(order.to)}</td>
                            <td>${order.price}</td>
                            <td className={`order-status ${order.status}`}>{order.status}</td>
                            <td>
                                {order.status === 'pending' &&
                                    <div className="guest-actions">
                                        <button onClick={() => updateOrderStatus(order, 'cancelled')}>cancel</button>
                                    </div>
                                }
                            </td>

                        </tr>)
                    )}
                </tbody>
            </table>
        </section>


    )

}