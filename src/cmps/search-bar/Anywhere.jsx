import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { TextField, Avatar, Box, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'


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
    iconImg: "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437045/dmquvficldi8ssfdlrrx.jpg"
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
    iconImg: "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg"
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

export function Anywhere({ selectedCity, onSelect, onClose}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCities, setFilteredCities] = useState(cities)
  const [selected, setSelected] = useState(selectedCity ? selectedCity.city : '')

   const modalRef = useRef()

  useEffect(() => {
    const filtered = cities.filter(city =>
      city.city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCities(filtered)
  }, [searchTerm])

  const handleSelectCity = (city) => {
    setSelected(city.city)
    onSelect && onSelect(city)
  }
  
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

  return (
    <Box
    ref={modalRef}
      sx={{
        width: 300,
        maxHeight: 300,
        overflowY: 'auto',
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 3,
        p: 1,
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Search city"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 1 }}
      />
      <List>
        {filteredCities.map((city) => (
          <ListItem
            key={city.city}
            selected={selected === city.city}
            onClick={() => handleSelectCity(city)}
            sx={{ borderRadius: 1 }}
          >
            <ListItemAvatar>
              <Avatar
                src={city.iconImg}
                alt={city.city}
                variant="square"
                sx={{ width: 56, height: 56, borderRadius: 2}}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`${city.city}, ${city.country}`}
              secondary={city.phrase}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
