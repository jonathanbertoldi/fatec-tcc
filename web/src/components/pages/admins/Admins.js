import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as adminActions from '../../../actions/adminActions';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import Add from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardActions } from 'material-ui/Card';

import PaginatedTable from '../../paginated-table/PaginatedTable';

class Admins extends Component {

    constructor(props) {
        super(props);
        this.state = {
            admins: []
        }
    }

    componentDidMount() {
        this.props.getAdmins()
            .then(() => this.setState({ admins: this.props.admin.admins }));
    }

    render() {
        const fabStyle = {
            position: "fixed",
            bottom: "14px",
            right: "14px",
            zIndex: "200"
        }

        const tableContent = [
            { propertyName: 'nome', columnName: 'Nome' },
            { propertyName: 'cpf', columnName: 'CPF' },
            { propertyName: 'email', columnName: 'E-Mail' }
        ];

        return (
            <div>
                <Card>
                    <CardHeader title="Consulta" subtitle="Administradores cadastrados" />
                    <CardActions>
                        <FlatButton label="Detalhes" />
                        <FlatButton label="Alterar" />
                        <FlatButton label="Remover" />
                    </CardActions>
                    <PaginatedTable listItems={ this.state.admins } 
                        tableContent={ tableContent }
                        limitPerTablePage={ 10 }
                        noItemsMessage="Não existe administradores cadastrados" />
                </Card>
                <FloatingActionButton style={ fabStyle }>
                    <Add />
                </FloatingActionButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admins);