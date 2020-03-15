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

export const purchaseBurger = (orderData) =>{

    return dispatch => {

        purchaseBurgerStart();

        axios.post( '/orders.json', orderData )
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