import { NavLink } from 'react-router-dom'
import logo from '../assets/img/Airbnb-Logo.wine.png';


export function AppHeader() {

	return (
		<header className="app-header full">
			<nav>
				<NavLink to="/" className="logo">
					<img src={logo} alt="app logo" />
				</NavLink>
			</nav>
		</header>
	)
}
