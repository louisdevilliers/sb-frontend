import React from 'react';
import { Typography, Container } from '@mui/material';
import { roetesTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const RoetesTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={roetesTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default RoetesTable;
