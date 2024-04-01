import React from 'react';
import { Typography, Container } from '@mui/material';
import { verpakkingsTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const VerpakkingsTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={verpakkingsTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default VerpakkingsTable;
