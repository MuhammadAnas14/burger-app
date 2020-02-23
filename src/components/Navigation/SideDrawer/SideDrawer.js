import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import "../../../css/SideDrawer.css"
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    return(
        <Aux>
        <Backdrop show={props.show} clicked ={props.closed} />
        <div className= 'SideDrawer'>
            <div>
                <Logo ></Logo>
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    )
}

export default sideDrawer