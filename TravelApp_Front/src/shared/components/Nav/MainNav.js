import React, { useState, useEffect } from 'react';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Button from '../FormElements/Button';
import './MainNav.css';

const MainNav = props => {
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
            <nav className="main-navigation__drawer-nav">
                <NavLinks />
            </nav>
        </SideDrawer>)}
        
        <MainHeader>
            <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                <span />
                <span />
                <span />
            </button>
            <h1 className="main-navigation__title">
            Travel Site
            </h1>
            <dropdown className="main-navigation__header-dropdown">
                <Button>Auth Button</Button>
            </dropdown>
        </MainHeader>
     </React.Fragment>
    )
     
}

export default MainNav;