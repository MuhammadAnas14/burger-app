import React, { Component } from 'react'
import I

class Auth extends Component{

  state = {

    controls : {

      email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Your Email'
        },
        value: '',
        validation: {
            required : true,
            isEmail: true,
        },
        valid : false,
        touched :false
    },
    password: {
      elementType: 'input',
      elementConfig: {
          type: 'password',
          placeholder: 'Your Password'
      },
      value: '',
      validation: {
          required : true,
          minLength: 6
      },
      valid : false,
      touched :false
  }
    }

  }

  render(){
    return(

      <div>

      </div>
    )
  }
}