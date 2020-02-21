import React from 'react'

import '../../../../css/BuildControl.css'

const buildControl = (props) => (

    <div className = 'BuildControl'>
        <div className ='Label'>{props.label}</div>
        <button className = 'Less'>less</button>
        <button className = 'More'>More</button>
    </div>

)

export default buildControl;
