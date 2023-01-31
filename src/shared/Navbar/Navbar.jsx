import "./Navbar.scss"

import { NavLink } from 'react-router-dom';
import { decodeToken } from "react-jwt";

export default function Navbar({ setType, token, setToken }) {

    var user

    function signOut(e) {
        localStorage.clear()
        setToken(null)
    }

    if (token) {
        user = decodeToken(token)
    }

    return (
        <>
            <nav className="navbar">
                <ul className="navList">
                    <li className="navItem">
                        <h1 className="logo">Facilities</h1>
                    </li>
                    <li className="navItem">
                        <NavLink to="/" className={({ isActive }) => isActive ? "active navLinks" : "navLinks"}>Dashboard</NavLink>
                    </li>
                    <li className="navItem">
                        <NavLink to="/explore" className={({ isActive }) => isActive ? "active navLinks" : "navLinks"}>Explore</NavLink>
                    </li>
                    <li className="navItem">
                        {
                            user && ["admin", "owner"].includes(user.role) &&
                            <NavLink to="/add-facility" className={({ isActive }) => isActive ? "active navLinks" : "navLinks"}>Add Facility</NavLink>
                        }
                    </li>
                    {
                        token ?
                            <>
                                <li className="navItem left-auto">
                                    <button className="button" onClick={(e) => setType("BookNow")}>Book Now</button>
                                </li>
                                <li className="navItem">
                                    <button className="button" onClick={signOut}>Sign Out</button>
                                </li>
                                <li className="navItem">
                                    <NavLink to="/user" className="user">
                                        <div className="detailsPreview">
                                            <h4 className="username">{user.username}</h4>
                                            <h5 className="role">{user.role}</h5>
                                        </div>
                                        <div className="pfp">
                                            <img src={user && user.img ? user.img + "?dummy=" + (new Date).getTime() : "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"} alt="pfpImg" className="pfpImg" />
                                        </div>
                                    </NavLink>
                                </li>
                            </> :
                            <>
                                <li className="navItem rightBorder left-auto">
                                    <button className="button" onClick={(e) => setType("login")}>Sign In</button>
                                </li>
                                <li className="navItem">
                                    <button className="button" onClick={(e) => setType("signUp")}>Register</button>
                                </li>
                            </>
                    }
                </ul>
            </nav>

        </>
    )

}