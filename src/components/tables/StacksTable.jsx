import React from 'react';
import { Typography, Container } from '@mui/material';
import { stacksTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const StacksTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={stacksTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default StacksTable;
