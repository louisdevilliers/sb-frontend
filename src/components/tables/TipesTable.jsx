import React from 'react';
import { Typography, Container } from '@mui/material';
import { tipesTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const TipesTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={tipesTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default TipesTable;
