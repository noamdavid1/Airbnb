import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/img/newLogo.jpeg';
import { SearchBar } from './search-bar/SearchBar'
import { SearchBarScroll } from './search-bar/SearchBarScroll';

// import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { login, logout, signup } from '../store/actions/user.actions';
import { LoginSignup } from './LoginSignup';
import SvgIcon from './SvgIcon';
import { LoginModal } from './LoginModal';

export function AppHeader() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const [initialModalType, setInitialModalType] = useState('')
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

	const menuRef = useRef(null)
	const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
	const navigate = useNavigate()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
			if (window.scrollY <= 50) setIsExpanded(false)
		}

		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		}

		document.addEventListener('click', handleClickOutside)
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
			document.removeEventListener('click', handleClickOutside);
		}
	}, [])

	const handleExpandSearch = (type = '') => {
		setInitialModalType(type)
		setIsExpanded(true)
	}

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev)
	}

	async function onLogout() {
		try {
			await logout()
			// navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	// async function onLogin(credentials) {
	// 	console.log(credentials)
	// 	try {
	// 		login(credentials)
	// 		// setLoggedinUser(user)
	// 	} catch (err) {
	// 		console.log('Cannot login :', err)
	// 		showErrorMsg(`Cannot login`)
	// 	}
	// }

	// async function onSignup(credentials) {
	// 	console.log(credentials)
	// 	try {
	// 		signup(credentials)
	// 		// setLoggedinUser(user)
	// 		showSuccessMsg(`Welcome ${user.fullname}`)
	// 	} catch (err) {
	// 		console.log('Cannot signup :', err)
	// 		showErrorMsg(`Cannot signup`)
	// 	}
	// 	// add signup
	// }

	async function onLogout() {
		console.log('logout');
		try {
			logout()
			navigate('/')
			// setLoggedinUser(null)
		} catch (err) {
			console.log('can not logout');
		}
		// add logout
	}

	// console.log({ loggedinUser });

	function onWishlistsClick() {
		navigate('/wishlist')
	}

	function onHostOrdersClick() {
		navigate('/hosting/order')
	}

	function onGuestOrdersClick() {
		navigate('/trips')
	}

	const handleLoginClick = () => {
		setIsLoginModalOpen(true)
	}

	function getFirstLetterUpper(string) {
		if (!string) return '';
		return string.charAt(0).toUpperCase();
	}

	return (
		<header className="app-header full">
			<nav className="header-nav main-container">
				<div className="header-left">
					<NavLink to="/" className="logo">
						<img src={logo} alt="app logo" />
					</NavLink>
				</div>

				<div className="header-center">
					{isScrolled && !isExpanded ? (
						<SearchBarScroll onExpandSearch={handleExpandSearch} />
					) : (
						<SearchBar initialModalType={initialModalType} />
					)}
				</div>

				<div className="header-right">

					<div className="menu-wrapper" ref={menuRef}>
						{loggedinUser && <button className='loggedinUser-button'>
							{getFirstLetterUpper(loggedinUser.fullname)}
						</button>}
						<button className='menu-button' onClick={toggleMenu}>
							<SvgIcon className="button-icon" iconName={"menu"} />
						</button>

						{isMenuOpen && <div class="dropdown-menu" id="dropdownMenu">
							<ul>
								{!loggedinUser && <li onClick={handleLoginClick}>Log in or sign up</li>}
								{loggedinUser && (
									<>	<li onClick={onWishlistsClick}>Wishlists</li>
										<li onClick={onGuestOrdersClick}>Trips</li>
										<li onClick={onHostOrdersClick}>View Orders</li>
										<li onClick={onLogout}>Log out</li>
									</>)}
								<LoginModal show={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
							</ul>
						</div>}
					</div>
					{/* אפשר להוסיף כאן תפריט משתמש, אייקונים וכו׳ */}
				</div>
			</nav>
		</header>
	)
}