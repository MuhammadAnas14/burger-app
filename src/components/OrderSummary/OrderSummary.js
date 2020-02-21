import React from 'react'
import Aux from '../../hoc/Aux'

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
            <p>Continue to Chackout</p>
        </Aux>
    )
    }

export default orderSummary