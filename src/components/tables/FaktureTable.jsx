import React from 'react';
import { Typography, Container } from '@mui/material';
import { faktureTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const FaktureTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={faktureTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default FaktureTable;
