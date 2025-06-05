import { useState } from 'react'
import { DescriptionModal } from './DescriptionModal'

export function StayDescription({fullDescription}) {
  const [isModalOpen, setIsModalOpen] = useState(false)


  const shortDescription = fullDescription.slice(0, 300)

  return (
    <section className="stay-description">
      <h2>About this place</h2>
      <p>{shortDescription}...</p>
      <button className="btn-show-more" onClick={() => setIsModalOpen(true)}>
        Show more
      </button>

      {isModalOpen && (
        <DescriptionModal onClose={() => setIsModalOpen(false)}>
          <section className="full-description-modal">
            <h2>About this place</h2>
            {fullDescription.split('\n\n').map((paragraph, idx) => (
              <p className='description-txt' key={idx}>{paragraph}</p>
            ))}
          </section>
        </DescriptionModal>
      )}
    </section>
  )
}
