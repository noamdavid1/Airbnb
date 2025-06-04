import SvgIcon from "../SvgIcon";

export function SearchBarScroll({ onExpandSearch }) {
    return (
        <section className="search-bar">
            <div className="search-bar-text anywhere" onClick={() => onExpandSearch('where')}>Anywhere</div>
            <div className="search-bar-text any-week" onClick={() => onExpandSearch('check-in')}>Any week</div>
            <div className="search-bar-text add-guests" onClick={() => onExpandSearch('who')}>Add guests</div>
            <div className="search-icon-div" onClick={() => onExpandSearch('')}>
            <SvgIcon iconName={"search-icon"} />
            </div>
        </section>
    )
}