import { NavLink } from 'react-router-dom';
import "./Navbar.scss"

export default function Navbar({ setType }) {

    return (
        <>
            <nav className="navbar">
                <ul className="navList">
                    <li className="navItem">
                        <h1 className="logo">Facilities</h1>
                    </li>
                    <li className="navItem">
                        <NavLink to="/" className={ ({ isActive }) => isActive ? "active navLinks" : "navLinks" }>Dashboard</NavLink>
                    </li>
                    <li className="navItem">
                        <NavLink to="/explore" className={ ({ isActive }) => isActive ? "active navLinks" : "navLinks" }>Explore</NavLink>
                    </li>
                    <li className="navItem left-auto">
                        <button className="button" onClick={(e) => setType("Book Now")}>Book Now</button>
                    </li>
                    <li className="navItem">
                        {
                            sessionStorage.getItem("userToken") ?
                            <NavLink to="/user" className={ () => "user" }>
                                <div className="detailsPreview">
                                    <h3 className="username">ChrisPBacon69420</h3>
                                    <h5 className="role">Admin</h5>
                                </div>
                                <div className="pfp">
                                    <img src="https://i.kym-cdn.com/news_feeds/icons/mobile/000/035/373/c98.jpg" alt="pfpImg" className="pfpImg" />
                                </div>
                            </NavLink> :
                            <button className="button" onClick={(e) => setType("login")}>Sign In</button>
                        }
                    </li>
                </ul>
            </nav>
            
        </>
    )

}