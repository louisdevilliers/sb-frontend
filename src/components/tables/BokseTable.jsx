import React from 'react';
import { Typography, Container } from '@mui/material';
import { bokseTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const BokseTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={bokseTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default BokseTable;
