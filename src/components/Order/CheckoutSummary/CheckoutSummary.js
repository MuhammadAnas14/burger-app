import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import '../../../css/CheckoutSummary.css'

const checkoutSummary = (props) => {

    return(
        <div className = 'CheckoutSummary'>
            <h1>We hope t taste well</h1>
            <div style = {{width : '300px', height:'300px ', margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
        
        <Button btnTypes = "Dnager"
        clicked = {props.checkoutCancelled}
        >CANCEL</Button>
        <Button btnTypes = "sucees"
        clicked = {props.checkoutContinued}
        >CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary