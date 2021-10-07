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
      <nav className="containerSidebar">
			{props.token ? (
				<div className="links">
					<Link to="/queue">
						<button>Create a Queue</button>
					</Link>
					<Link to="/" onClick={() => handleLogout()}>
						<button>Logout</button>
					</Link>
				</div>
			) : (
				<div >
					<div className="links">
            			<a href={loginUrl}><button>LOGIN WITH SPOTIFY</button></a>
        			</div>
				</div>
			)}
		</nav>
    )
}



