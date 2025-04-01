import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles

export function StayPreview({ stay }) {


    function onDotClick(ev) {
        console.log("onDotClick")
        ev.preventDefault()
    }

    return <article className="stay-preview">

        <Carousel onClickThumb={onDotClick} showStatus={false} showThumbs={false} useKeyboardArrows={false}>
            <div><img src={stay.imgUrls[0]} alt="Slide 1" /></div>
            <div><img src={stay.imgUrls[1]} alt="Slide 2" /></div>
            <div><img src={stay.imgUrls[2]} alt="Slide 3" /></div>
            <div><img src={stay.imgUrls[3]} alt="Slide 4" /></div>
            <div><img src={stay.imgUrls[4]} alt="Slide 5" /></div>
        </Carousel>
        {/* <img src={stay.imgUrls[0]} /> */}
        <header>
            <Link to={`/stay/${stay._id}`}>{stay.vendor}</Link>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
                aria-hidden="true" role="presentation"
                focusable="false" 
                style={{
                    display: 'block',
                    fill: 'rgba(0, 0, 0, 0.5)',
                    height: '24px',
                    width: '24px',
                    stroke: 'var(--linaria-theme_palette-icon-primary-inverse)',
                    strokeWidth: 2,
                    overflow: 'visible',
                  }}
                className="">
                <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z" className="">
                </path>
            </svg> */}
        </header>
        <h1><span>{stay.loc.city}, {stay.loc.country}</span></h1>
        <h2>{stay.roomType}</h2>
        <p><span>${stay.price.toLocaleString()}</span> night</p>
    </article>
}