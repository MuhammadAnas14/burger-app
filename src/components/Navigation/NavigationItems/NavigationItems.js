import React from 'react'
import '../../../css/NavigationItems.css'
import NavigationItem from './Navigationitem'

const navigationItems = (props) => (

    <ul className= 'NavigationItems'>
        <NavigationItem link = "/" exact = {props.exact}>
            Burger Builder
        </NavigationItem>
        <NavigationItem link="/orders">
            Orders
        </NavigationItem>
        {!props.isAuthenticated 
        ? <NavigationItem link = "/auth">Auth</NavigationItem>
        :<NavigationItem link = "/logout">LOGOUT</NavigationItem>}
    </ul>
)

export default navigationItems 