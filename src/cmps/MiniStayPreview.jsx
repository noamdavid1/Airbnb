export function MiniStayPreview({ stay }) {

    if (!stay) return <div>loading..</div>

    return (
        <article className={'mini-stay-preview'}>
            <h2>{stay.loc?.city}</h2>
            <img src={stay.imgUrls[0]} alt="Slide 1" />
        </article>
    )
}