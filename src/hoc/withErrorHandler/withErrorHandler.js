import React , {Component} from 'react'
import Model from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'
import { render } from '@testing-library/react'
   

const withErrorHandler = (WrappedComponent,axios) => {

    return class extends Component {

        state = {
            error:null
        }

        componentWillMount(){

            this.reqinterceptors= axios.interceptors.request.use(req => {
                this.setState({error:null})
                return req
            })

            this.resinterceptors = axios.interceptors.response.use(res => res,error => {
                this.setState({error:error})
            })
        }

        componentWillUnmount() {

            console.log("will unount",this.reqinterceptors,this.resinterceptors)
            axios.interceptors.request.eject(this.reqinterceptors);
            axios.interceptors.response.eject(this.resinterceptors);
        }
        
        errorConfirmedHandler = () => {
            this.setState({error:null})
        }

        render(){

            return(

                <Aux>
                    <Model show={this.state.error}
                    modelClosed = {this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message :null}
                    </Model>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        
        }
    }
}

export default withErrorHandler