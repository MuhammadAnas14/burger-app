import React from 'react'
import '../../../css/NavigationItems.css'
import NavigationItem from './Navigationitem'

const navigationItems = (props) => (

    <ul className= 'NavigationItems'>
        <NavigationItem link = "/" exact = {props.exact}>
            Burger Builder
        </NavigationItem>
        
        {props.isAuthenticated ? <NavigationItem link="/orders"> 
            Orders
        </NavigationItem> : null}
        
        {!props.isAuthenticated 
        ? <NavigationItem link = "/auth">Auth</NavigationItem>
        :<NavigationItem link = "/logout">LOGOUT</NavigationItem>}

    </ul>
)

export default navigationItems 