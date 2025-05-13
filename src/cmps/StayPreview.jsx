import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles
import { stayPreviewSvgs } from './Svgs';

export function StayPreview({ stay }) {

    
    function onDotClick(ev) {
        console.log("onDotClick")
        ev.preventDefault()
    }

    return (
        <article className="stay-preview">

            <Carousel onClickThumb={onDotClick} showStatus={false} showThumbs={false} useKeyboardArrows={false}
            // renderArrowPrev={(clickHandler, hasPrev) => {
            //     return (
            //       <div
            //         className={`${
            //           hasPrev ? "absolute" : "hidden"
            //         } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
            //         onClick={clickHandler}
            //       >
            //         <div className="w-9 h-9 text-white" >{'<'}</div>
            //         {/* <LeftIcon className="w-9 h-9 text-white" /> */}
            //       </div>
            //     );
            //   }}
            //   renderArrowNext={(clickHandler, hasNext) => {
            //     return (
            //       <div
            //         className={`${
            //           hasNext ? "absolute" : "hidden"
            //         } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
            //         onClick={clickHandler}
            //       >
            //         {/* <RightIcon className="w-9 h-9 text-white" /> */}
            //         <div className="w-9 h-9 text-white" >{'>'}</div>
            //       </div>
            //     );
            //   }}

            >
                <div><img src={stay.imgUrls[0]} alt="Slide 1" /></div>
                <div><img src={stay.imgUrls[1]} alt="Slide 2" /></div>
                <div><img src={stay.imgUrls[2]} alt="Slide 3" /></div>
                <div><img src={stay.imgUrls[3]} alt="Slide 4" /></div>
                <div><img src={stay.imgUrls[4]} alt="Slide 5" /></div>
            </Carousel>
            {/* <img src={stay.imgUrls[0]} /> */}
            <span className='heart-svg-container'>
                {stayPreviewSvgs.heart}
            </span>

            <div className='preview-info'>
                <div className='location'><span>{stay.loc.city}, {stay.loc.country}</span></div>
                <div className='roomType gray-class'>{stay.roomType}</div>
                <div><span>${stay.price.toLocaleString()} night</span> </div>

                <div className='star-svg-container'>
                    <span>{stayPreviewSvgs.star}</span>
                    <span>{Number.isInteger(stay.rating)? stay.rating.toFixed(1) : stay.rating}</span>
                </div>
            </div>
        </article>
    )
}