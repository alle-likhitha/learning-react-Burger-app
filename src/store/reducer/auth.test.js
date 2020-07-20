import reducer from './auth';
import * as actionTypes from '../action/actionTypes';

describe(' auth reducer ', ()=>{
    it('should return the initial state', ()=>{
        expect(reducer(undefined,{})).toEqual({
            tokenId:null,
            userId:null,
            error: null,
            loading: null,
            authRedirect: '/'
        });
    })
    it('should return the initial state', ()=>{
        expect(reducer({
            tokenId:null,
            userId:null,
            error: null,
            loading: null,
            authRedirect: '/'
        },{
                type:actionTypes.AUTH_SUCCESS,
                idToken: 'some-token',
                localId: 'some-id'
            })).toEqual({
                tokenId: 'some-token',
                userId: 'some-id',
                error: null,
                loading: false,
                authRedirect: '/'
        });
    })
});