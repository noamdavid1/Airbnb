import { Link } from 'react-router-dom'
import { convertDateToTxt } from '../services/util.service'
import { MiniUser } from './MiniUser'
import SvgIcon from './SvgIcon'

export function ReviewPreview({ review }) {
    // const { byUser, aboutUser } = review
    const { by } = review

    return <article className="preview review-preview">
        {/* <p>About: <Link to={`/user/${aboutUser._id}`}>{aboutUser.fullname}</Link></p>
        <p className="review-by">By: <Link to={`/user/${byUser._id}`}>{byUser.fullname}</Link></p>
        <p className="review-txt">{review.txt}</p> */}
        <div className='review-header'>
            <p className="review-by">
                <MiniUser miniUser={by} />
            </p>
            <div className='review-info'>
                <div className="star-row">
                    {[...Array(5)].map((_, idx) => (
                        <SvgIcon iconName={'review-star'} key={idx} />
                    ))}
                </div>
                <div>·</div>
                {/* <SvgIcon iconName={'review-star'}/> */}
                <p className='review-date'>{convertDateToTxt(review.at)}</p>
            </div>
        </div>

        <p className='review-txt'>{review.txt}</p>
    </article>
}