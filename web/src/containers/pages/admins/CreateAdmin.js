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
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';

import { formItemRowStyle, formItemRowColumnStyle, formItemRowOneFourthStyle, formItemRowThreeFourthStyle } from './style';
import MaskedTextField from '../../../components/masked-text-field/MaskedTextField';

class CreateAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 2,
            finished: false,
            phones: [
                { type: "Residencial", number: "(11) 2962-5118" },
                { type: "Celular", number: "(11) 96595-6795" }
            ],
            selectedItem: 0,
            inputNameError: "",
            inputEmailError: "",
            inputCpfError: "",
            inputBirthDateError: "",
            inputLoginError: "",
            inputPasswordError: "",
            inputAddresCepError: "",
            inputAddresNumberError: "",
            inputPhoneTypeError: "",
            inputPhoneNumberError: ""
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

    renderPhoneList = () => {
        return this.state.phones.map((phone, index) => {
            return (
                <div key={ index }>
                    <ListItem rightIconButton={ <IconButton><Remove /></IconButton> }
                        primaryText={ phone.number }
                        secondaryText={ phone.type } />
                    { index === this.state.phones.length - 1 ? null : <Divider/>}
                </div>
            )
        })
    }

    clearPhoneInputErrors = () => this.setState({ inputPhoneNumberError: "", inputPhoneTypeError: "" })

    validatePhoneInputs = () => {
        this.clearPhoneInputErrors();
        
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
                                    <div style={ formItemRowStyle }>
                                        <TextField floatingLabelText="Nome"     
                                            errorText={ this.state.inputNameError }
                                            fullWidth={ true }
                                            ref="inputName" />
                                    </div>
                                    <div style={ formItemRowStyle }>
                                        <div style={ formItemRowColumnStyle }>
                                            <MaskedTextField floatingLabelText="CPF"
                                                defaultValue=""
                                                mask="999.999.999-99"
                                                errorText={ this.state.inputCpfError }
                                                fullWidth={ true }
                                                ref="inputCpf" />
                                        </div>
                                        <div style={ formItemRowColumnStyle }>
                                            <DatePicker floatingLabelText="Data de Nascimento" 
                                                cancelLabel="Cancelar"
                                                errorText={ this.state.inputBirthDateError }
                                                DateTimeFormat={ global.Intl.DateTimeFormat } 
                                                locale="pt-BR"
                                                fullWidth={ true }
                                                ref="inputBirthDate" />     
                                        </div>
                                    </div>
                                    <div style={ formItemRowStyle }>
                                        <TextField floatingLabelText="E-Mail" 
                                            errorText={ this.state.inputEmailError }
                                            fullWidth={ true }
                                            ref="inputEmail" />
                                    </div>
                                    <div style={ formItemRowStyle }>
                                        <div style={ formItemRowColumnStyle }>
                                            <TextField floatingLabelText="Login" 
                                                errorText={ this.state.inputLoginError }
                                                fullWidth={ true }
                                                ref="inputLogin" />
                                        </div>
                                        <div style={ formItemRowColumnStyle }>
                                            <TextField floatingLabelText="Senha" 
                                                errorText={ this.state.inputPasswordError }
                                                fullWidth={ true }
                                                ref="inputPassword" />   
                                        </div>
                                    </div>
                                    { this.renderStepActions(0) }       
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel>Endereço</StepLabel>
                                <StepContent>
                                    <div style={ formItemRowStyle }>
                                        <div style={ formItemRowColumnStyle }>
                                            <MaskedTextField floatingLabelText="CEP" 
                                                defaultValue=""
                                                mask="99999-999"
                                                errorText={ this.state.inputAddresCepError }
                                                fullWidth={ true }
                                                ref="inputCep" />
                                        </div>
                                        <div style={ formItemRowColumnStyle }>
                                            <TextField floatingLabelText="Número" 
                                                errorText={ this.state.inputAddresNumberError }
                                                fullWidth={ true }
                                                ref="inputNumber" />
                                        </div>
                                    </div>
                                    <div style={ formItemRowStyle }>
                                        <TextField floatingLabelText="Logradouro" 
                                            disabled={ true }
                                            fullWidth={ true }
                                            ref="inputStreet" />
                                    </div>
                                    <div style={ formItemRowStyle }>
                                        <TextField floatingLabelText="Complemento" 
                                            disabled={ true }
                                            fullWidth={ true }                                    
                                            ref="inputComplement" />
                                    </div>
                                    <div style={ formItemRowStyle }>
                                        <div style={ formItemRowColumnStyle }>
                                            <TextField floatingLabelText="Cidade" 
                                                disabled={ true }
                                                fullWidth={ true }                                    
                                                ref="inputCity" />
                                        </div>
                                        <div style={ formItemRowColumnStyle }>
                                            <TextField floatingLabelText="Estado" 
                                                disabled={ true }
                                                fullWidth={ true }                                    
                                                ref="inputState" />
                                        </div>
                                        <div style={ formItemRowColumnStyle }>
                                            <TextField floatingLabelText="Bairro" 
                                                disabled={ true }
                                                fullWidth={ true }                                    
                                                ref="inputNeighborhood" />
                                        </div>
                                    </div>
                                    { this.renderStepActions(1) }
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel>Contato</StepLabel>
                                <StepContent>
                                    <div style={ formItemRowStyle } >
                                        <div style={ formItemRowOneFourthStyle }>
                                            <TextField floatingLabelText="Descrição"
                                                errorText={ this.state.inputPhoneTypeError }
                                                fullWidth={ true } />
                                        </div>
                                        <div style={ formItemRowThreeFourthStyle}>
                                            <MaskedTextField floatingLabelText="Número" 
                                                mask="(99) 999999999"
                                                defaultValue=""
                                                errorText={ this.state.inputPhoneNumberError }
                                                fullWidth={ true } />
                                        </div>
                                    </div>
                                    <div style={ formItemRowStyle }>
                                        <IconButton onTouchTap={this.validatePhoneInputs.bind(this)}>
                                            <Add />
                                        </IconButton>
                                    </div>
                                    <List>
                                        { this.renderPhoneList() }
                                    </List>
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