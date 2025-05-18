import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay, addStayMsg } from '../store/actions/stay.actions'
import { StayImgs } from '../cmps/StayImgs'
import { StayAmenities } from '../cmps/StayAmenities'
import { removeReview } from '../store/actions/review.actions'
import { ReviewList } from '../cmps/ReviewList'
import SvgIcon from '../cmps/SvgIcon'
import { updateWishlist } from '../store/actions/user.actions'
import { LoginModal } from '../cmps/LoginModal'


export function StayDetails() {

  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)
  const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
  const [isModalOpen, setIsModalOpen] = useState(false)


  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  function isInWishlist(stayId) {
    if (loggedinUser && loggedinUser.wishlist) {
      return loggedinUser.wishlist.includes(stayId)
    }
    return false
  }

  async function onAddStayMsg(stayId) {
    try {
      await addStayMsg(stayId, 'bla bla ' + parseInt(Math.random() * 10))
      showSuccessMsg(`Stay msg added`)
    } catch (err) {
      showErrorMsg('Cannot add stay msg')
    }

  }

  async function onRemoveReview(reviewId) {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  function onHeartClick(ev) {
    if (loggedinUser) {
      updateWishlist(stay._id)
    } else {
      setIsModalOpen(true)
    }
  }

  const isWishlist = isInWishlist(stayId)
  return (
    stay && <section className={`stay-details ${isWishlist ? 'wishlist' : ''}`}>
      <Link to="/">Back to list</Link>
      <div className='title'>
        <h1>{stay.name}</h1>
        <div className='heart-svg-container' onClick={onHeartClick}>
          <SvgIcon iconName={"heart"} />
          {isWishlist ? 'Saved' : 'Save'}
        </div>
      </div>

      <StayImgs stay={stay} />
      <div>{stay.roomType} in {stay.loc.address}</div>
      <div className='stay-info'>
        <div>{stay.bedrooms} bedrooms</div> *
        <div>{stay.bathrooms} bathrooms</div> *
      </div>

      <StayAmenities stayAmenities={stay.amenities} />

      <ReviewList
        reviews={stay.reviews}
        onRemoveReview={onRemoveReview} />

      {stay && <div>
        <h3>{stay.vendor}</h3>
        <h4>${stay.price}</h4>
        <pre> {JSON.stringify(stay, null, 2)} </pre>
      </div>
      }
      <button onClick={() => { onAddStayMsg(stay._id) }}>Add stay msg</button>
      <LoginModal show={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}