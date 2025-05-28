import { useEffect, useRef } from 'react'

export function UserMenu({ onClose }) {
	const menuRef = useRef()

	useEffect(() => {
		function handleClickOutside(event) {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				onClose()
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [onClose])

	return (
		<div className="user-menu" ref={menuRef}>
			<ul>
				<li>Help Center</li>
				<hr />
				<li>Become a Host</li>
				<hr />
				<li>Refer a Host</li>
                <li>Find a co-host</li>
                <li>Gift cards</li>
				<hr />
				<li>Log in or Sign up</li>
			</ul>
		</div>
	)
}