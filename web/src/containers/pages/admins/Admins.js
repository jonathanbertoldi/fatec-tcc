import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as adminActions from '../../../actions/adminActions';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import Add from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardActions } from 'material-ui/Card';

import PaginatedTable from '../../../components/paginated-table/PaginatedTable';

class Admins extends Component {

    componentDidMount() {
        this.props.getAdmins();
    }

    render() {
        const fabStyle = {
            position: "fixed",
            bottom: "16px",
            right: "16px",
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
                    <CardHeader title="Consulta" subtitle="Administradores" />
                    <CardActions>
                        <FlatButton label="Detalhes" />
                        <FlatButton label="Alterar" />
                        <FlatButton label="Remover" />
                    </CardActions>
                    <PaginatedTable listItems={ this.props.admin.admins } 
                        tableContent={ tableContent }
                        limitPerTablePage={ 10 }
                        noItemsMessage="Não existe administradores cadastrados" />
                </Card>
                <FloatingActionButton style={ fabStyle }
                     containerElement={<Link to="/admins/create" />} >
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