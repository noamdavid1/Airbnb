import { useState, useEffect } from "react"
import { stayService } from "../services/stay/stay.service.local";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export function CategoryFilter({ filterBy, setFilterBy }) {
    const [typeCategory] = useState(stayService.getStayTypes())
    const [filterByCategory, setFilterByCategory] = useState({ ...filterBy })

    useEffect(() => {
        setFilterBy(filterByCategory)
    }, [filterByCategory]);


    function changeFilter(type) {
        setFilterByCategory((prevFilter) => ({
            ...prevFilter,
            category: type
        }));
    }
    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 6 },
        desktop: { breakpoint: { max: 1024, min: 768 }, items: 4 },
        tablet: { breakpoint: { max: 768, min: 464 }, items: 3 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
    };

    return (
        <section className="carrousel-filter">
            <Carousel responsive={responsive} infinite autoPlay={false} arrows>
                {typeCategory.map((type) => (
                    <div key={type} className="carrousel-item">
                        <button onClick={() => changeFilter(type)}>
                            <img src={`/filter by icon/${type}.jpg`} alt="" />
                            <span>{type}</span>
                        </button>
                    </div>
                ))}
            </Carousel>
        </section>
    );
}
