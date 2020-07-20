import React ,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionsCreator from '../../../store/action/index';
import {updateObject, validityCheckHandler} from '../../../hoc/Shared/utility';

class ContactData extends Component{

    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false

            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false

            },               
            city:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'City'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false

            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                isValid:false,
                touched:false

            },       
            emailid:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false

            },    
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}

                    ]
                },
                validation:{},
                value:'fastest',
                isValid:true,
            }    
        },
        formisvalid:false
    };

    orderHandler=(event)=>{
        event.preventDefault();
        // console.log(this.props.ingredients)
        this.setState({loading:true})
        const formData={};
        for(let formid in this.state.orderForm){
            formData[formid]=this.state.orderForm[formid].value
        }
        const order={
            ingredients:this.props.ings,
            price:this.props.price,
            orderData: formData,
            userId: this.props.userId
            
        }

        this.props.onPurchaseBurger(order,this.props.token);
        
    }

    formChangeHandler=(event, id)=>{
        // const formOrder ={
        //     ...this.state.orderForm
        // };
        // const formOrderEle ={
        //     ...formOrder[id]
        // };
        const formOrderEle = updateObject(this.state.orderForm[id], {
            value:event.target.value,
            isValid: validityCheckHandler(event.target.value, this.state.orderForm[id].validation),
            touched: true
        });
        // formOrderEle.value= event.target.value;
        // formOrderEle.isValid=validityCheckHandler(event.target.value, this.state.orderForm[id].validation)
        // formOrderEle.touched=true;
        // formOrder[id]=formOrderEle;

        const formOrder = updateObject(this.state.orderForm, {
            [id]: formOrderEle
        });

        let formisvalid=true;
        for(let id in formOrder){
            formisvalid= formOrder[id].isValid && formisvalid
        }

        // console.log(formOrderEle)
        this.setState({orderForm:formOrder, formisvalid:formisvalid})
    }

    render(){
        let formeleArray = [];
        for(let key in this.state.orderForm){
            formeleArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
           
        }
        let form =(
            <form onSubmit={this.orderHandler}>
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

                    <Button btntype='Success' disabled={!this.state.formisvalid}>Order</Button>
                </form>
        )
        if(this.props.loading){
            form = <Spinner/>
        }


        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStatetoProps= state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token:state.auth.tokenId,
        userId:state.auth.userId
    }
}

const mapDispatchtoProps= dispatch=>{
    return{
        onPurchaseBurger :(orderData,token)=>dispatch(actionsCreator.purhaseBurgerStart(orderData,token))
    }
    
}
export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(ContactData, axios));