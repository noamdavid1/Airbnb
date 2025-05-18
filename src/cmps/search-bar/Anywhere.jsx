import * as React from 'react'
import { useState, useEffect } from 'react'
import { TextField, Avatar, Box, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'


const cities = [
  {
    city: "Maui",
    country: "United States",
    phrase: "United States",
    iconImg: "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg"
  },
  {
    city: "Montreal",
    country: "Canada",
    phrase: "Canada",
    iconImg: "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437045/dmquvficldi8ssfdlrrx.jpg"
  },
  {
    city: "Porto",
    country: "Portugal",
    phrase: "Portugal",
    iconImg: "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436861/xrxhgsif3ekhxgn8irlm.jpg"
  },
  {
    city: "New York",
    country: "United States",
    phrase: "United States",
    iconImg: "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436912/xle8ueqxjeazbs4bp09p.jpg"
  },
  {
    city: "Barcelona",
    country: "Spain",
    phrase: "Popular beach destination",
    iconImg: "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436983/pivldxmrxssnhyzixhes.jpg"
  },
  {
    city: "Istanbul",
    country: "Turkey",
    phrase: "Turkey",
    iconImg: "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437241/wt0seud4ot4cmdrztdzz.jpg"
  },
  {
    city: "Hong Kong",
    country: "Hong Kong",
    phrase: "Hong Kong",
    iconImg: "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg"
  },
  {
    city: "Sydney",
    country: "Australia",
    phrase: "Australia",
    iconImg: "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436236/ctnbnqazpqhotjcauqwp.jpg"
  },
  {
    city: "Rio De Janeiro",
    country: "Brazil",
    phrase: "Brazil",
    iconImg: "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436582/vv0y7twjl7zcj9g71sjf.jpg"
  }
]

export function Anywhere({ selectedCity, onSelect }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredCities, setFilteredCities] = useState(cities)
    const [selected, setSelected] = useState(selectedCity ? selectedCity.city : '')
  
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
  
    return (
      <Box
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
              button
              selected={selected === city.city}
              onClick={() => handleSelectCity(city)}
              sx={{ borderRadius: 1 }}
            >
              <ListItemAvatar>
                <Avatar src={city.iconImg} alt={city.city} />
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
