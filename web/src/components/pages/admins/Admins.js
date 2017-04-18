import React, { Component } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import Add from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';

import PaginatedTable from '../../paginated-table/PaginatedTable';
import PaginationFooter from '../../pagination-footer/PaginationFooter';

class Admins extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tablePage: 0,
            tableOffset: 0,
            tableLimit: 10,
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
        return [];
        //return admins;
    }

    renderTableRow() {

        if (!this.state.admins.length) {
            return (
                <TableRow selectable={ false }>
                    <TableRowColumn>
                        Não existem administradores cadastrados
                    </TableRowColumn>
                </TableRow>
            )
        }

        function take(n, list) {
            return list.slice(0, n);
        }

        function drop(n, list) {
            return list.slice(n);
        }

        function concat(lists) {
            return Array.prototype.concat.apply(this, lists);
        }

        function divide(n, list) {
            if (list.length) {
                var head = take(n, list);
                var tail = drop(n, list);
                return concat.call([head], [divide(n, tail)]);
            } else return [];
        }

        function paginate(n, list) {
            return divide(n, list).map((items, index) => {
                var number = n * index;
                return {
                    start: number + 1,
                    end: number + items.length,
                    items: items
                };
            });
        }

        var pages = paginate(this.state.tableLimit, this.state.admins);

        return pages[this.state.tablePage].items.map(admin => {
            return (
                <TableRow key={ admin.id } >
                    <TableRowColumn>{ admin.name }</TableRowColumn>
                    <TableRowColumn>{ admin.cpf }</TableRowColumn>
                    <TableRowColumn>{ admin.email }</TableRowColumn>
                </TableRow>
            )
        });
    }

    nextPage = () => this.setState({ tableOffset: this.state.tableOffset + this.state.tableLimit, tablePage: this.state.tablePage + 1 })

    prevPage = () => this.setState({ tableOffset: this.state.tableOffset - this.state.tableLimit, tablePage: this.state.tablePage - 1 })

    render() {
        const fabStyle = {
            position: "fixed",
            bottom: "30px",
            right: "30px",
            zIndex: "200"
        }

        const tableHeaders = ["Nome", "CPF", "E-Mail"];

        return (
            <div>
                <Card>
                    <CardHeader title="Consulta" subtitle="Administradores cadastrados" />
                    <CardActions>
                        <FlatButton label="Detalhes" />
                        <FlatButton label="Alterar" />
                        <FlatButton label="Remover" />
                    </CardActions>
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
                                    <PaginationFooter offset={this.state.tableOffset}
                                        total={this.state.admins.length} 
                                        limit={this.state.tableLimit}
                                        onRightClick={ this.nextPage.bind(this) } 
                                        onLeftClick={ this.prevPage.bind(this) } />
                                </TableRowColumn>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Card>
                <br />
                <br />
                <Card>
                    <CardHeader title="Teste" subtitle="Componentização" />
                    <PaginatedTable listItems={ this.state.admins } 
                        tableHeaders={ tableHeaders }
                        limitPerTablePage={ 5 }
                        noItemsMessage="Não tem adm aqui poar" />
                </Card>
                <FloatingActionButton style={ fabStyle }>
                    <Add />
                </FloatingActionButton>
            </div>
        )
    }
}

export default Admins;