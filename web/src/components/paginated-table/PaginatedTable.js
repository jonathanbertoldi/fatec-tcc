import React, { Component, PropTypes } from 'react';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';

import paginate from './paginate';
import PaginatedTableFooter from './PaginatedTableFooter';

class PaginatedTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tablePage: 0,
            tableOffset: 0
        }
    }
    
    renderTableHeader = () => (
        <TableHeader>
            <TableRow>
                { this.props.tableContent.map((content, index) => (
                    <TableHeaderColumn key={ index }>
                        { content.columnName } 
                    </TableHeaderColumn>
                )) }
            </TableRow>
        </TableHeader>
    );

    renderTableFooter = () => (
        <TableFooter adjustForCheckbox={ false }>
            <TableRow>
                <TableRowColumn>
                    <PaginatedTableFooter offset={ this.state.tableOffset }
                        total={ this.props.listItems.length }
                        limit={ this.props.limitPerTablePage }
                        onRightClick={ this.nextPage.bind(this) } 
                        onLeftClick={ this.prevPage.bind(this) } />
                </TableRowColumn>
            </TableRow>
        </TableFooter>
    )

    renderNoItemsMessage = () => (
        <TableRow selectable={ false }>
            <TableRowColumn>
                { this.props.noItemsMessage }
            </TableRowColumn>
        </TableRow>
    )

    renderTableBody = () => {
        if (!this.props.listItems.length) {
            return (
                <TableBody>
                    { this.renderNoItemsMessage() }
                </TableBody>
            )
        }

        var tableContent = this.props.tableContent;

        var pages = paginate(this.props.limitPerTablePage, this.props.listItems);

        var tableRows = pages[this.state.tablePage].items.map((item, index) => {
            return (
                <TableRow key={ index }>
                    { tableContent.map((property, index) => (
                        <TableRowColumn key={ index }>{ item[property.propertyName] }</TableRowColumn>
                    )) }
                </TableRow>
            )
        });

        return (
            <TableBody>
                { tableRows }
            </TableBody>
        ); 
    }

    nextPage = () => this.setState({ tableOffset: this.state.tableOffset + this.props.limitPerTablePage, tablePage: this.state.tablePage + 1 })

    prevPage = () => this.setState({ tableOffset: this.state.tableOffset - this.props.limitPerTablePage, tablePage: this.state.tablePage - 1 })

    render() {
        return(
            <Table>
                { this.renderTableHeader() }
                { this.renderTableBody() }
                { this.renderTableFooter() }
            </Table>
        )
    }
}

PaginatedTable.propTypes = {
    listItems: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    limitPerTablePage: PropTypes.number.isRequired,
    noItemsMessage: PropTypes.string.isRequired,
    tableContent: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}

export default PaginatedTable;