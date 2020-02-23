import React from 'react'
import '../../../css/Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => (
    <header className = 'Toolbar'>
        <div>
            Menu
        </div>
        <div >
            <Logo height = "70px"></Logo>
        </div>
        <nav className = 'DesktopOnly'>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;