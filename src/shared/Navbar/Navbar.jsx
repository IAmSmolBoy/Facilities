import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.scss"

export default function Navbar() {

    return (
        <nav className="navbar">
            <ul className="navList">
                <li className="navItem">
                    <h1 className="logo">Dashboard</h1>
                </li>
                <li className="navItem">
                    <NavLink to="/" className={ ({ isActive }) => isActive ? "active navLinks" : "navLinks" } data-item="Dashboard">Dashboard</NavLink>
                </li>
                <li className="navItem">
                    <NavLink to="/facility/explore" className={ ({ isActive }) => isActive ? "active navLinks" : "navLinks" } data-item="Explore">Explore</NavLink>
                </li>
                <li className="navItem">
                    <NavLink to="/booking" className={ ({ isActive }) => isActive ? "active bookNow" : "bookNow" } data-item="Book Now">Book Now</NavLink>
                </li>
                <li className="navItem">
                    <NavLink to="/user" className={ ({ isActive }) => isActive ? "active user" : "user" }>
                        <div className="detailsPreview">
                            <h3 className="username">ChrisPBacon69420</h3>
                            <h5 className="role">Admin</h5>
                        </div>
                        <div className="pfp">
                            <img src="https://i.kym-cdn.com/news_feeds/icons/mobile/000/035/373/c98.jpg" alt="pfpImg" className="pfpImg" />
                        </div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )

}