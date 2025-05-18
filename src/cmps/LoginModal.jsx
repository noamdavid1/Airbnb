
import { useState } from "react";
import { login, signup } from "../store/actions/user.actions";

export function LoginModal({ show, onClose }) {

    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const [isSignup, setIsSignup] = useState(false)

    function getEmptyCredentials() {
        return { username: '', password: '' }
    }

    function onSubmit() {
        if (isSignup) {
            signup(credentials)
        } else {
            login(credentials)
        }

        closeModal()
    }

    function closeModal() {
        setCredentials(getEmptyCredentials())
        onClose()
    }

    function ontoggleSignup() {
        setIsSignup(isSignup => !isSignup)
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        console.log("handleChange", field, value, target);

        setCredentials(prevCredentials => ({ ...prevCredentials, [field]: value }))
    }

    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={ev => {
            ev.stopPropagation()
            closeModal()
        }
        }>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close-button" onClick={closeModal}>&times;</span>
                <h2>Log in or sign up</h2>
                <p>Welcome to Staybnb</p>
                {isSignup && <input type="text" placeholder="Fullname" value={credentials.fullname} name="fullname" onChange={handleChange} />}
                <input type="text" placeholder="Username" value={credentials.username} name="username" onChange={handleChange} />
                <input type="text" placeholder="Password" value={credentials.password} name="password" onChange={handleChange} />
                <button className="submit-btn" onClick={onSubmit}>{isSignup ? 'Sign up' : 'Log in'}</button>
                <button onClick={ontoggleSignup}>{isSignup ? 'Login' : 'Signup'}</button>
            </div>
        </div>
    )
}

