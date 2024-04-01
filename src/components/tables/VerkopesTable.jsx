import React from 'react';
import { Typography, Container } from '@mui/material';
import { verkopesTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const VerkopesTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={verkopesTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default VerkopesTable;
