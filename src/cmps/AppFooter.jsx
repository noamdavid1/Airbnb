

export function AppFooter() {
	const isStayDetails = location.pathname.startsWith('/stay/');
	
	return (
		<footer className="app-footer full">
			<div className={`footer-inner main-container ${isStayDetails ? 'stay-layout' : ''}`}>
			<div className="footer-items">
				<p>© 2025 Staybnb, Inc.</p>
				<span>·</span>
				<p>Noam David</p>
				<span>·</span>
				<p>Liora Aharoni</p>
			</div>
			</div>

			{/* {import.meta.env.VITE_LOCAL ? 
                <span className="local-services">Local Services</span> : 
                <span className="remote-services">Remote Services</span>} */}
		</footer>
	)
}

