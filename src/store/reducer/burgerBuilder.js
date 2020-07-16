import * as actionTypes from '../action/actionTypes';


const Initialstate = {
    ingredients:null,
    totalPrice:50,
    error:false
    // loading:false
}

const INGREDIENTS_PRICE={
    salad:20,
    bacon:20,
    cheese:30,
    meat:40
};

const reducer=(state= Initialstate, action)=>{

    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            // console.log('state isssss'+{state})
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENT:{
            return{
                ...state,
                ingredients:{
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat
                },
                totalPrice: 50,
                error:false
            }
        }    
        case actionTypes.FETCH_INGREDIENTS_FAILED:{
            return{
                ...state,
                error: true
            }
        }
        default:
            return state;    
    }
}

export default reducer;