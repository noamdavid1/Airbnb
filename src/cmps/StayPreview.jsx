import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles
import { useSelector } from 'react-redux';
import { updateWishlist } from '../store/actions/user.actions';
import { useState } from 'react';
import SvgIcon from './SvgIcon';
import { LoginModal } from './LoginModal';
import { useSearchParams } from "react-router-dom";


export function StayPreview({ stay }) {

    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const [isModalOpen, setIsModalOpen] = useState(false)
    // let [searchParams, setSearchParams] = useSearchParams(); 


    // console.log(Object.fromEntries(searchParams))

    function isInWishlist(stayId) {
        if (loggedinUser && loggedinUser.wishlist && loggedinUser.wishlist.includes(stayId)) {
            return 'wishlist'
        }
        return ''
    }

    function onHeartClick(ev) {
        ev.stopPropagation()
        if (loggedinUser) {
            updateWishlist(stay._id)
        } else {
            setIsModalOpen(true)
        }
    }

    function onDotClick(ev) {
        console.log("onDotClick")
        ev.preventDefault()
    }

    const handleArrowClick = (e, clickHandler) => {
        e.stopPropagation(); // ✅ Stop propagation
        clickHandler(); // 📦 Still call the original arrow function
    }


    return (
        <article className={`stay-preview ${isInWishlist(stay._id)}`}>

            <Carousel onClickThumb={onDotClick} showStatus={false} showThumbs={false} useKeyboardArrows={false}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button
                            type="button"
                            onClick={(e) => handleArrowClick(e, onClickHandler)}
                            className="arrow arrow-prev"
                        >
                            <SvgIcon iconName={"arrow-left"} />  
                        </button>
                    )
                }

                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <button
                            type="button"
                            onClick={(e) => handleArrowClick(e, onClickHandler)}
                            className="arrow arrow-next"
                        >
                            <SvgIcon iconName={"arrow-right"} />
                        </button>
                    )
                }

            >
                <div><img src={stay.imgUrls[0]} alt="Slide 1" /></div>
                <div><img src={stay.imgUrls[1]} alt="Slide 2" /></div>
                <div><img src={stay.imgUrls[2]} alt="Slide 3" /></div>
                <div><img src={stay.imgUrls[3]} alt="Slide 4" /></div>
                <div><img src={stay.imgUrls[4]} alt="Slide 5" /></div>
            </Carousel>
            
            <span className='heart-svg-container' onClick={onHeartClick}>
                <SvgIcon iconName={"heart"} />
            </span>

            <div className='preview-info'>
                <div className='location'><span>{stay.loc.city}, {stay.loc.country}</span></div>
                <div className='roomType gray-class'>{stay.roomType}</div>
                <div><span>${stay.price.toLocaleString()} night</span> </div>

                <div className='star-svg-container'>
                    <span>
                        <SvgIcon iconName={"star"} />
                    </span>
                    <span>{Number.isInteger(stay.rating)? stay.rating.toFixed(1) : stay.rating}</span>
                </div>
            </div>

            <LoginModal show={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </article>
    )
}