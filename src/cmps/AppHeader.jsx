import { NavLink } from 'react-router-dom'


export function AppHeader() {

	return (
		<header className="app-header full">
			<nav>
				<NavLink to="/" className="logo">
					E2E Demo
				</NavLink>
				<NavLink to="about">About</NavLink>
				<NavLink to="stay">Stays</NavLink>
				<NavLink to="chat">Chat</NavLink>
				<NavLink to="review">Review</NavLink>
			</nav>
		</header>
	)
}
