
function SearchBar(filterBy) {

    const [draftFilterBy, setDraftFilterBy] = useState({
        location: '',
        checkIn: '',
        checkOut: '',
        guests: ''
    })

    const onSubmitFilter = () => {
        const newFilter = {...filterBy, ...draftFilterBy}
        const params = new URLSearchParams()
        for (const key in newFilter) {
            if (newFilter[key]) params.set(key, newFilter[key])
        }
        navigate({ search: params.toString() })
    }

    return (
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
    )
}

function StayIndex() {
    const [searchParams] = useSearchParams()

    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
   
    useEffect(() => {
        const newFilter = {}
        for (const [key, value] of searchParams.entries()) {
            newFilter[key] = value
        }
        const mergedFilter = { ...defaultFilter, ...newFilter }
        setFilterBy(mergedFilter)
    }, [searchParams])



    useEffect(() => {
        loadStays(filterBy)
    }, [filterBy])

    return (
        <StayList
            stays={stays}
        />
    )
}