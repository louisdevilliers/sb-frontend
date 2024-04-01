import React from 'react';
import { Typography, Container } from '@mui/material';
import { uitlaaieTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const UitlaaieTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={uitlaaieTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default UitlaaieTable;
