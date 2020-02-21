import React from 'react'

import '../../../../css/BuildControl.css'

const buildControl = (props) => (

    <div className = 'BuildControl'>
        <div className ='Label'>{props.label}</div>
        <button className = 'Less' onClick= {props.remove} disabled = {props.disabled}>less</button>
        <button className = 'More' onClick= {props.added}>More</button>
    </div>

)

export default buildControl;
