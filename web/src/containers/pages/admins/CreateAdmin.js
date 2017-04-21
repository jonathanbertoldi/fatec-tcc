import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as adminActions from '../../../actions/adminActions';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/action/delete';

class CreateAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 2,
            finished: false,
            phones: [
                { key: 1, errorText: "" },
                { key: 2, errorText: "" },
                { key: 3, errorText: "" }
            ],
            selectedItem: 0,
            inputErrors: {
                name: "",
                email: "",
                cpf: "",
                birthDate: "",
                login: "",
                password: "",
                cep: "",
                number: ""
            }
        }
    }

    handleNextStep = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrevStep = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    renderStepActions(step) {
        const {stepIndex} = this.state;

        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label={stepIndex === 2 ? 'Salvar' : 'Próximo'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={this.handleNextStep}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Voltar"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={this.handlePrevStep}
                    />
                )}
            </div>
        );
    }

    renderPhoneForm = () => {
        return this.state.phones.map((phone, index) => {
            return (
                <div key={ index } >
                    <TextField floatingLabelText="Descrição"
                        errorText={ phone.errorText } />
                    <TextField floatingLabelText="Número" 
                        errorText={ phone.errorText } />
                    <IconButton>
                        <Remove />
                    </IconButton>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader title="Cadastro"
                        subtitle="Administradores" />
                    <CardText>
                        <Stepper activeStep={ this.state.stepIndex } orientation="vertical" >
                            <Step>
                                <StepLabel>Dados Pessoais</StepLabel>
                                <StepContent>
                                    <TextField floatingLabelText="Nome" 
                                        errorText={ this.state.inputErrors.name }
                                        ref="inputName" />
                                    <TextField floatingLabelText="E-Mail" 
                                        errorText={ this.state.inputErrors.email }
                                        ref="inputEmail" />
                                    <TextField floatingLabelText="CPF" 
                                        errorText={ this.state.inputErrors.cpf }
                                        ref="inputCpf" />
                                    <TextField floatingLabelText="Login" 
                                        errorText={ this.state.inputErrors.login }
                                        ref="inputLogin" />
                                    <TextField floatingLabelText="Senha" 
                                        errorText={ this.state.inputErrors.senha }
                                        ref="inputPassword" />
                                    <DatePicker floatingLabelText="Data de Nascimento" 
                                        cancelLabel="Cancelar"
                                        errorText={ this.state.inputErrors.birthDate }
                                        DateTimeFormat={ global.Intl.DateTimeFormat } 
                                        locale="pt-BR"
                                        ref="inputBirthDate" />     
                                    { this.renderStepActions(0) }       
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel>Endereço</StepLabel>
                                <StepContent>
                                    <TextField floatingLabelText="CEP" 
                                        errorText={ this.state.inputErrors.cep }
                                        ref="inputCep" />
                                    <TextField floatingLabelText="Estado" 
                                        disabled={ true }                                    
                                        ref="inputState" />
                                    <TextField floatingLabelText="Cidade" 
                                        disabled={ true }                                    
                                        ref="inputCity" />
                                    <TextField floatingLabelText="Bairro" 
                                        disabled={ true }                                    
                                        ref="inputNeighborhood" />
                                    <TextField floatingLabelText="Número" 
                                        errorText={ this.state.inputErrors.number }
                                        ref="inputNumber" />
                                    <TextField floatingLabelText="Complemento" 
                                        disabled={ true }                                    
                                        ref="inputComplement" />
                                    <TextField floatingLabelText="Logradouro" 
                                        disabled={ true }
                                        fullWidth={ true }
                                        ref="inputStreet" />
                                    { this.renderStepActions(1) }
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel>Contato</StepLabel>
                                <StepContent>
                                    { this.renderPhoneForm() }
                                    <IconButton>
                                        <Add />
                                    </IconButton>
                                    { this.renderStepActions(2) }
                                </StepContent>
                            </Step>
                        </Stepper>
                    </CardText>
                </Card>
            </div>
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