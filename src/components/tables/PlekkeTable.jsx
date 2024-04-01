import React from 'react';
import { Typography, Container } from '@mui/material';
import { plekkeTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const PlekkeTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={plekkeTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default PlekkeTable;
