import React ,{Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import '../../../css/ContactData.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component{

    state = {
        name : '',
        email: '',
        address :{
            street : '',
            postalCode: ''
        },
        loading:false

    }

    orderHandler(event) {
        // event.preventDefault();
        this.setState({loading:true})

        const order ={
            ingredients: this.props.ingredients,
            price :this.props.totalPrice,
            customer : {
                name : 'Muhammad Anas',
                address: {
                    street: "gulshan",
                    zipCode : '173500',
                    country: 'Pakistan'
            },
            email:"anasm9877@gmail.com"
        },
        deliveryMethod : 'fastest'
    }

        axios.post('/orders.json',order)
        .then(response => {
            this.setState({loading:false})
            this.props.history.push('/')
        })
        .catch(error => {
            this.setState({loading:false})
            console.log(error)
        })

        

    }

    render(){
        let form = (
            <form>
                    <input type ='text' name = "name" placeholder ="Your name" />
                    <input type ='email' name = "email" placeholder ="Your Email" />
                    <input type ='text' name = "street" placeholder ="Street" />
                    <input type ='text' name = "postal code" placeholder ="Postal Code" />
                    <Button btnType = 'Success'
                    clicked = {this.orderHandler}>ORDER</Button>
                    
                </form>
        );

        if (this.state.loading){

            form = <Spinner />
        }

        return(
            <div className = 'ContactData'>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData