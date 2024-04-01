import React from 'react';
import { Typography, Container } from '@mui/material';
import { pryseTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const PryseTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={pryseTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default PryseTable;
