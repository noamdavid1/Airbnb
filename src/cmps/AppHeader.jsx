import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/img/newLogo.jpeg';
import { SearchBar } from './search-bar/SearchBar';
import { useSelector } from 'react-redux';
import { login, logout, signup } from '../store/actions/user.actions';
import { LoginSignup } from './LoginSignup';

export function AppHeader() {

	const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
	// const navigate = useNavigate()

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
			// setLoggedinUser(null)
		} catch (err) {
			console.log('can not logout');
		}
		// add logout
	}

	console.log({loggedinUser});
	

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

					<section className="login-signup-container">
						{!loggedinUser && <LoginSignup onLogin={onLogin} onSignup={onSignup} />}

						{loggedinUser && <div className="user-preview">
							<h3>Hello {loggedinUser.fullname}</h3>
							<button onClick={onLogout}>Logout</button>
						</div>}
					</section>
					{/* אפשר להוסיף כאן תפריט משתמש, אייקונים וכו׳ */}
				</div>
			</nav>
		</header>
	)
}