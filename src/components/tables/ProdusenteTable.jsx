import React from 'react';
import { Typography, Container } from '@mui/material';
import { produsenteTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const ProdusenteTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={produsenteTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default ProdusenteTable;
