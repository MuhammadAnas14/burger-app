import React,{Component} from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../../src/axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIANT_PRICE ={
    salad:0.4,
    bacon:0.7,
    cheese:1.5,
    meat:2.0
}

class BurgerBuilder extends Component{

    state ={
        // ingredients :{
        //     salad:,
        //     bacon:0,
        //     cheese:0,
        //     meat:0
        // },
        ingredients:null,
        totalPrice : 4,
        purchasable :false,
        purchasing: false,
        loading:false,
        error: false

    }

    componentDidMount (){
        console.log(this.props)
        axios.get('https://react-my-burger-d1d8b.firebaseio.com/orders/ingredients.json')
        .then(response =>{
            this.setState({ingredients:response.data});
        })
        .catch(error => {
            this.setState({error:true})
        })
    }   


    addIngredientHandler = (type) =>{
        
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngrediants = {
            ...this.state.ingredients
        };
        
        updatedIngrediants[type] = updatedCount
        
        const priceAddition = INGREDIANT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        
        this.setState({totalPrice:newPrice,ingredients:updatedIngrediants})    
        this.updatePurchaseState(updatedIngrediants)
    }

    removeIngredientHandler =(type) =>{

        const oldCount = this.state.ingredients[type];
        
        if (oldCount <= 0){
            return;
        }

        const updatedCount = oldCount -1;
        const updatedIngrediants = {
            ...this.state.ingredients
        };
        
        updatedIngrediants[type] = updatedCount
        
        const priceDeduction = INGREDIANT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        
        this.setState({totalPrice:newPrice,ingredients:updatedIngrediants}) 
        this.updatePurchaseState(updatedIngrediants)  
    }

    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            })
            .reduce((sum,el) => {
                return sum +el;
            },0);
        this.setState({purchasable:sum>0});
    }

    purchaseHandler = () => {
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () =>{
        // alert("Continue")
    //     this.setState({loading:true})

    //     const order ={
    //         ingredients: this.state.ingredients,
    //         price :this.state.totalPrice,
    //         customer : {
    //             name : 'Muhammad Anas',
    //             address: {
    //                 street: "gulshan",
    //                 zipCode : '173500',
    //                 country: 'Pakistan'
    //         },
    //         email:"anasm9877@gmail.com"
    //     },
    //     deliveryMethod : 'fastest'
    // }

    //     axios.post('/orders.json',order)
    //     .then(response => {
    //         this.setState({loading:false,purchasing:false})
    //         console.log(response)
    //     })
    //     .catch(error => {
    //         this.setState({loading:false,purchasing:false})
    //         console.log(error)
    //     })

    const queryParams = [];

    for (let i in this.state.ingredients){
        queryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price' + this.state.totalPrice);
    const queryString = queryParams.join('&');

    this.props.history.push({
        pathname : '/checkout',
        search : '?' + queryString
    })
}

    render(){

        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary= null;

        let burger= this.state.error ? <p>ingredients is not listed </p>: <Spinner /> 
        
        if (this.state.ingredients){
        
            burger = (
                <Aux>
                     <Burger ingredients={this.state.ingredients}></Burger>
        
                    <div>
                        <BuildControls 
                        ingrediantAdded = {this.addIngredientHandler}
                        ingrediantRemove ={this.removeIngredientHandler}
                        disabled = {disableInfo}
                        price={this.state.totalPrice}
                        purchasable = {this.state.purchasable}
                        ordered = {this.purchaseHandler} />
                    </div>
        
                </Aux>
            )
        
            orderSummary= <OrderSummary 
                            ingredients= {this.state.ingredients}
                            purchaseCanceled ={this.purchaseCancelHandler}
                            purchaseContinue = {this.purchaseContinueHandler}
                            price={this.state.totalPrice} />
                    
        }

        if (this.state.loading){
            orderSummary= <Spinner />
        }

        return(
            <Aux>
                <Modal show= {this.state.purchasing}
                modelClosed = {this.purchaseCancelHandler}>
                
                {orderSummary}
                
                </Modal>

                {burger}
                
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder,axios)