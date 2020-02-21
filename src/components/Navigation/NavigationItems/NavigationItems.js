import React from 'react'
import '../../../css/NavigationItems.css'
import NavigationItem from './Navigationitem'

const navigationItems = (props) => (

    <ul className= 'NavigationItems'>
        <NavigationItem link = "/" active>
            Burger Builder
        </NavigationItem>
        <NavigationItem link="/">
            Checkout
        </NavigationItem>
    </ul>
)

export default navigationItems 