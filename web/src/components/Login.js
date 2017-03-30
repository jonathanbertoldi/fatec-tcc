import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {

    constructor() {
        super();

        // binds dos métodos da classe
        this.handleLogin = this.handleLogin.bind(this);

        // state
        this.state = {
            inputUserError: "",
            inputPasswordError: ""
        }
    }

    handleLogin() {
        if (this.validateInputs()) {
            var credentials = {
                username: this.refs.inputUser.getValue(),
                password: this.refs.inputPassword.getValue()
            }
            this.props.loginAdmin(credentials);
        }
    }

    isUserInputValid = () => this.refs.inputUser.getValue().length > 0;

    isPasswordInputValid = () => this.refs.inputPassword.getValue().length > 0;

    validateInputs = () => {
        var r = true;
        this.clearInputErrors();
        if(!this.isUserInputValid()) {
            this.setState({ inputUserError: "Digite um login" });
            r = false;
        }
        if(!this.isPasswordInputValid()) {
            this.setState({ inputPasswordError: "Digite uma senha" });
            r = false;
        }
        return r;
    }

    clearInputErrors = () => this.setState({ inputUserError: "", inputPasswordError: "" });

    render() {
        const windowStyle = {
            height        : "100vh",
            display       : "flex",
            justifyContent: "center",
            alignItems    : "center"
        }

        const loginStyle = {
            display       : "flex",
            flexWrap      : "wrap",
            padding       : "20px",
            justifyContent: "center"
        }

        const loginTitleStyle = {
            textAlign: "center"
        }

        return (
            <div style={ windowStyle } >
                <div style={ loginStyle } >
                    <div style={ loginTitleStyle } >
                        <h2>TULLY</h2>
                        <h5>ADMIN</h5>
                    </div>
                    <TextField floatingLabelText="User" 
                        errorText={this.state.inputUserError} 
                        fullWidth={true} 
                        ref="inputUser" />
                    <TextField floatingLabelText="Password" 
                        errorText={this.state.inputPasswordError} 
                        fullWidth={true} 
                        type="password" 
                        ref="inputPassword" />
                    <span style={{ margin: "10px", width: "100%" }}></span>
                    <RaisedButton label="Log-in" 
                        primary={true} 
                        fullWidth={true} 
                        onTouchTap={this.handleLogin} />
                </div>
            </div>
        );
    }
}

export default Login;