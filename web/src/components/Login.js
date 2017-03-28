import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {

    constructor() {
        super();
        this.loginAdmin = this.loginAdmin.bind(this);
    }

    loginAdmin() {
        var credentials = {
            username: this.refs.inputUser.getValue(),
            password: this.refs.inputPassword.getValue()
        }
        this.props.loginAdmin(credentials);
    }

    render() {
        const windowStyle = {
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }

        const loginStyle = {
            display: "flex",
            flexWrap: "wrap",
            padding: "20px",
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
                    <TextField floatingLabelText="User" fullWidth={true} ref="inputUser" />
                    <TextField floatingLabelText="Password" fullWidth={true} type="password" ref="inputPassword" />
                    <span style={{ margin: "5px", width: "100%" }}></span>
                    <RaisedButton label="Log-in" primary={true} fullWidth={true} onTouchTap={this.loginAdmin} />
                </div>
            </div>
        );
    }
}

export default Login;