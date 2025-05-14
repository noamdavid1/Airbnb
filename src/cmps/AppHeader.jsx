import { NavLink } from 'react-router-dom';
import logo from '../assets/img/newLogo.jpeg';
import { SearchBar } from './search-bar/SearchBar'
import { SearchBarScroll } from './search-bar/SearchBarScroll';

import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

export function AppHeader() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
			if (window.scrollY <= 50) setIsExpanded(false)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const handleExpandSearch = () => {
		setIsExpanded(true)
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
						<SearchBar />
					)}
				</div>

				<div className="header-right">
					{/* future user menu etc. */}
				</div>
			</nav>
		</header>
	)
}

// 	return (
// 		<header className="app-header full">
// 			<nav className="header-nav">
// 				<div className="header-left">
// 					<NavLink to="/" className="logo">
// 						<img src={logo} alt="app logo" />
// 					</NavLink>
// 				</div>

// 				<div className="header-center">
// 					<SearchBarScroll />
// 				</div>

// 				<div className="header-right">
// 					{/* אפשר להוסיף כאן תפריט משתמש, אייקונים וכו׳ */}
// 				</div>
// 			</nav>
// 		</header>
// 	)
// }