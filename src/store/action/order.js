import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const purchaseBurgerSucces = (id,orderData) => {

    return {

        type:actionTypes.PURCHASE_BURGER_SUCESS,
        orderID: id,
        orderData: orderData

    }
};

export const purchaseBurgerFail = (error) => {
    return {

        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type :actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData,token ) =>{

    return dispatch => {

        dispatch(purchaseBurgerStart());

        axios.post( '/orders.json?auth= '+token, orderData )
        .then( response => {
            console.log(response.data)
            dispatch(purchaseBurgerSucces(response.data.name,orderData))
        } )
        .catch( error => {
            dispatch(purchaseBurgerFail(error))
        } );

    }
}

export const purchaseInit = () => {

    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) =>{
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {

    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}

export const fetchOrdersStart = () =>{
    
    return{
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get( '/orders.json?auth=' + token  )
            .then( res => {
                const fetchedOrders = [];
                console.log (res.data)
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                console.log(fetchedOrders)
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err))
            });
    }
}