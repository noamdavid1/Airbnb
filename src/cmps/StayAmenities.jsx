import { useEffect } from "react"

export function StayAmenities({ stayAmenities }) {

    const amenitiesToShow = stayAmenities.slice(0, 10)

    // useState

    // useEffect(() => {
    //     amenitiesToShow = 
    //     console.log({amenitiesToShow});
        
    // }, [])
    function onDisplayAllAmenities() {
        
    }

    return <section className="stay-amenities">

        <h2>What this place offers</h2>

        <ul className="stay-amenities-list">
            {amenitiesToShow && amenitiesToShow.length && amenitiesToShow.map(amenity =>
                <li>
                    {amenity}
                </li>)
            }
        </ul>

        <h2 onClick={onDisplayAllAmenities}>Show all {stayAmenities.length} amenities</h2>
    </section>
}