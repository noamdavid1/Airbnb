import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/img/newLogo.jpeg';
import { SearchBar } from './search-bar/SearchBar'
import { SearchBarScroll } from './search-bar/SearchBarScroll';

// import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { login, logout, signup } from '../store/actions/user.actions';
import { LoginSignup } from './LoginSignup';
import SvgIcon from './SvgIcon'
// import { UserMenu } from './UserMenu';


export function AppHeader() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const [initialModalType, setInitialModalType] = useState('')
	// const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

	const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
	const navigate = useNavigate()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
			if (window.scrollY <= 50) setIsExpanded(false)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const handleExpandSearch = (type = '') => {
		setInitialModalType(type)
		setIsExpanded(true)
	}

	// function toggleUserMenu() {
	// 	setIsUserMenuOpen(prev => !prev)
	// }

	async function onLogout() {
		try {
			await logout()
			// navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	async function onLogin(credentials) {
		console.log(credentials)
		try {
			login(credentials)
			// setLoggedinUser(user)
		} catch (err) {
			console.log('Cannot login :', err)
			showErrorMsg(`Cannot login`)
		}
	}

	async function onSignup(credentials) {
		console.log(credentials)
		try {
			signup(credentials)
			// setLoggedinUser(user)
			showSuccessMsg(`Welcome ${user.fullname}`)
		} catch (err) {
			console.log('Cannot signup :', err)
			showErrorMsg(`Cannot signup`)
		}
		// add signup
	}

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

	return (
		<header className="app-header full">
			<nav className="header-nav">
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

					<section className="login-signup-container">
						{!loggedinUser && <LoginSignup onLogin={onLogin} onSignup={onSignup} />}

						{loggedinUser && <div className="user-preview">
							<h3>Hello {loggedinUser.fullname}</h3>
							<button onClick={onLogout}>Logout</button>
						</div>}
					</section>

					<button className='wishlists' onClick={onWishlistsClick}>
						Wishlists
					</button>
					{/* אפשר להוסיף כאן תפריט משתמש, אייקונים וכו׳ */}
					{/* <button className='host-button'>become a host</button>
					<SvgIcon iconName={"earth"} />
					
					<button className="menu-button" onClick={toggleUserMenu}>
						<SvgIcon iconName={"burgerMenu"} />
					</button> */}
					{/* {isUserMenuOpen && <UserMenu onClose={() => setIsUserMenuOpen(false)} />} */}
				</div>
			</nav>
		</header>
	)
}