import React from 'react'
import '../../../css/Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DawerToggle/DrawerToggle'

const toolbar = (props) => (
    <header className = 'Toolbar'>
        <DrawerToggle clicked = {props.DrawerToggleClicked} />

        <div >
            <Logo height = "70px"></Logo>
        </div>
        <nav className = 'DesktopOnly'>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;