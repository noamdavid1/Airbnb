import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

export function AnyWeek({ onSetDates, onClose }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date())

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


  const handleChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (onSetDates) {
      onSetDates(start ? dayjs(start) : null, end ? dayjs(end) : null);

      if (start && end) onClose();
    }
  };


  const handleMonthChange = (date) => {
    setCurrentMonth(date)
  }

  const isPrevAllowed = dayjs(currentMonth).isAfter(dayjs('2025-06-01'), 'month')

  return (
    
    <div ref={modalRef} className={`any-week-picker ${isPrevAllowed ? 'prev-enabled' : ''}`}>
      <DatePicker
        selected={startDate}
        minDate={new Date()}
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        monthsShown={2}
        inline
        formatWeekDay={nameOfDay => nameOfDay.charAt(0)}
      />
    </div>
  );
}