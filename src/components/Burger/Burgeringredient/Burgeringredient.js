import React,{Component} from 'react'
import '../../../css/Burgeringredient.css'
import PropTypes from 'prop-types'
import { render } from '@testing-library/react'

class BurgerIngredient extends Component{
    render(){
        
        let ingredient= null ;
    
        switch(this.props.type){
            
            case('bread-bottom'):
                ingredient= <div className = 'BreadBottom'></div>
                break
            
            case('bread-top'):
                ingredient=(

                <div className = 'BreadBottom'>
                    <div className= 'Seeds1'></div>
                    <div className= 'Seeds2'></div>
                </div>
                );
                break

            case('cheese'):
                ingredient= <div className = 'Cheese'></div>
                break

            case('salad'):
                ingredient= <div className = 'Salad'></div>
                break

            case('bacon'):
                ingredient= <div className = 'bacon'></div>
                break
            default:
                ingredient  = null ;
        } 
        return ingredient 
        }
        
}

BurgerIngredient.propTypes ={
    types :PropTypes.string.isRequired
};

export default BurgerIngredient