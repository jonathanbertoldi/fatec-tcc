import React, { Component } from 'react';

import { Card, CardHeader } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';

import PaginationFooter from '../../pagination-footer/PaginationFooter';

class Admins extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tablePage: 0,
            tableOffset: 0,
            tableLimit: 8,
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
        return (
            <div>
                <Card>
                    <CardHeader title="Consulta" subtitle="Administradores cadastrados" />>
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
            </div>
        )
    }
}

export default Admins;