
import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ reviews, onRemoveReview }) {
    // console.log(reviews);
    
    return <section>
        {reviews && reviews.length ? <ul className="list review-list">
            {reviews.map(review =>
                <li key={review.reviewId}>
                    <ReviewPreview review={review}/>
                    {<div className="actions">
                        <button onClick={() => onRemoveReview(review.reviewId)}>x</button>
                    </div>}
                </li>)
            }
        </ul> 
        :
        <div>No reviews (yet)</div>}

    </section>
}