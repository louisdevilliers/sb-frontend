import React from 'react';
import { Typography, Container } from '@mui/material';
import { wekeTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const WekeTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={wekeTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default WekeTable;
