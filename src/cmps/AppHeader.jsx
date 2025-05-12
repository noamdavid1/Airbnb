import { NavLink } from 'react-router-dom';
import logo from '../assets/img/newLogo.jpeg';
import { SearchBar } from './search-bar/SearchBar';

export function AppHeader() {
	return (
		<header className="app-header full">
			<nav className="header-nav">
				<div className="header-left">
					<NavLink to="/" className="logo">
						<img src={logo} alt="app logo" />
					</NavLink>
				</div>

				<div className="header-center">
					<SearchBar />
				</div>

				<div className="header-right">
					{/* אפשר להוסיף כאן תפריט משתמש, אייקונים וכו׳ */}
				</div>
			</nav>
		</header>
	)
}