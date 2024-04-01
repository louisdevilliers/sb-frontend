import React from 'react';
import { Typography, Container } from '@mui/material';
import { markteTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const MarkteTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={markteTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default MarkteTable;
