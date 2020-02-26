import React from 'react'
import '../../../css/NavigationItem.css'
import {NavLink} from 'react-router-dom'

const navigationItem = (props) => (

    <li className='NavigationItem'>
        < NavLink
            to = {props.link}
            exact
            className= {props.active}>{props.children}</ NavLink>
    </li>
)

export default navigationItem