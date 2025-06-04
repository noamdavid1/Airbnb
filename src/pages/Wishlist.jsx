import { useEffect } from "react"
import { StayList } from "../cmps/StayList"
import { loadStays } from "../store/actions/stay.actions"
import { useSelector } from "react-redux"

export function Wishlist() {

    const stays = useSelector(storeState => storeState.stayModule.stays)
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

    useEffect(() => {
        console.log("loggedinUser.wishlist", loggedinUser.wishlist);

        const filterBy = {
            // wishlist: loggedinUser.wishlist
            wishlist: true
        }
        loadStays(filterBy)
    }, [])


    return (
        <main className="wishlist">
            <header>
                <h2>Wishlists</h2>
            </header>
            <StayList stays={stays} />
        </main>
    )
}
