import React from 'react';
import { Typography, Container } from '@mui/material';
import { kleureTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const KleureTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={kleureTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default KleureTable;
