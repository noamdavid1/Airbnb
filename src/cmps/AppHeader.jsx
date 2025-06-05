import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../public/logo.png'
import { SearchBar } from './search-bar/SearchBar'
import { SearchBarScroll } from './search-bar/SearchBarScroll';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import SvgIcon from './SvgIcon';
import { UserMenu } from './UserMenu';

export function AppHeader() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const [initialModalType, setInitialModalType] = useState('')
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const menuRef = useRef(null)
	const location = useLocation();
	const isWishlistPage = location.pathname === '/wishlist';
	
	const isStayDetails = location.pathname.startsWith('/stay/');

	const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
	const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		setIsScrolled(window.scrollY > 50)
	// 		if (window.scrollY <= 50) setIsExpanded(false)
	// 	}

	// 	const handleClickOutside = (event) => {
	// 		if (menuRef.current && !menuRef.current.contains(event.target)) {
	// 			setIsMenuOpen(false);
	// 		}
	// 	}

	// 	document.addEventListener('click', handleClickOutside)
	// 	window.addEventListener('scroll', handleScroll)

	// 	return () => {
	// 		window.removeEventListener('scroll', handleScroll)
	// 		document.removeEventListener('click', handleClickOutside);
	// 	}
	// }, [])

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
	
			// אם לא במצב סקורל, והסקרול עבר 60 => הפוך ל־scrolled
			if (!isScrolled && scrollY > 60) {
				setIsScrolled(true);
			}
			// אם כן במצב סקורל, אבל חזר למטה מתחת ל־40 => חזור ללא-סקורל
			else if (isScrolled && scrollY < 40) {
				setIsScrolled(false);
				setIsExpanded(false); // סגור את ההרחבה אם חוזרים למעלה
			}
		};
	
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};
	
		document.addEventListener('click', handleClickOutside);
		window.addEventListener('scroll', handleScroll);
	
		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isScrolled]);
	

	const handleExpandSearch = (type = '') => {
		setInitialModalType(type)
		setIsExpanded(true)
	}

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev)
	}

	function getFirstLetterUpper(string) {
		if (!string) return '';
		return string.charAt(0).toUpperCase();
	}

	return (
		<header className={`app-header full ${isExpanded ? 'expanded' : 'collapsed'}`}>
			<nav className={`header-nav main-container ${isStayDetails ? 'stay-layout' : ''} ${((isScrolled && !isExpanded) || isWishlistPage || isStayDetails) ? 'scrolled' : ''}`}>
				<div className="header-left">
					<NavLink to="/" className="logo">
						<div className='logo-div'>
							<img src={logo} alt="app logo" />
							staybnb
						</div>

					</NavLink>
				</div>
				{!isWishlistPage &&
					<div className={"header-center"}>

						{!isExpanded && (isScrolled || isStayDetails) ? (
							<SearchBarScroll onExpandSearch={handleExpandSearch} />
						) : (
							<SearchBar initialModalType={initialModalType} filterBy={filterBy} />
						)}
					</div>}

				<div className="header-right">

					<div className="menu-wrapper" ref={menuRef}>
						{loggedinUser && <button className='loggedinUser-button'>
							{getFirstLetterUpper(loggedinUser.fullname)}
						</button>}
						<button className='menu-button' onClick={toggleMenu}>
							<SvgIcon className="button-icon" iconName={"menu"} />
						</button>

						{isMenuOpen && <UserMenu onClose={() => setIsMenuOpen(false)} />
						}
					</div>
				</div>
			</nav>
		</header>
	)
}