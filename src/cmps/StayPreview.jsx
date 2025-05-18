import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles
import { useSelector } from 'react-redux';
import { updateWishlist } from '../store/actions/user.actions';
import { useState } from 'react';
import SvgIcon from './SvgIcon';
import { LoginModal } from './LoginModal';



export function StayPreview({ stay }) {

    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const [isModalOpen, setIsModalOpen] = useState(false)

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

    //  const renderArrowPrev = (onClickHandler, hasPrev, label) =>
    //     hasPrev && (
    //       <button
    //         type="button"
    //         onClick={onClickHandler}
    //         title={label}
    //         className="custom-arrow left"
    //       >
    //         {/* Your SVG icon */}
    //         <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    //           <circle cx="12" cy="12" r="12" fill="#ddd" />
    //           <path d="M14 16l-4-4 4-4" stroke="#000" strokeWidth="2" fill="none" />
    //         </svg>
    //       </button>
    //     );

    //   const renderArrowNext = (onClickHandler, hasNext, label) =>
    //     hasNext && (
    //       <button
    //         type="button"
    //         onClick={onClickHandler}
    //         title={label}
    //         className="custom-arrow right"
    //       >
    //         {/* Your SVG icon */}
    //         <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    //           <circle cx="12" cy="12" r="12" fill="#ddd" />
    //           <path d="M10 8l4 4-4 4" stroke="#000" strokeWidth="2" fill="none" />
    //         </svg>
    //       </button>
    //     );
    // const MyCarousel = () => {
    const handleArrowClick = (e, clickHandler) => {
        e.stopPropagation(); // ✅ Stop propagation
        clickHandler(); // 📦 Still call the original arrow function
    };




    return (
        <article className={`stay-preview ${isInWishlist(stay._id)}`}>

            <Carousel onClickThumb={onDotClick} showStatus={false} showThumbs={false} useKeyboardArrows={false}
                //                   renderArrowPrev={renderArrowPrev}
                //   renderArrowNext={renderArrowNext}
                // renderArrowPrev={(clickHandler, hasPrev) => {
                //     return (
                //         <div
                //             className={`${hasPrev ? "absolute" : "hidden"
                //                 } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                //             onClick={clickHandler}
                //         >
                //             <div className="w-9 h-9 text-white" >{'<'}</div>
                //             {/* <LeftIcon className="w-9 h-9 text-white" /> */}
                //         </div>
                //     );
                // }}

                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button
                            type="button"
                            onClick={(e) => handleArrowClick(e, onClickHandler)}
                            className="control-arrow control-prev"
                            style={{ backgroundColor: 'white', color: 'red', 'text-align': 'center' }}
                        // 
                        >
                            ‹
                        </button>
                    )
                }

                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <button
                            type="button"
                            onClick={(e) => handleArrowClick(e, onClickHandler)}
                            className="control-arrow control-next"
                        >
                            ›
                        </button>
                    )
                }

            // renderArrowNext={(clickHandler, hasNext) => {
            //     return (
            //         <div
            //             className={`${hasNext ? "absolute" : "hidden"
            //                 } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
            //             onClick={clickHandler}
            //         >
            //             {/* <RightIcon className="w-9 h-9 text-white" /> */}
            //             <div className="w-9 h-9 text-white" >{'>'}</div>
            //         </div>
            //     );
            // }}

            >
                <div><img src={stay.imgUrls[0]} alt="Slide 1" /></div>
                <div><img src={stay.imgUrls[1]} alt="Slide 2" /></div>
                <div><img src={stay.imgUrls[2]} alt="Slide 3" /></div>
                <div><img src={stay.imgUrls[3]} alt="Slide 4" /></div>
                <div><img src={stay.imgUrls[4]} alt="Slide 5" /></div>
            </Carousel>
            {/* <img src={stay.imgUrls[0]} /> */}
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