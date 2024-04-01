import React from 'react';
import { Typography, Container } from '@mui/material';
import { transaksiesTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const TransaksiesTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={transaksiesTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default TransaksiesTable;
