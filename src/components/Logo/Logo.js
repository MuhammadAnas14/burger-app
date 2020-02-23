import React from 'react'
import burgerLogo from '../../assets/images/burger-logo.png'
import '../../css/logo.css'

const logo = (props)=>(
    
    <div>
        <img className = 'Logo' 
        style = {{height:props.height}}
        src= {burgerLogo}
        alt='MyBurger' />
    </div>
)

export default logo