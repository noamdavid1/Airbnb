import React, { useEffect, useRef, useState } from 'react'
import { Typography } from '@mui/material'
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

  const iconButtonStyle = (disabled) => ({
    border: '1px solid #ccc',
    borderRadius: '50%',
    padding: '5px',
    opacity: disabled ? 0.3 : 1,
    pointerEvents: disabled ? 'none' : 'auto'
  })

  const GuestCounter = ({ label, value, setValue, min = 0, max = 10, requireAdult = false }) => {
    const handleAdd = () => {
      if (requireAdult && adults === 0) setAdults(1)
      setValue(prev => Math.min(max, prev + 1))
    }

    const handleRemove = () => {
      setValue(prev => Math.max(min, prev - 1))
    }

    const isRemoveDisabled = value <= min

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0'}}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography>{label}</Typography>
          <div style={{ fontSize: '12px', color: '#717171' }}>{getHelperText(label)}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className='minus-svg-container' onClick={handleRemove} style={iconButtonStyle(isRemoveDisabled)}>
            <SvgIcon iconName={"minus"} />
          </div>
          <span style={{ margin: '0 12px', minWidth: '16px', textAlign: 'center' }}>{value}</span>
          <div className='plus-svg-container' onClick={handleAdd} style={iconButtonStyle(false)}>
            <SvgIcon iconName={"plus"} />
          </div>
        </div>
      </div>
    )
  }

  const minAdults = (children > 0 || infants > 0 || pets > 0) ? 1 : 0

  return (
    <div ref={modalRef}>
      <GuestCounter label="Adults" value={adults} setValue={setAdults} min={minAdults} />
      <GuestCounter label="Children" value={children} setValue={setChildren} requireAdult />
      <GuestCounter label="Infants" value={infants} setValue={setInfants} max={5} requireAdult />
      <GuestCounter label="Pets" value={pets} setValue={setPets} requireAdult />
    </div>
  )
}
