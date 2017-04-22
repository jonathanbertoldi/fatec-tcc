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
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { formItemRowStyle, formItemRowColumnStyle, formItemRowOneFourthStyle, formItemRowThreeFourthStyle } from './style';
import MaskedTextField from '../../../components/masked-text-field/MaskedTextField';

class CreateAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 1,
            finished: false,
            address: this.emptyAddress,
            phones: [],
            selectedItem: null,
            inputNameError: "",
            inputEmailError: "",
            inputCpfError: "",
            inputBirthDateError: "",
            inputLoginError: "",
            inputPasswordError: "",
            inputAddressCepError: "",
            inputAddressNumberError: "",
            inputPhoneTypeError: "",
            inputPhoneNumberError: ""
        }
    }

    emptyAddress = {
        logradouro: "",
        cep: "",
        complemento: "",
        numero: "",
        estado: "",
        cidade: "",
        bairro: ""
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

    handleSelectChange = (event, index, value) => this.setState({ selectedItem: value })

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
                    <ListItem rightIconButton={ <IconButton onTouchTap={() => this.handleDeletePhone(index)}><Remove /></IconButton> }
                        primaryText={ phone.numero }
                        secondaryText={ phone.descricao } />
                    { index === this.state.phones.length - 1 ? null : <Divider/>}
                </div>
            )
        })
    }

    clearPhoneInputErrors = () => this.setState({ inputPhoneNumberError: "", inputPhoneTypeError: "" })

    isPhoneTypeValid = () => this.state.selectedItem !== null;

    isPhoneNumberValid = () => this.refs.inputPhoneNumber.state.value.length >= 13

    validatePhoneInputs = () => {
        this.clearPhoneInputErrors();
        var r = true
        if (!this.isPhoneTypeValid()) {
            this.setState({ inputPhoneTypeError: "Selecione um tipo válido" })
            r = false;
        }
        if (!this.isPhoneNumberValid()) {
            this.setState({ inputPhoneNumberError: "Insira um número de telefone válido" })
            r = false;
        }
        return r;
    }

    handleAddPhone = () => {
        if (this.validatePhoneInputs()) {
            const phone = {
                descricao: this.refs.inputPhoneType.props.children[this.state.selectedItem].props.primaryText,
                numero: this.refs.inputPhoneNumber.state.value
            };
            var phones = this.state.phones.slice();
            phones.push(phone);
            this.setState({ phones: phones })
            this.setState({ selectedItem: null })
            this.refs.inputPhoneNumber.state.value = ""
        }
    }

    handleDeletePhone = (index) => {
        var phones = this.state.phones.slice();
        phones.splice(index, 1);
        this.setState({ phones });
    }

    clearCepError = () => this.setState({ inputAddressCepError: "" });

    isCepValid = () => this.refs.inputCep.state.value.length === 9

    validateAddressCep = () => {
        this.clearCepError();
        var r = true;
        if (!this.isCepValid()) {
            this.setState({ inputAddressCepError: "Insira um CEP válido", address: this.emptyAddress });
            r = false;
        }
        return r;
    }

    cepNotFound = () => {
        this.setState({ inputAddressCepError: this.props.admin.viaCepError })
        this.setState({ address: this.emptyAddress });
    }

    cepFound = () => {
        const viaCepAddress = this.props.admin.address;
        const address = {
            logradouro: viaCepAddress.logradouro,
            cep: this.refs.inputCep.state.value,
            complemento: viaCepAddress.complemento,
            estado: viaCepAddress.uf,
            cidade: viaCepAddress.localidade,
            bairro: viaCepAddress.bairro
        }
        this.setState({ address: address });
    }

    handleGetAddress = () => {
        if (this.validateAddressCep()) {
            var cep = this.refs.inputCep.state.value;
            cep = cep.replace('-', '');
            this.props.getAddress(cep)
                .then(this.cepFound, this.cepNotFound);
        }
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
                                                onBlur={ this.handleGetAddress.bind(this) }
                                                errorText={ this.state.inputAddressCepError }
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
                                            value={ this.state.address.logradouro }
                                            ref="inputStreet" />
                                    </div>
                                    <div style={ formItemRowStyle }>
                                        <TextField floatingLabelText="Complemento" 
                                            disabled={ true }
                                            fullWidth={ true }
                                            value={ this.state.address.complemento }                 
                                            ref="inputComplement" />
                                    </div>
                                    <div style={ formItemRowStyle }>
                                        <div style={ formItemRowColumnStyle }>
                                            <TextField floatingLabelText="Cidade" 
                                                disabled={ true }
                                                fullWidth={ true }   
                                                value={ this.state.address.cidade }                 
                                                ref="inputCity" />
                                        </div>
                                        <div style={ formItemRowColumnStyle }>
                                            <TextField floatingLabelText="Estado" 
                                                disabled={ true }
                                                fullWidth={ true }
                                                value={ this.state.address.estado }
                                                ref="inputState" />
                                        </div>
                                        <div style={ formItemRowColumnStyle }>
                                            <TextField floatingLabelText="Bairro" 
                                                disabled={ true }
                                                fullWidth={ true }
                                                value={ this.state.address.bairro }                        
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
                                            <SelectField floatingLabelText="Tipo"
                                                value={ this.state.selectedItem }
                                                onChange={ this.handleSelectChange }
                                                errorText={ this.state.inputPhoneTypeError }
                                                labelStyle={{paddingTop: "4px"}}
                                                ref="inputPhoneType"
                                                fullWidth={ true }>
                                                <MenuItem value={ 0 } primaryText="Residencial" />
                                                <MenuItem value={ 1 } primaryText="Celular" />
                                            </SelectField>
                                        </div>
                                        <div style={ formItemRowThreeFourthStyle}>
                                            <MaskedTextField floatingLabelText="Número" 
                                                mask="(99) 999999999"
                                                defaultValue=""
                                                errorText={ this.state.inputPhoneNumberError }
                                                ref="inputPhoneNumber"
                                                fullWidth={ true } />
                                        </div>
                                    </div>
                                    <div style={ formItemRowStyle }>
                                        <IconButton onTouchTap={this.handleAddPhone.bind(this)}>
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