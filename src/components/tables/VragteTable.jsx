import React from 'react';
import { Typography, Container } from '@mui/material';
import { vragteTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const VragteTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={vragteTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default VragteTable;
