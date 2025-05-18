import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField'
// import { setFilterBy } from "../../store/actions/stay.actions"
import dayjs from 'dayjs'
import { Anywhere } from "./Anywhere"
import { AnyWeek } from "./AnyWeek"
import { AddGuests } from "./AddGuests"
import { useSelector } from "react-redux"


export function SearchBar() {

    const navigate = useNavigate()

    const [modalType, setModalType] = useState('')
    const [draftFilterBy, setDraftFilterBy] = useState({
        location: '',
        checkIn: '',
        checkOut: '',
        guests: ''
    })
    const [selectedCity, setSelectedCity] = useState(null);

    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    const handleClick = (type) => {
        setModalType(prev => prev === type ? '' : type)
    }

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setDraftFilterBy(prev => ({ ...prev, [field]: value }))
    }

    const onSubmitFilter = () => {
        const params = new URLSearchParams()
        for (const key in draftFilterBy) {
            if (draftFilterBy[key]) params.set(key, draftFilterBy[key])
        }
        navigate({ search: params.toString() })
    }

    const onSetGuests = ({ adults, children, infants, pets }) => {
        const totalGuests = adults + children + infants + pets
        const guestStr = totalGuests === 0 ? '' : `${totalGuests} guest${totalGuests > 1 ? 's' : ''}`
        setDraftFilterBy(prev => ({ ...prev, guests: guestStr }))
    }

    const onSetDates = (checkIn, checkOut) => {
        setDraftFilterBy(prev => ({
            ...prev,
            checkIn: checkIn ? checkIn.toDate().toISOString() : '',
            checkOut: checkOut ? checkOut.toDate().toISOString() : ''
        }))
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return ''
        const date = new Date(dateStr)
        if (!(date instanceof Date) || isNaN(date)) return ''
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        })
    }

    return (
        <section className="search-bar">
            <div className="search-bar-text" onClick={() => handleClick('where')}>
                <span className="title">Where</span>
                <input
                    type="text"
                    className="search-bar-input"
                    placeholder="Search destinations"
                    value={
                        selectedCity
                            ? `${selectedCity.city}, ${selectedCity.country}`
                            : draftFilterBy.location || ''
                    }
                    onChange={handleChange}
                    readOnly
                />
            </div>
            {/* <TextField
                label="Where"
                variant="outlined"
                fullWidth
                value={
                    selectedCity
                        ? `${selectedCity.city}, ${selectedCity.country}`
                        : draftFilterBy.location || ''
                }
                onClick={() => handleClick('where')}
                InputProps={{
                    readOnly: true,
                }}
            /> */}
            <div className="search-bar-text" onClick={() => handleClick('check-in')}>
                <span className="title">Check in</span>
                <input
                    type="text"
                    className="search-bar-input"
                    placeholder="Add dates"
                    value={formatDate(draftFilterBy.checkIn)}
                    readOnly
                />
            </div>
            <div className="search-bar-text" onClick={() => handleClick('check-out')}>
                <span className="title">Check out</span>
                <input
                    type="text"
                    className="search-bar-input"
                    placeholder="Add dates"
                    value={formatDate(draftFilterBy.checkOut)}
                    readOnly
                />
            </div>
            <div className="search-bar-text" onClick={() => handleClick('who')}>
                <span className="title">Who</span>
                <input
                    type="text"
                    className="search-bar-input"
                    placeholder="Add guests"
                    value={draftFilterBy.guests}
                    onChange={handleChange}
                    readOnly
                />
            </div>
            <div className="search-icon-div" onClick={onSubmitFilter}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    fill="none"
                    height="12"
                    width="12"
                    stroke="currentColor"
                    strokeWidth="5.33"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                >
                    <path d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9" fill="none" />
                </svg>
            </div>

            <div className="search-bar-modal">
                {modalType === 'where' && (
                    <Anywhere
                        selectedCity={selectedCity}
                        onSelect={(cityObj) => {
                            setSelectedCity(cityObj)
                            setDraftFilterBy(prev => ({
                                ...prev,
                                location: cityObj.city  // שומר רק את שם העיר, כפי שהיה
                            }))
                            setModalType('')
                        }}
                    />
                )}
                {/* {modalType === 'where' && <Anywhere onClose={() => setModalType('')} />} */}
                {/* {modalType === 'check-in' && <AnyWeek onClose={() => setModalType('')} />} */}
                {modalType === 'check-in' && (
                    <AnyWeek
                        onClose={() => setModalType('')}
                        onSetDates={onSetDates}
                        checkInDate={draftFilterBy.checkIn ? dayjs(draftFilterBy.checkIn) : null}
                        checkOutDate={draftFilterBy.checkOut ? dayjs(draftFilterBy.checkOut) : null}
                    />
                )}
                {modalType === 'who' && <AddGuests onClose={() => setModalType('')} onSetGuests={onSetGuests} defaultAdults={0} />}
            </div>
        </section>
    )
}