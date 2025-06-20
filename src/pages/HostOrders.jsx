import { useEffect, useState } from "react"
import { orderService } from "../services/order/order.service.local"
import { useSelector } from "react-redux"
import { loadStays } from "../store/actions/stay.actions"
import { MiniStayPreview } from "../cmps/MiniStayPreview"
import { loadOrders, updateOrder } from "../store/actions/order.actions"
import { getUserById } from "../store/actions/user.actions"
import { convertDateToString } from "../services/util.service"
import { MiniUser } from "../cmps/MiniUser"
import { useNavigate } from "react-router-dom"

export function HostOrders() {
    const navigate = useNavigate()
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const loggedinUser = useSelector(storeState => {

        if (!storeState.userModule.loggedinUser) {
            return { fullname: 'No user logged in' }
        }
        return storeState.userModule.loggedinUser
    })

    useEffect(() => {
        loadOrders({ userType: 'host' })
    }, [])

    function updateOrderStatus(order, status) {
        // console.log("order to update", order, status);
        order.status = status
        updateOrder(order)
    }

    function getNumberOfGuests(guests) {
        return guests.adults + guests.children + guests.infants + guests.pets
    }

    function onStayClick(stay) {
        navigate(`/stay/${stay._id}`)
    }

    return (
        <section className="host-orders">
            {/* <h1>{`Welcome back, ${loggedinUser.fullname}`}</h1> */}
            <div className="host-table-wrapper">
                <h2>Orders</h2>
                <table>
                    {/* <caption>Trips</caption> */}
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>BOOKER</th>
                            <th className="stay-col">STAY</th>
                            <th>DATES</th>
                            <th>GUESTS</th>
                            {/* <th>Price/night</th> */}
                            <th>PRICE</th>
                            <th>STATUS</th>
                            <th className="action-col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{convertDateToString(order.createdAt)}</td>
                                <td>
                                    <MiniUser miniUser={order.guest} />
                                </td>
                                <td className="stay-col" onClick={() => onStayClick(order.stay)}>
                                    <MiniStayPreview miniStay={order.stay} />
                                </td>
                                <td>{convertDateToString(order.from)} - {convertDateToString(order.to)}</td>
                                <td>{getNumberOfGuests(order.guests)}</td>
                                <td>${order.price}</td>
                                <td className={`status-badge order-status ${order.status}`}>{order.status}</td>
                                <td className="action-col">
                                    {order.status === 'pending' &&
                                        <div className="action-buttons">
                                            <button className="action-button approve-btn" onClick={() => updateOrderStatus(order, 'accepted')}>Approve</button>
                                            <button className="action-button reject-btn" onClick={() => updateOrderStatus(order, 'rejected')}>Reject</button>
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