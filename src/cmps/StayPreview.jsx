import { Link } from 'react-router-dom'

export function StayPreview({ stay }) {
    return <article className="preview">
        <img src={stay.imgUrls[0]}/>
        <header>
            <Link to={`/stay/${stay._id}`}>{stay.vendor}</Link>
        </header>
        <h1>{stay.name}</h1>
        <p>Price: <span>{stay.price.toLocaleString()} Km/h</span></p>
        {stay.host && <p>Host: <span>{stay.host.fullname}</span></p>}
    </article>
}