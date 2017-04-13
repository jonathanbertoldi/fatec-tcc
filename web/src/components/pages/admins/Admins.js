import React, { Component } from 'react';

import { Card, CardHeader } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';

import PaginationFooter from '../../pagination-footer/PaginationFooter';

class Admins extends Component {

    constructor(props) {
        super(props);
        this.state = {
            admins: this.generateAdmins()
        }
    }
    generateAdmins() {
        const admins = []
        for (var i = 0; i<=100; i++) {
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

    renderTableRow() {
        return this.state.admins.map(admin => {
            return (
                <TableRow key={ admin.id } >
                    <TableRowColumn>{ admin.name }</TableRowColumn>
                    <TableRowColumn>{ admin.cpf }</TableRowColumn>
                    <TableRowColumn>{ admin.email }</TableRowColumn>
                </TableRow>
            )
        });
    }

    render() {
        return (
            <div>
                <h2>Administradores</h2>
                <Card>
                    <CardHeader title="Consulta" subtitle="Administradores cadastrados"></CardHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Nome</TableHeaderColumn>
                                <TableHeaderColumn>CPF</TableHeaderColumn>
                                <TableHeaderColumn>E-Mail</TableHeaderColumn>                              
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { this.renderTableRow() }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableRowColumn>
                                    <PaginationFooter offset={0} total={this.state.admins.length} limit={10} onPageClick={() => console.log("chamou")} />
                                </TableRowColumn>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Card>
            </div>
        )
    }
}

export default Admins;