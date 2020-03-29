import React,{Component} from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../../src/axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect } from 'react-redux'
import * as actions from  '../../store/action/index'


class BurgerBuilder extends Component{

    state ={
        purchasing: false,
 

    }

    componentDidMount (){
        console.log(this.props)
        this.props.onInitIngredients()        
    }   


    // addIngredientHandler = (type) =>{
        
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount +1;
    //     const updatedIngrediants = {
    //         ...this.state.ingredients
    //     };
        
    //     updatedIngrediants[type] = updatedCount
        
    //     const priceAddition = INGREDIANT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
        
    //     this.setState({totalPrice:newPrice,ingredients:updatedIngrediants})    
    //     this.updatePurchaseState(updatedIngrediants)
    // }

    // removeIngredientHandler =(type) =>{

    //     const oldCount = this.state.ingredients[type];
        
    //     if (oldCount <= 0){
    //         return;
    //     }

    //     const updatedCount = oldCount -1;
    //     const updatedIngrediants = {
    //         ...this.state.ingredients
    //     };
        
    //     updatedIngrediants[type] = updatedCount
        
    //     const priceDeduction = INGREDIANT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
        
    //     this.setState({totalPrice:newPrice,ingredients:updatedIngrediants}) 
    //     this.updatePurchaseState(updatedIngrediants)  
    // }

    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            })
            .reduce((sum,el) => {
                return sum +el;
            },0);
        return sum>0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated){
            this.setState({purchasing:true})
        }else{
            this.props.onSetRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
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

    // const queryParams = [];

    // for (let i in this.state.ingredients){
    //     queryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryParams.push('price=' + this.props.price);
    // const queryString = queryParams.join('&');

    this.props.history.push('/checkout')
    this.props.onInitPurchase()
}

    render(){

        const disableInfo = {
            ...this.props.ings
        };

        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary= null;

        let burger= this.props.error ? <p>ingredients is not listed </p>: <Spinner /> 
        
        if (this.props.ings){
        
            burger = (
                <Aux>
                     <Burger ingredients={this.props.ings}></Burger>
        
                    <div>
                        <BuildControls 
                        ingrediantAdded = {this.props.onIngredientAdded}
                        ingrediantRemove ={this.props.onIngredientRemoved}
                        disabled = {disableInfo}
                        price={this.props.price}
                        purchasable = {this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler}
                        isAuth = {this.props.isAuthenticated} />
                    </div>
        
                </Aux>
            )
        
            orderSummary= <OrderSummary 
                            ingredients= {this.props.ings}
                            purchaseCanceled ={this.purchaseCancelHandler}
                            purchaseContinue = {this.purchaseContinueHandler}
                            price={this.props.price} />
                    
        }

        // if (this.state.loading){
        //     orderSummary= <Spinner />
        // }

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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null
    }   
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients:() => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))