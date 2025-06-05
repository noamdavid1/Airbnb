import { useState, useEffect, useRef } from 'react'

const cities = [
  {
    city: "Maui",
    country: "United States",
    phrase: "Tropical island paradise",
    iconImg: "/cityIcon/maui.png"
  },
  {
    city: "Montreal",
    country: "Canada",
    phrase: "Charming French-Canadian city",
    iconImg: "/cityIcon/Amsterdam.png"
  },
  {
    city: "Porto",
    country: "Portugal",
    phrase: "Historic riverside charm",
    iconImg: "/cityIcon/porto.png"
  },
  {
    city: "New York",
    country: "United States",
    phrase: "The city that never sleeps",
    iconImg: "/cityIcon/new-york.png"
  },
  {
    city: "Barcelona",
    country: "Spain",
    phrase: "Popular beach destination",
    iconImg: "/cityIcon/Barcelona.png"
  },
  {
    city: "Istanbul",
    country: "Turkey",
    phrase: "Where East meets West",
    iconImg: "/cityIcon/Istanbul.png"
  },
  {
    city: "Hong Kong",
    country: "Hong Kong",
    phrase: "Vibrant urban skyline",
    iconImg: "/cityIcon/Bucharest.png"
  },
  {
    city: "Sydney",
    country: "Australia",
    phrase: "Iconic beaches & Opera House",
    iconImg: "/cityIcon/sydney.png"
  },
  {
    city: "Rio De Janeiro",
    country: "Brazil",
    phrase: "Lively carnivals & beaches",
    iconImg: "/cityIcon/rio-de-janeiro.png"
  }
]
export function Anywhere({ searchTerm, selectedCity, onSelect, onClose }) {
  const [filteredCities, setFilteredCities] = useState(cities)
  const [selected, setSelected] = useState(selectedCity ? selectedCity.city : '')
  const modalRef = useRef()

  useEffect(() => {
    if (searchTerm) {
      setFilteredCities(cities)
    } else {
      const filtered = cities.filter(city =>
        city.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredCities(filtered)
    }
  }, [searchTerm])


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

  const handleSelectCity = (city) => {
    setSelected(city.city)
    onSelect && onSelect(city)
  }

  return (
    <div ref={modalRef} className="anywhere-modal">
      <ul className="city-list">
        {filteredCities.map((city) => (
          <li
            key={city.city}
            className={`city-item ${selected === city.city ? 'selected' : ''}`}
            onClick={() => handleSelectCity(city)}
          >
            <img className="city-icon" src={city.iconImg} />
            <div className="city-info">
              <div className="city-name">{city.city}, {city.country}</div>
              <div className="city-phrase">{city.phrase}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}