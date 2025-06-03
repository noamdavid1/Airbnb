import { useState } from 'react'
import { DescriptionModal } from './DescriptionModal'

export function StayDescription() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fullDescription = `
Our beautiful and artfully designed 2BR apartment is placed at the best location in Tel Aviv right near Ben Gurion Blvd. and about 4 min walk from the famous Gordon beach.

Around the block on Dizengoff or Ben Yehuda St. you'll find great restaurants, bars, cafes, galleries and basically everything TLV has to offer.

The apartment is fully equipped with electric appliances and everything you need for a great stay, whether it's short or long.

We are confident you will enjoy your stay with us!

The space
Freshly renovated and impeccably designed by leading local architects and artists, this boutique apartment is a gem. Natural materials, beautiful colors, abundant natural light, and attention to every detail make it a dream-worthy vacation home you won't want to leave!

- 2 Bedrooms (#1: Queen size bed; #2: Two single beds)
- Fully Equipped Chef's Kitchen
- Peaceful interior balcony
- Designated Workspace
- Smart TV, Fast Wifi
- Central Heating/AC controlled in every room
- Washing Machine / Dryer / Iron
- Dishwasher
- Surrounded by beautiful garden views from every window
- Chic, modern design with pieces from local artists and designers

Guest access
Every area of the apartment is accessible

Other things to note
Israeli or foreign nationals with work visa are required to add VAT on the amount.
  `

  const shortDescription = fullDescription.slice(0, 300)

  return (
    <section className="stay-description">
      <h2>About this space</h2>
      <p>{shortDescription}...</p>
      <button className="btn-show-more" onClick={() => setIsModalOpen(true)}>
        Show more
      </button>

      {isModalOpen && (
        <DescriptionModal onClose={() => setIsModalOpen(false)}>
          <section className="full-description-modal">
            <h2>About this space</h2>
            {fullDescription.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </section>
        </DescriptionModal>
      )}
    </section>
  )
}
