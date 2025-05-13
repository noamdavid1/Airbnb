

// export function AnyWeek(){
//     return(
//         <section  className="any-week">
            
//         </section>
//     )
// }


// import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

// export default function AnyWeek() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DateRangePicker']}>
//         <DateRangePicker />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

import * as React from 'react'
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export function AnyWeek() {
  const [checkInDate, setCheckInDate] = React.useState(null)
  const [checkOutDate, setCheckOutDate] = React.useState(null)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <DatePicker
          label="Check-in"
          value={checkInDate}
          onChange={(newValue) => setCheckInDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="Check-out"
          value={checkOutDate}
          onChange={(newValue) => setCheckOutDate(newValue)}
          minDate={checkInDate || dayjs()} // כדי לא לבחור תאריך יציאה לפני תאריך כניסה
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  )
}

// import * as React from 'react';
// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// export function AnyWeek() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DatePicker', 'DatePicker']}>
//         <DemoItem label="Check in">
//           <DatePicker />
//         </DemoItem>
//         <DemoItem label="Check out">

//           <DatePicker maxDate={dayjs('2026-04-17')} />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }