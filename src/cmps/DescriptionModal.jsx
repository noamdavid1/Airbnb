export function DescriptionModal({ children, onClose }) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(ev) => ev.stopPropagation()}>
          <button className="btn-close" onClick={onClose}>✕</button>
          {children}
        </div>
      </div>
    )
  }
  