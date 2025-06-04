import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { logout } from '../store/actions/user.actions';
import { LoginModal } from './LoginModal';
import { useNavigate } from 'react-router-dom';
import SvgIcon from './SvgIcon';

export function UserMenu({ onClose }) {

	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

	const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
	const menuRef = useRef()
	const navigate = useNavigate()

	// useEffect(() => {
	// 	function handleClickOutside(event) {
	// 		if (menuRef.current && !menuRef.current.contains(event.target)) {
	// 			onClose()
	// 		}
	// 	}
	// 	document.addEventListener('mousedown', handleClickOutside)
	// 	return () => {
	// 		document.removeEventListener('mousedown', handleClickOutside)
	// 	}
	// }, [onClose])

	const handleLoginClick = () => {
		setIsLoginModalOpen(true)
	}

	async function onLogout() {
		try {
			await logout()
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}


	async function onLogout() {
		console.log('logout');
		try {
			logout()
			navigate('/')
		} catch (err) {
			console.log('can not logout');
		}
	}


	function onWishlistsClick() {
		navigate('/wishlist')
		onClose()
	}

	function onHostOrdersClick() {
		navigate('/hosting/order')
		onClose()
	}

	function onGuestOrdersClick() {
		navigate('/trips')
		onClose()
	}

	return (
		// <div className="user-menu" ref={menuRef}>
		// 	<ul>
		// 		<li>Help Center</li>
		// 		<hr />
		// 		<li>Become a Host</li>
		// 		<hr />
		// 		<li>Refer a Host</li>
		//         <li>Find a co-host</li>
		//         <li>Gift cards</li>
		// 		<hr />
		// 		<li>Log in or Sign up</li>
		// 	</ul>
		// </div>
		<div class="dropdown-menu" id="dropdownMenu">
			<ul>
				{!loggedinUser && <li onClick={handleLoginClick}>Log in or sign up</li>}
				{loggedinUser && (
					<>	<li onClick={onWishlistsClick}>
						<SvgIcon className="wishlist-menu" iconName={"heart-wishlist"} />
						Wishlists
					</li>
						<li onClick={onGuestOrdersClick}>
							<SvgIcon className="wishlist-menu" iconName={"trips-wishlist"} />
							Trips
						</li>
						<li onClick={onGuestOrdersClick}>
							<SvgIcon className="wishlist-menu" iconName={"messages-wishlist"} />
							Messages
						</li>
						<li onClick={onGuestOrdersClick}>
							<SvgIcon className="wishlist-menu" iconName={"profile-wishlist"} />
							Profile
						</li>
						<li onClick={onHostOrdersClick}>View Orders</li>
						<hr />
						<li onClick={onLogout}>Log out</li>
					</>)}
				<LoginModal show={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
			</ul>
		</div>
	)
}