import { useEffect } from "react"
import SvgIcon from "./SvgIcon"

export function StayAmenities({ stayAmenities }) {

    const amenitiesToShow = stayAmenities.slice(0, 10)

    // useState

    // useEffect(() => {
    //     amenitiesToShow = 
    //     console.log({amenitiesToShow});

    // }, [])
    function onDisplayAllAmenities() {

    }

    // function mapAmenityToIcon(amenity) {
    //     const map = {
    //       'Wifi': 'wifi',
    //       'TV': 'tv',
    //       'Kitchen': 'kitchen',
    //       'Air conditioning': 'ac',
    //       'Heating': 'heating',
    //       'Washer': 'washer',
    //       'Dryer': 'dryer',
    //       'Free parking': 'parking',
    //       'Pool': 'pool',
    //       'Hot tub': 'hot-tub',
    //     }
      
    //     return map[amenity] || 'default-icon' 
    //   }


    


    return <section className="stay-amenities">

        <h2>What this place offers</h2>

        {/* <ul className="stay-amenities-list">
            {amenitiesToShow && amenitiesToShow.length && amenitiesToShow.map(amenity =>
                <li>
                    {amenity}
                </li>)
            }
        </ul> */}
        <ul className="stay-amenities-list">
            {amenitiesToShow && amenitiesToShow.length && amenitiesToShow.map((amenity, idx) =>
                <li key={idx} className="amenity-item">
                    <SvgIcon iconName={amenity} />
                    <span>{amenity}</span>
                </li>
            )}
        </ul>

        <h4 onClick={onDisplayAllAmenities}>Show all {stayAmenities.length} amenities</h4>
    </section>
}