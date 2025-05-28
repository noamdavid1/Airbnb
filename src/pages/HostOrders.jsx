import { useEffect, useState } from "react"
import { orderService } from "../services/order/order.service.local"
import { useSelector } from "react-redux"
import { loadStays } from "../store/actions/stay.actions"
import { MiniStayPreview } from "../cmps/MiniStayPreview"
import { loadOrders, updateOrder } from "../store/actions/order.actions"
import { getUserById } from "../store/actions/user.actions"
import { convertDateToString } from "../services/util.service"

export function HostOrders() {
    const [view, setView] = useState('dashboard')
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
        loadOrders('host')

        // const loadOrders = async () => {
        //     try {
        //         const orders = await orderService.query(); // now it's the actual data
        //         console.log('Resolved orders:', orders);
        //         setOrders(orders);
        //     } catch (err) {
        //         console.error('Failed to load orders:', err);
        //     }
        // };
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

    function isOrdersDisplayed() {
        return (view === 'orders' && orders && orders.length)
    }
    return (
        <>
            <header>
                <nav>
                    <button onClick={() => setView('orders')}>Orders</button>
                    <button onClick={() => setView('dashboard')}>Dashboard</button>
                </nav>
            </header>

            {<section>
                <h1>dashboard</h1>
            </section>}
            {isOrdersDisplayed() && <section className="host-actions">
                <h1>{`Welcome back, ${loggedinUser.fullname}`}</h1>
                <h2>Orders</h2>
                <table>
                    {/* <caption>Orders</caption> */}
                    <thead>
                        <tr>
                            <th>GUEST</th>
                            <th>DATES</th>
                            <th>STAY</th>
                            <th>PAYMENT</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order.user.fullname}</td>
                                <td>{convertDateToString(order.from)} - {convertDateToString(order.to)}</td>
                                <td className="mini-stay-preview">
                                    <MiniStayPreview stay={getStay(order.stayId)} />
                                </td>
                                <td>${order.price}</td>
                                <td className={`order-status ${order.status}`}>{order.status}</td>
                                <td>
                                    {order.status === 'pending' &&
                                        <div className="host-response">
                                            <button onClick={() => updateOrderStatus(order, 'accepted')}>ACCEPT</button>
                                            <button onClick={() => updateOrderStatus(order, 'rejected')}>REJECT</button>
                                        </div>
                                    }
                                </td>

                            </tr>)
                        )}
                    </tbody>
                </table>
            </section>}
        </>

    )

}