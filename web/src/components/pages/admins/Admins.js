import React, { Component } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import Add from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardActions } from 'material-ui/Card';

import PaginatedTable from '../../paginated-table/PaginatedTable';

class Admins extends Component {

    constructor(props) {
        super(props);
        this.state = {
            admins: this.generateAdmins()
        }
    }

    generateAdmins() {
        const admins = []
        for (var i = 0; i<100; i++) {
            var admin = {
                id: i,
                name: "Adm ".concat(i),
                cpf: "111.111.111-11",
                email: "admin".concat(i).concat("@admin.com")
            }
            admins.push(admin);
        }
        return admins;
    }

    render() {
        const fabStyle = {
            position: "fixed",
            bottom: "30px",
            right: "30px",
            zIndex: "200"
        }

        const tableContent = [
            { propertyName: 'name', columnName: 'Nome' },
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
                        limitPerTablePage={ 5 }
                        noItemsMessage="Não existe administradores cadastrados" />
                </Card>
                <FloatingActionButton style={ fabStyle }>
                    <Add />
                </FloatingActionButton>
            </div>
        )
    }
}

export default Admins;