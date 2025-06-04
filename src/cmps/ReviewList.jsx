
import { useState } from 'react';
import { ReviewPreview } from './ReviewPreview.jsx';
import SvgIcon from './SvgIcon.jsx';

// export function ReviewList({ reviews, onRemoveReview }) {
    
//     return <section>
//         {reviews && reviews.length ? <ul className="list review-list">
//             <div className='raiting-list'>
//               <div className='star-list-svg'><SvgIcon iconName={"star3"} /></div>
//               <span className='rating'>{Number.isInteger(stay.rating) ? stay.rating.toFixed(1) : stay.rating} · </span>
//               <span className='review-count'> {stay.reviews.length} reviews</span>
//             </div>
//             <hr className='hr-reviewlist'/>
//             {reviews.map(review =>
//                 <li key={review._id}>
//                     <ReviewPreview review={review}/>
//                     {<div className="actions">
//                         <button onClick={() => onRemoveReview(review._id)}>x</button>
//                     </div>}
//                 </li>)
//             }
//         </ul> 
//         :
//         <div>No reviews (yet)</div>}

//     </section>
// }



export function ReviewList({ reviews, onRemoveReview, stay }) {
    const [showAll, setShowAll] = useState(false);
    const visibleReviews = showAll ? reviews : reviews.slice(0, 6); 

    return (
        <section className="review-section">
            <hr className='hr-reviewlist'/>
            {reviews && reviews.length ? (
                <>
                    <div className='rating-header'>
                        <div className='star-list-svg'><SvgIcon iconName={"star3"} /></div>
                        <span className='rating'>
                            {Number.isInteger(stay.rating) ? stay.rating.toFixed(1) : stay.rating} ·
                        </span>
                        <span className='review-count'> {stay.reviews.length} reviews</span>
                    </div>

                    <hr className='hr-reviewlist'/>

                    <ul className="review-list">
                        {visibleReviews.map(review => (
                            <li key={review.reviewId}>
                                <ReviewPreview review={review} />
                                <div className="actions">
                                    <button onClick={() => onRemoveReview(review.reviewId)}>x</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {!showAll && reviews.length > 6 && (
                        <button className="show-more-btn" onClick={() => setShowAll(true)}>
                            Show more reviews
                        </button>
                    )}
                </>
            ) : (
                <div>No reviews (yet)</div>
            )}
        </section>
    );
}
