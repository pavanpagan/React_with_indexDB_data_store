import React, { Component } from 'react';
import {BootstrapTable, 
       TableHeaderColumn} from 'react-bootstrap-table';
// import '../css/Table.css';
// import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
 
 
class Table1 extends Component {
  render() {
    return (
      <div className="localTable">
        <BootstrapTable data={this.props.data}>
          <TableHeaderColumn className="cols" isKey dataField='username'>
            User Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField='password'>
            Password
          </TableHeaderColumn>
          <TableHeaderColumn dataField='email'>
            Email
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
 
export default Table1;