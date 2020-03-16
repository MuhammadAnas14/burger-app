import * as actionTypes from '../action/actionTypes'

const initialState = {
    orders: [],
    loading :false,
    purchased:false
}

const orderReducer = (state = initialState,action) => {

    switch(action.type){

        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased:false
            }

        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading:true
            }

        case actionTypes.PURCHASE_BURGER_SUCESS:
            
            const newOrder = {
                ...action.orderData,
                id : action.orderId
            };

            return {
                ...state,
                loading:false,
                purchased:true,
                orders:state.orders.concat(newOrder)
            };

        case actionTypes.PURCHASE_BURGER_FAIL:
            return{

                ...state,
                loading:false
            }   
        case actionTypes.FETCH_ORDER_START:
            return{
                ...state,
                loading:true
            }

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                action:action.orders,
                loading:false
            }

        case actionTypes.FETCH_ORDERS_FAIL:
            return{
                ...state,
                loading:false
            }

        default:
            return state
    }
}

export default orderReducer