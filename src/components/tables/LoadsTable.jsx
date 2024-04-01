import React from 'react';
import { Typography, Container } from '@mui/material';
import { loadsTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const LoadsTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={loadsTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default LoadsTable;
