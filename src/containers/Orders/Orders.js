import React,{Component}  from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/action/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'

class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount() {
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchedOrders = [];
        //         for (let key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({loading: false, orders: fetchedOrders});
        //     })
        //     .catch(err => {
        //         this.setState({loading: false});
        //     });
        this.props.onFetchOrders()
    }

    render () {
        let orderss = <Spinner />
        if (!this.props.loading){
        
            orderss = this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}

        return(
            <div>
                {orderss}
            </div>
        )
    }
}

const mapStateToProps = state =>{
   return{
        orders: state.order.orders,
        loading:state.order.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {

        onFetchOrders : () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));