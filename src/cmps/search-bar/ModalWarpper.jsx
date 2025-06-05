export function ModalWrapper({ type, children }) {
    return (
        <section className={`modal-wrapper ${type}`}>{children}</section>
    )
}