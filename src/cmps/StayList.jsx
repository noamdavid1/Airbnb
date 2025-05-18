
import { useNavigate } from 'react-router-dom';
import { StayPreview } from './StayPreview'

export function StayList({ stays, onRemoveStay, onUpdateStay }) {
    
    const navigate = useNavigate()

    function onDisplayStay(stay) {        
        navigate(`/stay/${stay._id}`)
    }

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