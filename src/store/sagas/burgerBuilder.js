import {put} from 'redux-saga/effects';
// import * as actionTypes from '../action/actionTypes';
import axios from '../../axios-order';
import * as actions from '../action/index';

export function* initIngredientSaga(action){
    try{ 
        const response =yield axios.get('https://react-burger-love.firebaseio.com/ingredients.json')
        yield put(actions.setIngredient(response.data));
    }    
    catch(error){
        yield put(actions.fetchIngredientsFailed());
    }

    
}