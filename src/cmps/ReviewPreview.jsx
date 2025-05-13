import { Link } from 'react-router-dom'
import { convertDateToTxt } from '../services/util.service'

export function ReviewPreview({ review }) {
    const { byUser, aboutUser } = review

    return <article className="preview review-preview">
        {/* <p>About: <Link to={`/user/${aboutUser._id}`}>{aboutUser.fullname}</Link></p>
        <p className="review-by">By: <Link to={`/user/${byUser._id}`}>{byUser.fullname}</Link></p>
        <p className="review-txt">{review.txt}</p> */}
        <p className="review-by">{review.by.fullname}</p>
        <p>{convertDateToTxt(review.at)}</p>
        <p>Review: {review.txt}</p>
    </article>
}