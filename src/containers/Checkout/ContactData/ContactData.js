import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import '../../../css/ContactData.css'
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input'

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
                valid : false
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
                valid : false
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
                valid : false
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
                valid : false
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
                valid : false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = ( event ) => {
        // event.preventDefault();
        this.setState( { loading: true } );
      
        const formData = {};
      
        for (let Identifier in this.state.orderForm){
            formData[Identifier] = this.state.orderForm[Identifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData :formData
            
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    checkValidaty(value,rules){
        let isvalid =true;

        if(rules.required){
            isvalid = value.trim() !== '' && isvalid;
        }

        if(rules.minlength){
            
            isvalid = value.length  >= rules.minlength

        }

        if(rules.maxlength){
            isvalid = value.length  >= rules.maxlength

        }
        
        return  isvalid
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
        updatedFormElement.valid = this.checkValidaty(updatedFormElement.value,updatedFormElement.validation)
        updatedOrderform[inputIdentifier] = updatedFormElement
        console.log(updatedFormElement)
        this.setState({orderForm : updatedOrderform})
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
                    shouldValidate = {forElement.config.validation } />
                ))}

                {/* <Input elementType= "..." elementConfig="..." value ="...." /> */}
                {/* <Input inputtype = "input" type="text" name="name" placeholder="Your Name" />
                <Input inputtype = "input" type="email" name="email" placeholder="Your Mail" />
                <Input inputtype = "input" type="text" name="street" placeholder="Street" />
                <Input inputtype = "input" type="text" name="postal" placeholder="Postal Code" /> */}
                <Button>ORDER</Button>
            </form>
        );
        
        if ( this.state.loading ) {
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

export default ContactData;