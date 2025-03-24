
import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ reviews, onRemoveReview }) {
    
    return <section>
        <ul className="list review-list">
            {reviews.map(review =>
                <li key={review._id}>
                    <ReviewPreview review={review}/>
                    {<div className="actions">
                        <button onClick={() => onRemoveReview(review._id)}>x</button>
                    </div>}
                </li>)
            }
        </ul>
    </section>
}