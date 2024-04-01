import React from 'react';
import { Typography, Container } from '@mui/material';
import { kultivarsTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const KultivarsTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={kultivarsTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default KultivarsTable;
