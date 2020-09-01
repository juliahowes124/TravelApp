import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';
import Button from '../FormElements/Button';

const NavLinks = () => {
    return <ul className="nav-links">
    <li>
        <NavLink to="/" exact>HOME</NavLink>
    </li>
    <li>
        <NavLink to="/users" exact>USERS</NavLink>
    </li>
    <li>
        <NavLink to="/u1/posts">MY POSTS</NavLink>
    </li>
    <li>
        <NavLink to="/posts/new">NEW POST</NavLink>
    </li>
    <li>
        <NavLink to="/u1/likes">LIKED POSTS</NavLink>
    </li>
    <li>
        <Button>LOGOUT</Button>
    </li>
    <li>
        <NavLink to="/u1/edit">EDIT PROFILE</NavLink>
    </li>
    <li>
        <NavLink to="/auth">SIGN IN</NavLink>
    </li>
    <li>
        <NavLink to="/auth">REGISTER</NavLink>
    </li>
</ul>
}

export default NavLinks;