import { useEffect, useState } from "react"
import { orderService } from "../services/order/order.service.local"
import { useSelector } from "react-redux"
import { loadStays } from "../store/actions/stay.actions"
import { MiniStayPreview } from "../cmps/MiniStayPreview"
import { loadOrders, updateOrder } from "../store/actions/order.actions"
import { getUserById } from "../store/actions/user.actions"
import { convertDateToString } from "../services/util.service"
import { MiniUser } from "../cmps/MiniUser"

export function GuestOrders() {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const loggedinUser = useSelector(storeState => {
        if (!storeState.userModule.loggedinUser) {
            return { fullname: 'No user logged in' }
        }
        return storeState.userModule.loggedinUser
    })

    useEffect(() => {
        loadOrders({ userType: 'guest' })
    }, [])

    function updateOrderStatus(order, status) {
        // console.log("order to update", order, status);
        console.log(order)
        order.status = status
        updateOrder(order)
    }

    return (

        <section className="guest-orders">
            {/* <h1>{`Welcome back, ${loggedinUser.fullname}`}</h1> */}
            <div className="guest-table-wrapper">
                <h2>Trips</h2>
                <table>
                    {/* <caption>Trips</caption> */}
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th className="stay-col">STAY</th>
                            <th className="user-col">HOST</th>
                            <th>DATES</th>
                            <th>PRICE</th>
                            <th>STATUS</th>
                            <th className="action-col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{convertDateToString(order.createdAt)}</td>
                                <td className="stay-col mini-stay-preview">
                                    <MiniStayPreview miniStay={order.stay} />
                                </td>
                                <td className="user-col">
                                    <MiniUser miniUser={order.host} />
                                </td>
                                <td>{convertDateToString(order.from)} - {convertDateToString(order.to)}</td>
                                <td>${order.price}</td>
                                <td className={`status-badge order-status ${order.status}`}>{order.status}</td>
                                <td className="action-col">
                                    {order.status === 'pending' &&
                                        <div className="action-buttons">
                                            <button className="action-button" onClick={() => updateOrderStatus(order, 'cancelled')}>cancel</button>
                                        </div>
                                    }
                                </td>

                            </tr>)
                        )}
                    </tbody>
                </table>
            </div>
        </section>


    )

}