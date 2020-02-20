import React from 'react'
import '../../css/burger.css'
import BurgerIngredient from './Burgeringredient/Burgeringredient'

const burger = (props) => {
    return(  
        <div className='Burger'>
            <BurgerIngredient type="bread-top"/>
            <BurgerIngredient type="bread-bottom"/>
            <BurgerIngredient type="cheese"/>
            <BurgerIngredient type="meat"/>
        </div>
    )
}

export default burger