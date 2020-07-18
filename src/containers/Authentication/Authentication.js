import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Authentication.module.css';
import * as actions from '../../store/action/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Authentication extends Component{
    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail Id'
                },
                value:'',
                validation:{
                    required:true,

                },
                isValid:false,
                touched:false

            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength: 7

                },
                isValid:false,
                touched:false

            }
            
        },
        isSignup:true
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authPathSet !=='/'){
            this.props.onSetRedirectPath()
        }
    }

    validityCheckHandler(value, rules){
        let isValid=true;
        if(!rules){
            return true
        }
        if(rules.required){
            isValid= value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        
        return isValid
    }
    formChangeHandler(event, controlName){
        const updateState ={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                touched:true,
                isValid:this.validityCheckHandler(event.target.value,this.state.controls[controlName].validation)
            }
        }
        this.setState({controls:updateState})
    }

    submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }
    onChangeSignup=()=>{
        this.setState(prevState =>{
            return {
                isSignup: !prevState.isSignup
            }    
        })
    }

    render(){
        let formeleArray = [];
        for(let key in this.state.controls){
            formeleArray.push({
                id:key,
                config:this.state.controls[key]
            })
           
        }
        let form =(
            <form >
            {/*  <form> */}
                    {/* <Input elementType='...' elementConfig='..'  value='..'></Input> */}
                    
                    {formeleArray.map(formelement=>(
                        <Input key={formelement.id}
                        elementType={formelement.config.elementType}
                        elementConfig={formelement.config.elementConfig}
                        value={formelement.config.value} 
                        shouldValidate={formelement.config.validation}
                        changed={(event)=> this.formChangeHandler(event, formelement.id)}
                        touched={formelement.config.touched}
                        invalid={!formelement.config.isValid} />
                    ))}
                    {/* disabled={!this.state.formisvalid} */}
                    <Button btntype='Success' clicked={this.submitHandler}>SUBMIT</Button>
                </form>
        )
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect=<Redirect to={this.props.authPathSet} />
        }
        if(this.props.loading){
            form=<Spinner />
        }
        let errorMessage=null
        if(this.props.error){
        errorMessage=<p>{this.props.error}</p>
        }
        return(
            <div className={classes.Authentication}>

                    {form}
                    {authRedirect}
                    <Button btntype='Danger' clicked={this.onChangeSignup} >SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
                    {errorMessage}
            </div>
        );
    }
}
const mapStatetoProps=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        buildingBurger:state.burgerBuilder.building,
        isAuthenticated: state.auth.tokenId != null,
        authPathSet: state.auth.authRedirect
    }
}
const mapDispatchtoProps=dispatch=>{
    return{
        onAuth : (email,password, isSignup)=>dispatch(actions.auth(email,password, isSignup)),
        onSetRedirectPath : ()=>dispatch(actions.authRedirectPathset('/'))
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Authentication);