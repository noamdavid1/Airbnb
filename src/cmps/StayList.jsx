
import { StayPreview } from './StayPreview'

export function StayList({ stays, onDisplayStay, onRemoveStay, onUpdateStay }) {
    

    return <section>
        <ul className="stay-list">
            {stays && stays.map(stay =>
                <li key={stay._id} onClick={() => onDisplayStay(stay)}>
                    <StayPreview stay={stay}/>
                    {/* {<div className="actions">
                        <button onClick={() => onUpdateStay(stay)}>Edit</button>
                        <button onClick={() => onRemoveStay(stay._id)}>x</button>
                    </div>} */}
                </li>)
            }
        </ul>
    </section>
}