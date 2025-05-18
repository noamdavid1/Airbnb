import { useState } from 'react'
import { AnyWeek } from './search-bar/AnyWeek'
import { AddGuests } from './search-bar/AddGuests'
import { orderService } from '../services/order/order.service.local.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function StayReservation({ stay }) {
  const [dates, setDates] = useState({ from: null, to: null })
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 })

  const pricePerNight = stay.price
  const cleaningFee = 30
  const serviceFee = 25
  const tax = 40

  const nightsCount = dates.from && dates.to
    ? Math.ceil((new Date(dates.to) - new Date(dates.from)) / (1000 * 60 * 60 * 24))
    : 0

  const totalPrice = (pricePerNight * nightsCount) + cleaningFee + serviceFee + tax

  async function onReserve() {
    try {
      await orderService.addOrder({
        stayId: stay._id,
        from: dates.from,
        to: dates.to,
        guests
      })
      showSuccessMsg('Reservation successful!')
    } catch (err) {
      showErrorMsg('Failed to reserve stay.')
    }
  }

  return (
    <section className="stay-reservation">
      <div className="price-per-night">
        <span className="price">${pricePerNight}</span> / night
      </div>

      <AnyWeek dates={dates} onChange={setDates} />
      <AddGuests guests={guests} onChange={setGuests} />

      <button className="reserve-btn" onClick={onReserve}>Reserve</button>

      <div className="price-breakdown">
        <div className="row">
          <span>${pricePerNight} x {nightsCount} nights</span>
          <span>${pricePerNight * nightsCount}</span>
        </div>
        <div className="row">
          <span>Cleaning fee</span>
          <span>${cleaningFee}</span>
        </div>
        <div className="row">
          <span>Airbnb service fee</span>
          <span>${serviceFee}</span>
        </div>
        <div className="row">
          <span>Tax</span>
          <span>${tax}</span>
        </div>
        <hr />
        <div className="row total">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>
    </section>
  )
}