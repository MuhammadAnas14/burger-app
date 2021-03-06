import React from 'react'
import '../../../css/BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label:'Salad', type : 'salad'},
    {label:'Bacon', type : 'bacon'},
    {label:'Cheese', type : 'cheese'},
    {label:'Meat', type : 'meat'}
]

const buildControls = (props) => (

    <div className = 'BuildControls'>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key = {ctrl.label}
            label = {ctrl.label}
            added = {() => props.ingrediantAdded(ctrl.type)}
            remove = {() => props.ingrediantRemove(ctrl.type)}
            disabled = {props.disabled[ctrl.type]} />

        ))}
        <button className = 'OrderButton'
        disabled = {!props.purchasable}
        onClick = {props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER'}</button>

    </div>

)

export default buildControls;
