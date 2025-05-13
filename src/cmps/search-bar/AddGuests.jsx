import React, { useEffect, useRef, useState } from 'react'
import { Typography, IconButton } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'

export function AddGuests({ onClose }) {
  const [adults, setAdults] = useState(0)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [pets, setPets] = useState(0)

  const modalRef = useRef()

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

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0' }}>
        <Typography>{label}</Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleRemove} style={iconButtonStyle(isRemoveDisabled)}>
            <Remove />
          </IconButton>
          <span style={{ margin: '0 12px', minWidth: '16px', textAlign: 'center' }}>{value}</span>
          <IconButton onClick={handleAdd} style={iconButtonStyle(false)}>
            <Add />
          </IconButton>
        </div>
      </div>
    )
  }

  const minAdults = (children > 0 || infants > 0 || pets > 0) ? 1 : 0

  return (
    <div ref={modalRef} style={{
      position: 'absolute',
      backgroundColor: '#fff',
      padding: '16px',
      border: '1px solid #ccc',
      borderRadius: '12px',
      width: '300px',
      zIndex: 999
    }}>
      <GuestCounter label="Adults" value={adults} setValue={setAdults} min={minAdults} />
      <GuestCounter label="Children" value={children} setValue={setChildren} requireAdult />
      <GuestCounter label="Infants" value={infants} setValue={setInfants} max={5} requireAdult />
      <GuestCounter label="Pets" value={pets} setValue={setPets} requireAdult />
    </div>
  )
}
