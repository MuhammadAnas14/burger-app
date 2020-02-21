import React,{Component} from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/OrderSummary/OrderSummary'

const INGREDIANT_PRICE ={
    salad:0.4,
    bacon:0.7,
    cheese:1.5,
    meat:2.0
}

class BurgerBuilder extends Component{

    state ={
        ingredients :{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice : 4,
        purchasable :false,
        purchasing: false

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
        alert("Continue")
    }

    render(){
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal show= {this.state.purchasing}
                modelClosed = {this.purchaseCancelHandler}>

                <OrderSummary 
                ingredients= {this.state.ingredients}
                purchaseCanceled ={this.purchaseCancelHandler}
                purchaseContinue = {this.purchaseContinueHandler}
                price={this.state.totalPrice} />
    
                </Modal>
    
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
    }
}

export default BurgerBuilder