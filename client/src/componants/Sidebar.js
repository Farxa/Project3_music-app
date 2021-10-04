import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';
import './sidebar.css';
import {loginUrl} from '../spotifyConfig';


export default function Sidebar(props) {

  const handleLogout = () => {
		logout().then(() => {
			props.setToken(null);
		})
	}
    
    return (
      <nav className="container">
			{props.token ? (
				<div className="links">
					<Link to="/playlists">
						<button>All Playlists</button>
					</Link>
					<Link to="/" onClick={() => handleLogout()}>
						<button>Logout</button>
					</Link>
				</div>
			) : (
				<div className="links">
					<Link to="/signup">
						<button>Signup</button>
						<br />
						<br />
					</Link>
					<Link to="/login">
						<button>Login</button>
						<br />
						<br />
					</Link>
					<div className="links">
            			<a href={loginUrl}><button>Login with Spotify</button></a>
        			</div>
				</div>
			)}
		</nav>
    )
}



