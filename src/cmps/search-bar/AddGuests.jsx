import React, { useEffect, useRef, useState } from 'react'
import SvgIcon from '../SvgIcon'

export function AddGuests({ onClose, onSetGuests, defaultAdults = 0 }) {
  const [adults, setAdults] = useState(defaultAdults)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [pets, setPets] = useState(0)

  const modalRef = useRef()

  useEffect(() => {
    onSetGuests(adults)
  }, [adults])


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  useEffect(() => {
    onSetGuests?.({ adults, children, infants, pets })
  }, [adults, children, infants, pets])

  const GuestCounter = ({ label, value, setValue, min = 0, max = 10, requireAdult = false }) => {
    const handleAdd = () => {
      if (requireAdult && adults === 0) setAdults(1)
      setValue(prev => Math.min(max, prev + 1))
    }

    const handleRemove = () => {
      setValue(prev => Math.max(min, prev - 1))
    }

    const getHelperText = (label) => {
      switch (label) {
        case 'Adults':
          return 'Ages 13 or above'
        case 'Children':
          return 'Ages 2–12'
        case 'Infants':
          return 'Under 2'
        case 'Pets':
          return 'Bringing a service animal?'
        default:
          return ''
      }
    }
    return (
            <div className="guest-counter">
              <div className="guest-label">
                <div className="guest-title">{label}</div>
                <div className="guest-subtitle">{getHelperText(label)}</div>
              </div>
              <div className="guest-controls">
                <button
                  className={`counter-btn ${value <= min ? 'disabled' : ''}`}
                  onClick={handleRemove}
                  disabled={value <= min}
                >
                  <SvgIcon iconName="minus" />
                </button>
                <span className="guest-value">{value}</span>
                <button className="counter-btn" onClick={handleAdd}>
                  <SvgIcon iconName="plus" />
                </button>
              </div>
            </div>
          )
  }

  const minAdults = (children > 0 || infants > 0 || pets > 0) ? 1 : 0

  return (
    <div ref={modalRef} className="add-guests-modal">
      <GuestCounter label="Adults" value={adults} setValue={setAdults} min={minAdults} />
      <hr className='guest-hr'/>
      <GuestCounter label="Children" value={children} setValue={setChildren} requireAdult />
      <hr className='guest-hr'/>
      <GuestCounter label="Infants" value={infants} setValue={setInfants} max={5} requireAdult />
      <hr className='guest-hr'/>
      <GuestCounter label="Pets" value={pets} setValue={setPets} requireAdult />
    </div>
  )
}