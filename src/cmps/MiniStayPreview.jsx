export function MiniStayPreview({ miniStay }) {

    if (!miniStay) return <div>loading..</div>

    return (
        <div className="mini-stay-preview">
            <img src={miniStay.imgUrls[0]} alt={miniStay.name} />
            <div className="stay-info">
                <h4>{miniStay.name}</h4>
                <p>{miniStay.city}, {miniStay.country}</p>
            </div>
        </div>
    )
}