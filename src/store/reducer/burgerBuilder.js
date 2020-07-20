import * as actionTypes from '../action/actionTypes';
import {updateObject} from '../../hoc/Shared/utility';

const Initialstate = {
    ingredients:null,
    totalPrice:50,
    error:false,
    building:false
    // loading:false
}

const INGREDIENTS_PRICE={
    salad:20,
    bacon:20,
    cheese:30,
    meat:40
};
const adding = (state,action)=>{
    const updatei = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updateing = updateObject(state.ingredients,updatei)
    const updatatedstate = {
        ingredients: updateing,
        totalPrice:state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
        building:true
    }
    return updateObject(state, updatatedstate)
}

const removing = (state,action)=>{
    const updater = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updaterem = updateObject(state.ingredients,updater)
    const upstate = {
        ingredients: updaterem,
        totalPrice:state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
        building:true
    }
    return updateObject(state, upstate)
}
const setIng = (state,action)=>{
    return updateObject(state, {
        ingredients:{
            salad:action.ingredients.salad,
            bacon:action.ingredients.bacon,
            cheese:action.ingredients.cheese,
            meat:action.ingredients.meat
        },
        totalPrice: 50,
        error:false
    })
}
const fetchingFailed = (state,action)=>{
    return updateObject(state, {error: true})
}

const reducer=(state= Initialstate, action)=>{

    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return adding(state,action)
        case actionTypes.REMOVE_INGREDIENT: return removing(state,action)  
        case actionTypes.SET_INGREDIENT: return setIng(state,action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchingFailed(state,action)
        default: return state;    
    }
}

export default reducer;