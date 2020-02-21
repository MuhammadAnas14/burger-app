import React from 'react'
import '../../css/burger.css'
import BurgerIngredient from './Burgeringredient/Burgeringredient'

const burger = (props) => {

    let tranformedIngredient = Object.keys(props.ingredients)
        .map(igkey =>{
            return[...Array(props.ingredients[igkey])].map((_,i)=>{
                return <BurgerIngredient key= {igkey + 1} type= {igkey} />
            })
        })
        .reduce((arr,el) => {
            return arr.concat(el)
        },[])
        console.log(tranformedIngredient)

    if (tranformedIngredient.length == 0){
        tranformedIngredient = <p>please start adding ingredient</p>
    }
    
    return(  
        <div className='Burger'>
            <BurgerIngredient type="bread-top"/>
            {tranformedIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger