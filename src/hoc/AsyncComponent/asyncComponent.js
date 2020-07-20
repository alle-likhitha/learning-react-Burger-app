import React, { Component } from'react';

const asyncComponent =(importComponent)=>{
    return class extends Component {
        state={
            importstate: null
        }
        componentDidMount(){
            importComponent()
            .then(com =>{
                // console.log(this.props)
                // console.log(com)
                
                this.setState({importstate: com.default})
            })
        }
        render(){
            const C = this.state.importstate;
            return C ? <C {...this.props} /> : null;
        }
    }
};

export default asyncComponent;