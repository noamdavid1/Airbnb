import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay, addStayMsg } from '../store/actions/stay.actions'
import { StayImgs } from '../cmps/StayImgs'
import { StayAmenities } from '../cmps/StayAmenities'
import { removeReview } from '../store/actions/review.actions'
import { ReviewList } from '../cmps/ReviewList'


export function StayDetails() {

  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

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

  return (
    stay && <section className="stay-details">
      <Link to="/">Back to list</Link>
      <h1>{stay.name}</h1>


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

    </section>
  )
}