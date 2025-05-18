import * as React from 'react'
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export function AnyWeek({ checkInDate, checkOutDate, onSetDates, onClose }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'white', borderRadius: '1rem' }}>
        <DatePicker
          label="Check-in"
          value={checkInDate}
          onChange={(newValue) => onSetDates(newValue, checkOutDate)}
        />
        <DatePicker
          label="Check-out"
          value={checkOutDate}
          onChange={(newValue) => onSetDates(checkInDate, newValue)}
          minDate={checkInDate || dayjs()}
        />
        <button onClick={onClose}>Close</button>
      </div>
    </LocalizationProvider>
  )
}
