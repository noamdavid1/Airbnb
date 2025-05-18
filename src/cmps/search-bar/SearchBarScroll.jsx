export function SearchBarScroll({onExpandSearch}) {
    return (
        <section className="search-bar" onClick={onExpandSearch}>
            <div className="search-bar-text">Anywhere</div>
            <div className="search-bar-text">Any week</div>
            <div className="search-bar-text">Add guests</div>
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
        </section>
    )
}