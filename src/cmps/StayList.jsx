
import { StayPreview } from './StayPreview'

export function StayList({ stays, onRemoveStay, onUpdateStay }) {
    

    return <section>
        <ul className="list">
            {stays && stays.map(stay =>
                <li key={stay._id}>
                    <StayPreview stay={stay}/>
                    {<div className="actions">
                        <button onClick={() => onUpdateStay(stay)}>Edit</button>
                        <button onClick={() => onRemoveStay(stay._id)}>x</button>
                    </div>}
                </li>)
            }
        </ul>
    </section>
}