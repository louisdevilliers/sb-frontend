import React from 'react';
import { Typography, Container } from '@mui/material';
import { paletteTableConfig } from '../../utility/entityTableConfig';
import {EntityTable} from '../common/EntityTable'

const PaletteTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <EntityTable
      columns={paletteTableConfig.columns}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default PaletteTable;
