import React from 'react';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import './MainNav.css';

const MainNav = () => {
    return (
        // <React.Fragment>
        // {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
        // <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}> 
        //     <nav className="main-navigation__drawer-nav">
        //         <NavLinks />
        //     </nav>
        // </SideDrawer>
        
        <MainHeader>
            <button className="main-navigation__menu-btn">
                <span />
                <span />
                <span />
            </button>
            <h1 className="main-navigation__title">
            Travel Site
            </h1>
            <nav className="main-navigation__header-nav">
                <NavLinks />
            </nav>
        </MainHeader>
    // </React.Fragment>
    )
     
}

export default MainNav;