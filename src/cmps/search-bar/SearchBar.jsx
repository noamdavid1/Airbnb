import { useState } from "react"
import { Anywhere } from "./Anywhere"
import { AnyWeek } from "./AnyWeek"
import { AddGuests } from "./AddGuests"


export function SearchBar() {

    const [modalType, setModalType] = useState('')

    const handleClick = (type) => {
        setModalType(prev => prev === type ? '' : type)
    }

    return (
        <section className="search-bar">
            <div className="search-bar-text" onClick={() => handleClick('Anywhere')}>
                Anywhere
            </div>
            <div className="search-bar-text" onClick={() => handleClick('Anyweek')}>
                Any week
            </div>
            <div className="search-bar-text2" onClick={() => handleClick('AddGuests')}>
                Add guests
            </div>
            <div className="search-icon-div">
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
                {modalType === 'Anywhere' && <Anywhere onClose={() => setModalType('')}/>}
                {modalType === 'Anyweek' && <AnyWeek onClose={() => setModalType('')}/>}
                {modalType === 'AddGuests' &&  <AddGuests onClose={() => setModalType('')}/>}
            </div>
        </section>
    )
}