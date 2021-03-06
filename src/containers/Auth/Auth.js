import React, { Component } from 'react'
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import '../../css/Auth.css'
import * as actions from '../../store/action/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {updateObject, checkValidity} from '../../shared/utility'
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
},
  isSignup: true


  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
      this.props.onSetAuthRedirectPath()
    }
  }


  inputChangeHandler = (event ,controlName) =>{
    const updatedControls = updateObject(
      ...this.state.controls,{
        [controlName]:updateObject(...this.state.controls[controlName],{
          value:event.target.value,
        valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
        touched:true
        })
      }
    )
     
    this.setState({controls:updatedControls})             
  }
  

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup : !prevState.isSignup}
    })
  }


  render(){

    const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config: this.state.controls[key]
            });
        }

    let form = formElementsArray.map(forElement => (
      <Input
        key= {forElement.id}
        elementType = {forElement.config.elementType}
        elementConfig = {forElement.config.elementConfig} 
        value = {forElement.config.value}
        changed = {(event) => this.inputChangeHandler(event,forElement.id)}
        invalid = {!forElement.config.valid}
        touched = {forElement.config.touched}
        shouldValidate = {forElement.config.validation }></Input>
    ))

    if (this.props.loading){
      form = <Spinner />
    }

    let errorMessage =null;

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    let authRedirect =  null;
    if(this.props.isAuthenticated){
      authRedirect = <Redirect to = {this.props.authRedirectPath} />

    }

     return(

      <div className= "Auth">
        {authRedirect}
        {errorMessage}
        <form onSubmit = {this.submitHandler}>
          {form}
          <Button btnType = "Success">SUBMIT</Button>
        </form>
        <Button 
        clicked = {this.switchAuthModeHandler}
        btnType= "Danger">SWITCH TO {this.state.isSignup ?  'SIGNIN' : 'SIGNUP'}</Button>
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    loading: state.auth.loading,
    error : state.auth.error,
    isAuthenticated : state.auth.token !== null,
    buildingBurger : state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {

  return {
    
    onAuth : (email,password, isSignup) => dispatch(actions.auth(email,password , isSignup)),
    onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);