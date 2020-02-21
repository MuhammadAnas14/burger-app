import React from 'react'
import '../../../css/NavigationItem.css'

const navigationItem = (props) => (

    <li className='NavigationItem'>
        <a 
            herf={props.link}
            className= {props.active ? 'active':null}>{props.children}</a>
    </li>
)

export default navigationItem