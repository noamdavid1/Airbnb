export function StayImgs({ stay }) {


    return stay && <section className="stay-imgs">

        <img className="stay-img img1" src={stay.imgUrls[0]} alt="Slide 1" />
        <img className="stay-img img2" src={stay.imgUrls[1]} alt="Slide 2" />
        <img className="stay-img img3" src={stay.imgUrls[2]} alt="Slide 3" />
        <img className="stay-img img4" src={stay.imgUrls[3]} alt="Slide 4" />
        <img className="stay-img img5" src={stay.imgUrls[4]} alt="Slide 5" />

    </section>
}