export function StayImgs({ stay }) {
    return stay && (
        <section className="stay-imgs">
            <img className="stay-img img1" src={stay.imgUrls[0]} alt="Main" />
            <div className="stay-imgs-right">
                <img className="stay-img img2" src={stay.imgUrls[1]} alt="2" />
                <img className="stay-img img3" src={stay.imgUrls[2]} alt="3" />
                <img className="stay-img img4" src={stay.imgUrls[3]} alt="4" />
                <img className="stay-img img5" src={stay.imgUrls[4]} alt="5" />
            </div>
        </section>
    )
}