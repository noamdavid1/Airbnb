export function MiniUser({ miniUser, namePrefix, children }) {

    if (!miniUser) return <div>loading..</div>

    return (
        <div className="mini-user-preview">
            <img src={miniUser.imgUrl} alt="User" className="avatar" />
            <div className="user-info">
                <h4 className="fullname"><span>{namePrefix}</span> {miniUser.fullname}</h4>
                <h4 className="user-extra-info">{children}</h4>
            </div>
        </div>
    )
}