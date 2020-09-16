import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';
import Button from '../FormElements/Button';
import { AuthContext } from '../../context/auth-context';

const NavLinks = () => {
    const auth = useContext(AuthContext);
    return <ul className="nav-links">
    <li>
        <NavLink to="/" exact>HOME</NavLink>
    </li>
    <li>
        <NavLink to="/users" exact>USERS</NavLink>
    </li>
    {auth.isLoggedIn && (
        <React.Fragment>
            <li>
                <NavLink to="/u1/posts">MY POSTS</NavLink>
            </li>
            <li>
                <NavLink to="/new">NEW POST</NavLink>
            </li>
            <li>
                <NavLink to="/u1/likes">LIKED POSTS</NavLink>
            </li>
        </React.Fragment>
    )}
</ul>
}

export default NavLinks;