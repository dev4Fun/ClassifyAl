import React, { Component } from 'react';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
    from 'material-ui/Table';

const styles = {
    headerRow: {
        color: 'rgb(158, 158, 158)'
    },

    header: {
        fontSize: '14px',
        paddingLeft: '12px',
        paddingRight: '12px',
        height: '3em',
    },

    numberCol: {
        width: '20%'
    },

    score: {
        width: '25%'
    },

    category: {
        fontWeight: '500',
        textTransform: 'capitalize'
    }
}

Object.assign(styles.category, styles.header);
Object.assign(styles.numberCol, styles.header);
Object.assign(styles.score, styles.header);

export default class ResultTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            selectable: false,

            enableSelectAll: false,
            showCheckboxes: false,

            height: '15em',
        };
    }

    render() {
        return (
            <Table
                fixedHeader={this.state.fixedHeader}
                fixedFooter={this.state.fixedFooter}
                selectable={this.state.selectable}
                height={this.state.height}
            >
                <TableHeader
                    displaySelectAll={this.state.showCheckboxes}
                    adjustForCheckbox={this.state.showCheckboxes}
                    enableSelectAll={this.state.enableSelectAll}
                >
                    <TableRow>
                        <TableHeaderColumn style={Object.assign({}, styles.numberCol, styles.headerRow)} tooltip="Rank">#</TableHeaderColumn>
                        <TableHeaderColumn style={Object.assign({}, styles.header, styles.headerRow)} tooltip="The Category">Category</TableHeaderColumn>
                        <TableHeaderColumn style={Object.assign({}, styles.score, styles.headerRow)} tooltip="The Score">Score</TableHeaderColumn>
                    </TableRow>
                </TableHeader>

                <TableBody
                    displayRowCheckbox={this.state.showCheckboxes}
                    stripedRows={this.state.stripedRows}
                >
                    {this.props.predictions ?
                        this.props.predictions.map((prediction, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={styles.numberCol} >{index + 1}</TableRowColumn>
                                <TableRowColumn style={styles.category} >{prediction.label}</TableRowColumn>
                                <TableRowColumn style={styles.score} >{prediction.score}</TableRowColumn>
                            </TableRow>))
                        : null
                    }
                </TableBody>
            </Table>
        )
    }
}