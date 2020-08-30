import React from 'react';
// import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = () => {
    return <ul className="nav-links">
    <li>
        ALL USERS
    </li>
    <li>
        MY POSTS
    </li>
    <li>
        ADD POST
    </li>
    <li>
        AUTHENTICATE
    </li>
    <li>
        <button>LOGOUT</button></li>
</ul>
}

export default NavLinks;