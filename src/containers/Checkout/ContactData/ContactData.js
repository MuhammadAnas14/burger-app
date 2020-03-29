import React, { Component } from 'react';
import {connect} from 'react-redux'

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import '../../../css/ContactData.css'
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as action from '../../../store/action/index'
class ContactData extends Component {
    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required : true
                },
                valid : false,
                touched :false
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required : true
                },
                valid : false,
                touched :false
            },
            
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required : true,
                    minlength :5,
                    maxlength: 5
                },
                valid : false,
                touched :false
            },

            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required : true
                },
                valid : false,
                touched :false
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required : true
                },
                valid : false,
                touched :false
            },

            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation:{},
                valid :true
            }
        },
        formIsValid:true
        // loading: false
    }

    orderHandler = ( event ) => {
        // event.preventDefault();
        // this.setState( { loading: true } );
      
        const formData = {};
      
        for (let Identifier in this.state.orderForm){
            formData[Identifier] = this.state.orderForm[Identifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData :formData,
            userId:this.props.userId
        }

        this.props.onOrderBurger(order,this.props.token);
        // axios.post( '/orders.json', order )
        //     .then( response => {
        //         this.setState( { loading: false } );
        //         this.props.history.push('/');
        //     } )
        //     .catch( error => {
        //         this.setState( { loading: false } );
        //     } );
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler = (event,inputIdentifier) => {
        console.log(event.target.value)
        const updatedOrderform = {
            ...this.state.orderForm
        }
        
        const updatedFormElement= {
            ...updatedOrderform[inputIdentifier]
        }
        
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderform[inputIdentifier] = updatedFormElement
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderform) {
            formIsValid = updatedOrderform[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderform, formIsValid: formIsValid});
    }


    render () {

        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            
            <form onSubmit = {this.orderHandler}>

                {formElementsArray.map(forElement => (
                    <Input 
                    key = {forElement.id}
                    elementType = {forElement.config.elementType}
                    elementConfig = {forElement.config.elementConfig} 
                    value = {forElement.config.value}
                    changed = {(event) => this.inputChangeHandler(event,forElement.id)}
                    invalid = {!forElement.config.valid}
                    touched = {forElement.config.touched}
                    shouldValidate = {forElement.config.validation } />
                ))}

                {/* <Input elementType= "..." elementConfig="..." value ="...." /> */}
                {/* <Input inputtype = "input" type="text" name="name" placeholder="Your Name" />
                <Input inputtype = "input" type="email" name="email" placeholder="Your Mail" />
                <Input inputtype = "input" type="text" name="street" placeholder="Street" />
                <Input inputtype = "input" type="text" name="postal" placeholder="Postal Code" /> */}
                <Button
                disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        
        return (
            <div className='ContactData'>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}


const mapStateToProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price :state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token : state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {

    return{    
        onOrderBurger : (orderData,token) => dispatch(action.purchaseBurger(orderData,token ))

    }

}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));