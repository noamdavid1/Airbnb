import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import dayjs from 'dayjs'
import { Anywhere } from "./Anywhere"
import { AnyWeek } from "./AnyWeek"
import { AddGuests } from "./AddGuests"
import SvgIcon from '../SvgIcon'
import { ModalWrapper } from "./ModalWarpper"

export function SearchBar({ initialModalType = '', filterBy}) {

    const navigate = useNavigate()

    const [modalType, setModalType] = useState('')
    const [draftFilterBy, setDraftFilterBy] = useState({
        location: '',
        checkIn: '',
        checkOut: '',
        guests: ''
    })
    const [selectedCity, setSelectedCity] = useState(null);
    const [activeTab, setActiveTab] = useState('Homes')
    const [searchTerm, setSearchTerm] = useState('')


    const tabRefs = {
        Homes: useRef(null),
        Experiences: useRef(null),
        Services: useRef(null),
    }


    useEffect(() => {
        if (initialModalType) {
            setModalType(initialModalType)
        }
    }, [initialModalType])

    // const handleClick = (type) => {
    //     setModalType(prev => prev === type ? '' : type)
    // }

    const handleClick = (type) => {
        setModalType(type)
      }

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setDraftFilterBy(prev => ({ ...prev, [field]: value }))
    }

    const onSubmitFilter = () => {
        const newFilter = {...filterBy, ...draftFilterBy}
        const params = new URLSearchParams()
        for (const key in newFilter) {
            if (newFilter[key]) params.set(key, newFilter[key])
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


    function getUnderlineStyle() {
        const ref = tabRefs[activeTab]
        if (ref.current) {
            const { offsetLeft, offsetWidth } = ref.current
            return {
                left: `${offsetLeft}px`,
                width: `${offsetWidth}px`,
            }
        }
        return {}
    }

    return (
        <section className="search-bar-sec">
            <div className="header-tabs-wrapper">
                <div className="header-tabs">
                    <button ref={tabRefs.Homes} className={`tab-btn ${activeTab === 'Homes' ? 'active' : ''}`} onClick={() => setActiveTab('Homes')}>
                        <span className="tab-icon">
                            <img
                                className="tab-img"
                                src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/4aae4ed7-5939-4e76-b100-e69440ebeae4.png?im_w=240"
                                alt="Home icon"
                            />
                        </span>Homes
                    </button>
                    <button ref={tabRefs.Experiences} className={`tab-btn ${activeTab === 'Experiences' ? 'active' : ''}`} onClick={() => setActiveTab('Experiences')}>
                        <span className="tab-icon">
                            <img
                                className="tab-img"
                                src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/e47ab655-027b-4679-b2e6-df1c99a5c33d.png?im_w=240"
                                alt="Experiences"
                            />
                        </span>Experiences</button>
                    <button ref={tabRefs.Services} className={`tab-btn ${activeTab === 'Services' ? 'active' : ''}`} onClick={() => setActiveTab('Services')}>
                        <span className="tab-icon">
                            <img
                                className="tab-img"
                                src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/3d67e9a9-520a-49ee-b439-7b3a75ea814d.png?im_w=240"
                                alt="Shirutim"
                            />
                        </span>
                        Services</button>
                    <span className="tab-underline" style={getUnderlineStyle()}></span>
                </div>
            </div>


            <div className="search-bar">
                <div className="wrapper where">
                    <div className="search-bar-text" onClick={() => handleClick('where')}>
                        <span className="title">Where</span>
                        <input
                            type="text"
                            className="search-bar-input"
                            placeholder="Search destinations"
                            value={
                                selectedCity
                                    ? `${selectedCity.city}, ${selectedCity.country}`
                                    : searchTerm
                            }
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={() => handleClick('where')}
                        />
                    </div>
                </div>
                <span className="sep-modal">|</span>
                <div className="wrapper check-in">
                    <div className="search-bar-text check-in" onClick={() => handleClick('check-in')}>
                        <span className="title">Check in</span>
                        <input
                            type="text"
                            className="search-bar-input"
                            placeholder="Add dates"
                            value={formatDate(draftFilterBy.checkIn)}
                            readOnly
                        />
                    </div>
                </div>
                <span className="sep-modal">|</span>
                <div className="wrapper check-out">
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
                </div>
                <span className="sep-modal">|</span>
                <div className="wrapper who">
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
                        <SvgIcon iconName={"search-icon"} />
                    </div>
                </div>


                {modalType === 'where' && (
                    <ModalWrapper type={modalType}>
                        <Anywhere
                            searchTerm={searchTerm}
                            onClose={() => setModalType('')}
                            selectedCity={selectedCity}
                            onSelect={(cityObj) => {
                                setSelectedCity(cityObj)
                                setDraftFilterBy(prev => ({
                                    ...prev,
                                    location: cityObj.city
                                }))
                                setModalType('check-in')
                                setSearchTerm(`${cityObj.city}, ${cityObj.country}`)
                            }}
                        />
                    </ModalWrapper>
                )}

                {modalType === 'check-in' && (
                    <ModalWrapper type={modalType}>
                        <AnyWeek
                            onClose={() => setModalType('')}
                            onSetDates={onSetDates}
                            checkInDate={draftFilterBy.checkIn ? dayjs(draftFilterBy.checkIn) : null}
                            checkOutDate={draftFilterBy.checkOut ? dayjs(draftFilterBy.checkOut) : null}
                        />
                    </ModalWrapper>
                )}

                {modalType === 'who' && (
                    <ModalWrapper type={modalType}>
                        <AddGuests
                            onClose={() => setModalType('')}
                            onSetGuests={onSetGuests}
                            defaultAdults={0}
                        />
                    </ModalWrapper>
                )}
            </div>
        </section>
    )
}