import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Button from '../FormElements/Button';
import './MainNav.css';
import { AuthContext } from '../../../shared/context/auth-context';

const MainNav = props => {
    const auth = useContext(AuthContext);
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    }
    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    }

    return (
        <React.Fragment>
        {drawerIsOpen && (<SideDrawer> 
            <Button inverse className="main-navigation__drawer-btn" onClick={closeDrawerHandler}>X</Button>
            <nav className="main-navigation__drawer-nav" onClick={closeDrawerHandler} >
                <NavLinks/>
            </nav>
        </SideDrawer>)}
        
        <MainHeader>
            <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                <span />
                <span />
                <span />
            </button>
            <h1 className="main-navigation__title">
            <NavLink to="/" style={{ textDecoration: 'none', color: 'black' }}>Travel App</NavLink>
            </h1>
            {!auth.isLoggedIn && (
                <div className="main-navigation__auth">
                <Button to={`/auth/login`}>Login</Button>
                <Button inverse to={`/auth/register`}>Register</Button>
            </div>
            )}
            {auth.isLoggedIn && (
                <div className="main-navigation__auth">
                <Button onClick={auth.logout}>Logout</Button>
                <Button to={`/u1/edit`}>Edit Info</Button>
                </div>
            )}
            
        </MainHeader>
     </React.Fragment>
    )
     
}

export default MainNav;