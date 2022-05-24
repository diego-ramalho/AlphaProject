import React, { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";

// const Home: FC<any> = (): ReactElement => {
//   return (
//     <Box
//       sx={{
//         flexGrow: 1,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Typography variant="h3">Home</Typography>
//     </Box>
//   );
// };

// export default Home;




import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import * as Icon from 'react-bootstrap-icons';

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Column 01', minWidth: 170 },
  { id: 'code', label: 'Column 02', minWidth: 100 },
  {
    id: 'population',
    label: 'Column 03',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Column 04',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Column 05',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('Item 01', 'I01', 1324171354, 3287263),
  createData('Item 02', 'I02', 1403500365, 9596961),
  createData('Item 03', 'I03', 60483973, 301340),
  createData('Item 04', 'I04', 327167434, 9833520),
  createData('Item 05', 'I05', 37602103, 9984670),
  createData('Item 06', 'I06', 25475400, 7692024),
  createData('Item 07', 'I07', 83019200, 357578),
  createData('Item 08', 'I08', 4857000, 70273),
  createData('Item 09', 'I09', 126577691, 1972550),
  createData('Item 10', 'I10', 126317000, 377973),
  createData('Item 11', 'I11', 67022000, 640679),
  createData('Item 12', 'I12', 67545757, 242495),
  createData('Item 13', 'I13', 146793744, 17098246),
  createData('Item 14', 'I14', 200962417, 923768),
  createData('Item 15', 'I15', 210147125, 8515767),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="PageContentTitle">Taratura <Icon.ArrowDownLeftSquareFill className='FontAwesomeIcon' /></div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
