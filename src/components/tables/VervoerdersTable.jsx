import React from 'react';
import { Typography, Container } from '@mui/material';
import { vervoerdersTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const VervoerdersTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={vervoerdersTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default VervoerdersTable;
