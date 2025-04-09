import { useState, useEffect } from "react"
import { stayService } from "../services/stay/stay.service.local";
// import { Carousel } from 'react-responsive-carousel';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
        allScreens: {
            breakpoint: { max: 3000, min: 0 },
            items: 14,
            slidesToSlide: 1,
        }
    };

    const CustomLeftArrow = ({ onClick }) => (
        <button onClick={onClick} className="custom-arrow left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              height: "12px",
              width: "12px",
              fill: "currentcolor",
            }}
          >
            <path d="m10.55.3 1.42 1.4L5.67 8l6.3 6.3-1.42 1.4-6.59-6.58a1.58 1.58 0 0 1-.1-2.13l.1-.11z" />
          </svg>
        </button>
      );
      
      const CustomRightArrow = ({ onClick }) => (
        <button onClick={onClick} className="custom-arrow right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              height: "12px",
              width: "12px",
              fill: "currentcolor",
            }}
          >
            <path d="M5.41.3 4 1.7 10.3 8 4 14.3l1.41 1.4 6.6-6.58c.57-.58.6-1.5.1-2.13l-.1-.11z" />
          </svg>
        </button>
      );      


    return (
        <section className="carrousel-filter">
            {/* <Carousel
                onClickThumb={(ev) => ev.preventDefault()}
                showStatus={false}
                showThumbs={false}
                showIndicators={false}
                useKeyboardArrows={true}
                // centerMode={true}
                centerSlidePercentage={100 / 14} // בדיוק 14 כפתורים
                showArrows={true}
                infiniteLoop={false}
                swipeable={true}
                emulateTouch={true}
                selectedItem={0}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button type="button" onClick={onClickHandler} className="custom-arrow left">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                style={{
                                    display: "block",
                                    height: "12px",
                                    width: "12px",
                                    fill: "currentcolor"
                                }}
                            >
                                <path d="m10.55.3 1.42 1.4L5.67 8l6.3 6.3-1.42 1.4-6.59-6.58a1.58 1.58 0 0 1-.1-2.13l.1-.11z" />
                            </svg>
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <button type="button" onClick={onClickHandler} className="custom-arrow right">
                            <svg
                                style={{
                                    display: "block",
                                    height: "12px",
                                    width: "12px",
                                    fill: "currentcolor"
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                            >
                                <path d="M5.41.3 4 1.7 10.3 8 4 14.3l1.41 1.4 6.6-6.58c.57-.58.6-1.5.1-2.13l-.1-.11z" />
                            </svg>
                        </button>
                    )
                }
            > */}
            <Carousel
                responsive={responsive}
                arrows={true}
                infinite={false}
                showDots={false}
                draggable={true}
                swipeable={true}
                keyBoardControl={true}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                containerClass="carousel-container"
                itemClass="carrousel-item"
            >
                {typeCategory.map((type) => (
                    <div key={type} className="carrousel-item">
                        <button onClick={() => changeFilter(type)}>
                            <img src={`/filter by icon/${type}.jpg`} alt={type} />
                            <span>{type}</span>
                        </button>
                    </div>
                ))}
            </Carousel>
        </section>
    );
}
