import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay, addStayMsg, removeStay, removeStayReview } from '../store/actions/stay.actions'
import { StayImgs } from '../cmps/StayImgs'
import { StayAmenities } from '../cmps/StayAmenities'
import { removeReview } from '../store/actions/review.actions'
import { ReviewList } from '../cmps/ReviewList'
import { StayOrder } from '../cmps/StayOrder'
import SvgIcon from '../cmps/SvgIcon'
import { updateWishlist } from '../store/actions/user.actions'
import { LoginModal } from '../cmps/LoginModal'
import { StayDescription } from '../cmps/StayDescription'
import { MiniUser } from '../cmps/MiniUser'


export function StayDetails() {

  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)
  const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const orderRef = useRef()
  const reviewsRef = useRef()


  useEffect(() => {
    loadStay(stayId)
  }, [stayId])


  // useEffect(() => {
  //   const handleScroll = () => {
  //     const orderEl = orderRef.current
  //     if (!orderEl) return

  //     const scrollY = window.scrollY
  //     const startY = 400
  //     const maxY = document.body.scrollHeight - 800

  //     if (scrollY < startY) {
  //       orderEl.style.transform = `translateY(0px)`
  //     } else if (scrollY < maxY) {
  //       orderEl.style.transform = `translateY(${scrollY - startY}px)`
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  useEffect(() => {
    const orderEl = orderRef.current
    const reviewsEl = reviewsRef.current
    if (!orderEl || !reviewsEl) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const startY = 400
      const reviewsY = reviewsEl.getBoundingClientRect().top + window.scrollY
      const maxY = reviewsY - orderEl.offsetHeight - 210
      if (scrollY < startY) {
        orderEl.style.transform = `translateY(0px)`
      } else if (scrollY < maxY) {
        orderEl.style.transform = `translateY(${scrollY - startY}px)`
      } else {
        orderEl.style.transform = `translateY(${maxY - startY}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function isInWishlist(stayId) {
    if (loggedinUser && loggedinUser.wishlist) {
      return loggedinUser.wishlist.includes(stayId)
    }
    return false
  }

  // async function onAddStayMsg(stayId) {
  //   try {
  //     await addStayMsg(stayId, 'bla bla ' + parseInt(Math.random() * 10))
  //     showSuccessMsg(`Stay msg added`)
  //   } catch (err) {
  //     showErrorMsg('Cannot add stay msg')
  //   }

  // }

  async function onRemoveReview(reviewId) {
    try {
      console.log({ stayId }, { reviewId });

      await removeStayReview(stayId, reviewId)
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
      {/* <Link to="/">Back to list</Link> */}
      <div className='title'>
        <h1>{stay.name}</h1>
        <div className='title-actions'>
          <div className='share-btn'>
            <SvgIcon iconName={"share"} />
            Share
          </div>
          <div className='heart-svg-container' onClick={onHeartClick}>
            <SvgIcon iconName={"heart"} />
            {isWishlist ? 'Saved' : 'Save'}
          </div>
        </div>
      </div>

      <StayImgs stay={stay} />

      <div className="stay-details-layout">
        <div className="stay-info-left">
          <div className='simple-details'>
            <div className='saty-loc'>{stay.roomType} in {stay.loc.address}</div>
            <div className='stay-info'>
              {stay.bedrooms} bedrooms · {stay.bathrooms} bathrooms
            </div>
            <div className='raiting-info'>
              <div className='star-svg'><SvgIcon iconName={"star2"} /></div>
              <span className='rating'>{Number.isInteger(stay.rating) ? stay.rating.toFixed(1) : stay.rating} ·{'\u00A0'}</span>
              <span className='review-count'>{stay.reviews.length} reviews</span>
            </div>
          </div>
          <hr className="divider" />
          <div className="host-details">
            <MiniUser miniUser={stay.host} namePrefix={"Hosted by"}>
              <>
                {stay.host.superhost &&
                  <p>
                    Superhost ·
                  </p>
                }
                <p> 7 years hosting</p>
              </>
            </MiniUser>
          </div>
          <hr className="divider2" />

          <div className='div2row'>
            <SvgIcon iconName={"key"} />
            <div className='div2-style'>
              <h3>great check-in experience</h3>
              <p>Recent guests loved the smooth start to this stay.</p>
            </div>
          </div>
          <div className='div2row'>
            <SvgIcon iconName={"coffee"} />
            <div className='div2-style'>
              <h3>At-home coffee</h3>
              <p>Start your morning right with the espresso machine.</p>
            </div>
          </div>
          <div className='div2row'>
            <SvgIcon iconName={"cancellation"} />
            <div className='div2-style'>
              <h3>Free cancellation before Nov 6</h3>
              <p>Get a full refund if you change your mind.</p>
            </div>
          </div>
          <hr className="divider3" />

          <StayDescription fullDescription={stay.summary} />


          <hr className="divider2" />
          <StayAmenities stayAmenities={stay.amenities} />
        </div>

        <div className="stay-info-right" ref={orderRef}>
          <StayOrder stay={stay} />
        </div>
      </div>
      {/* <hr className="divider4" /> */}
      <div ref={reviewsRef}>
        <ReviewList
          reviews={stay.reviews}
          onRemoveReview={onRemoveReview}
          stay={stay}
        />
      </div>

      <LoginModal show={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </section>
  )
}