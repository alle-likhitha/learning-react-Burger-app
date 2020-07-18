import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Authentication.module.css';
import * as actions from '../../store/action/index';
import {connect} from 'react-redux'

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
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
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
            <form onSubmit={this.submitHandler}>
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
                    <Button btntype='Success' >SUBMIT</Button>
                </form>
        )
        return(
            <div className={classes.Authentication}>
                
                    {form}
        
            </div>
        );
    }
}

const mapDispatchtoProps=dispatch=>{
    return{
        onAuth : (email,password)=>dispatch(actions.auth(email,password))
    }
}

export default connect(null,mapDispatchtoProps)(Authentication);