import { useState } from 'react'
import { AnyWeek } from './search-bar/AnyWeek'
import { AddGuests } from './search-bar/AddGuests'
import { orderService } from '../services/order/order.service.local.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import dayjs from 'dayjs'

export function StayOrder({ stay }) {
  const [modalType, setModalType] = useState('')
  const [dates, setDates] = useState({ from: null, to: null })
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 })

  const pricePerNight = stay.price
  const cleaningFee = 30
  const serviceFee = 25

  const nightsCount =
    dates.from && dates.to
      ? Math.ceil((new Date(dates.to) - new Date(dates.from)) / (1000 * 60 * 60 * 24))
      : 0

  const totalPrice =
    pricePerNight * nightsCount + cleaningFee + serviceFee

  async function onReserve() {
    try {
      await orderService.addOrder({
        stayId: stay._id,
        from: dates.from,
        to: dates.to,
        price: totalPrice,
        guests,
      })
      // console.log("order added succefuly");
      showSuccessMsg('Reservation successful!')
    } catch (err) {
      showErrorMsg('Failed to reserve stay.')
    }
  }

  const handleClick = (type) => {
    setModalType((prev) => (prev === type ? '' : type))
  }
  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return ''
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  function getGuestSummary(guests) {
    const { adults, children, infants, pets } = guests
    const total = adults + children
    let str = `${total} guest${total !== 1 ? 's' : ''}`
    if (infants) str += `, ${infants} infant${infants !== 1 ? 's' : ''}`
    if (pets) str += `, ${pets} pet${pets !== 1 ? 's' : ''}`
    return str
  }
  return (
    <section className="stay-order">
      <div className="price-per-night">
        <span className="price">${pricePerNight}</span> night
      </div>
      <div className="date-and-guests">
        <div className="check-dates">
          <div
            className="search-bar-text"
            onClick={() => handleClick('check-in')}
          >
            <span className="title">Check in</span>
            <input
              type="text"
              className="search-bar-input"
              placeholder="Add dates"
              value={formatDate(dates.from)}
              readOnly
            />
          </div>

          <div
            className="search-bar-text"
            onClick={() => handleClick('check-out')}
          >
            <span className="title">Check out</span>
            <input
              type="text"
              className="search-bar-input"
              placeholder="Add dates"
              value={formatDate(dates.to)}
              readOnly
            />
          </div>
        </div>

        <div className="search-bar-text guests" onClick={() => handleClick('guests')}>
          <span className="title">Guests</span>
          <span className="value">
            {getGuestSummary(guests)}
          </span>
        </div>
      </div>

      {(modalType === 'check-in' || modalType === 'check-out') && (
        <div className="search-bar-modal">
          <AnyWeek
            onClose={() => setModalType('')}
            onSetDates={(from, to) => {
              setDates({ from: from?.toDate(), to: to?.toDate() })
            }}
            checkInDate={dates.from ? dayjs(dates.from) : null}
            checkOutDate={dates.to ? dayjs(dates.to) : null}
          />
        </div>
      )}
      {modalType === 'guests' && (
        <div className="search-bar-modal">
          <AddGuests
            onClose={() => setModalType('')}
            onSetGuests={(newGuests) => setGuests(newGuests)}
            defaultAdults={1}
          />
        </div>
      )}


      <button className="reserve-btn" onClick={onReserve}>
        Reserve
      </button>

      <div className="price-breakdown">
        <div className="row">
          <span>
            ${pricePerNight} x {nightsCount} nights
          </span>
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
        <hr className='order-hr' />
        <div className="row total">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>
    </section>
  )
}