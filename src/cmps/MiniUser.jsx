export function MiniUser({ miniUser }) {

    if (!miniUser) return <div>loading..</div>

    return (
        <div className="mini-user-preview">
            <img src={miniUser.imgUrl} alt="User" className="avatar" />
            <div className="user-info">
                <h4>{miniUser.fullname}</h4>
            </div>
        </div>
    )
}