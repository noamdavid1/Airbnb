import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import dayjs from 'dayjs'
import { Anywhere } from "./Anywhere"
import { AnyWeek } from "./AnyWeek"
import { AddGuests } from "./AddGuests"
import { useSelector } from "react-redux"
import SvgIcon from '../SvgIcon'

function ModalWrapper({ type, children }) {
    return (
        <section className={`modal-wrapper ${type}`}>{children}</section>
    )
}

export function SearchBar({ initialModalType = '' }) {

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

    useEffect(() => {
        if (initialModalType) {
            setModalType(initialModalType)
        }
    }, [initialModalType])

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
                <SvgIcon iconName={"searchIcon"} />
            </div>

            {modalType === 'where' && (
                <ModalWrapper modalType={modalType}>
                    <Anywhere
                        onClose={() => setModalType('')}
                        selectedCity={selectedCity}
                        onSelect={(cityObj) => {
                            setSelectedCity(cityObj)
                            setDraftFilterBy(prev => ({
                                ...prev,
                                location: cityObj.city
                            }))
                            setModalType('check-in')
                        }}
                    />
                </ModalWrapper>
            )}

            {modalType === 'check-in' && (
                <ModalWrapper modalType={modalType}>
                    <AnyWeek
                        onClose={() => setModalType('who')}
                        onSetDates={onSetDates}
                        checkInDate={draftFilterBy.checkIn ? dayjs(draftFilterBy.checkIn) : null}
                        checkOutDate={draftFilterBy.checkOut ? dayjs(draftFilterBy.checkOut) : null}
                    />
                </ModalWrapper>
            )}

            {modalType === 'who' && (
                <ModalWrapper modalType={modalType}>
                    <AddGuests
                        onClose={() => setModalType('')}
                        onSetGuests={onSetGuests}
                        defaultAdults={0}
                    />
                </ModalWrapper>
            )}
        </section>
    )
}