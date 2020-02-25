import React from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'
import '../../../css/Button.css'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igkey => {
            return (<li key={igkey}>
                        <span style={{textTransform: 'capitalize'}}>{igkey}</span>
                        :{props.ingredients[igkey]}</li>)
        })
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A burger with the following ingrediant</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Chackout</p>
            <Button btntype = 'Danger'
            clicked ={props.purchaseCanceled}>CANCEL</Button>
            <Button btntype = 'Success'
            clicked ={props.purchaseContinue}>Continue</Button>
        </Aux>  )
    }

export default orderSummary