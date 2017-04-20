import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as adminActions from '../../../actions/adminActions';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

class CreateAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputErrors: {
                name: "",
                email: "",
                cpf: "",
                login: "",
                senha: ""
            }
        }
    }
    
    render() {
        return (
            <Card>
                <CardHeader title="Cadastro"
                    subtitle="Administradores" />
                <CardText>
                    <TextField floatingLabelText="Nome" 
                        errorText={ this.state.inputErrors.name }
                        ref="inputName" />
                    <TextField floatingLabelText="E-Mail" 
                        errorText={ this.state.inputErrors.email }
                        ref="inputName" />
                    <TextField floatingLabelText="CPF" 
                        errorText={ this.state.inputErrors.cpf }
                        ref="inputName" />
                    <DatePicker floatingLabelText="Data de Nascimento" />
                    <TextField floatingLabelText="Login" 
                        errorText={ this.state.inputErrors.login }
                        ref="inputName" />
                    <TextField floatingLabelText="Senha" 
                        errorText={ this.state.inputErrors.senha }
                        ref="inputName" />
                </CardText>
                <CardActions>
                    <FlatButton label="Cancelar" />
                    <RaisedButton primary={ true } label="Salvar" />
                </CardActions>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    const { admin } = state;
    return {
        admin
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(adminActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdmin);