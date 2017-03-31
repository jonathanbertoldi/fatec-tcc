import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import { windowStyle, loginStyle, loginTitleStyle } from './style';

class Login extends Component {

    constructor(props) {
        super(props);

        // binds dos métodos da classe
        this.handleRequestClose = this.handleReqeustClose.bind(this);
        this.handleLogin        = this.handleLogin.bind(this);

        // state
        this.state = {
            inputPasswordError: "",
            inputUserError    : "",
            snackbarOpen      : false
        }
    }

    handleLogin() {
        if (this.validateInputs()) {
            var credentials = {
                username: this.refs.inputUser.getValue(),
                password: this.refs.inputPassword.getValue()
            }
            this.props.loginAdmin(credentials)
                .then(() => console.log("Administrador logado com sucesso"), this.handleRequestClose);
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

    handleRequestOpen = () => {
        if (this.props.auth.errorMessage.length > 0) {
            this.setState({ snackbarOpen : true });
        }
    }

    handleReqeustClose = () => this.setState({ snackbarOpen: false });

    render() {
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
                    <RaisedButton label="Entrar" 
                        primary={true} 
                        fullWidth={true} 
                        onTouchTap={this.handleLogin} />
                    <Snackbar open={this.state.snackbarOpen}
                        message={this.props.auth.errorMessage}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose} />
                </div>
            </div>
        );
    }
}

export default Login;