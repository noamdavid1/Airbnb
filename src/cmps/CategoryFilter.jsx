import { stayService } from "../services/stay/stay.service.local";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from 'react-router-dom'
import SvgIcon from './SvgIcon'

export function CategoryFilter({ filterBy }) {
  const typeCategory = stayService.getStayCategories()
  const navigate = useNavigate()


  function changeFilter(type) {
    const newFilter = { ...filterBy, category: type }
    const params = new URLSearchParams()
    for (const key in newFilter) {
      if (newFilter[key]) params.set(key, newFilter[key])
    }
    navigate({ search: params.toString() }) // StayIndex תעדכן את filterBy
  }

  // function changeFilter(type) {
  //     const newFilter = {
  //         ...filterBy,
  //         category: type
  //     }
  //     setFilterBy(newFilter)
  // }

  const responsive = {
    allScreens: {
      breakpoint: { max: 3000, min: 0 },
      items: 14,
      slidesToSlide: 1,
    }
  };

  const CustomLeftArrow = ({ onClick }) => (
    <button onClick={onClick} className="custom-arrow left">
      <SvgIcon iconName={"arrowLeft"} />
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button onClick={onClick} className="custom-arrow right">
      <SvgIcon iconName={"arrowRight"} />
    </button>
  );


  return (
    <section className="carrousel-filter">
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
