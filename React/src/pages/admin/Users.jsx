import React, { ReactElement, FC, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import * as Icon from 'react-bootstrap-icons';

// http get request
import User from '../../components/User';
import axiosUsers from '../../api/axiosinstance';

const columns = [
  //{ id: 'id', label: 'Id', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  // {
  //   id: 'population',
  //   label: 'Column 03',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString('en-US'),
  // },
  // {
  //   id: 'size',
  //   label: 'Column 04',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString('en-US'),
  // },
  // {
  //   id: 'density',
  //   label: 'Column 05',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toFixed(2),
  // },
];

const Users = () =>
{
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [people, setPeople] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);

  useEffect(() => { fetchPeopleHandler(); }, []);

  const handleChangePage = (event, newPage) => { setPage(newPage); };

  const handleChangeRowsPerPage = (event) =>
  {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchPeopleHandler = async () =>
  {
    if (isLoading) return;
    try
    {
      setError(null);
      setIsLoading(true);
      const response = await axiosUsers.get('User/GetUsers');

      setPeople(response.data);
      setIsLoading(false);
    } catch (error)
    {
      console.log(error);
      setError(error.message);
    }
  }

  const parsePeople = () =>
  {
    return people.map((person) => { return <User name={person.name} /> })
  }

  let content;

  if (error) { content = <h1>{error}</h1>; }
  else if (people.length === 0 && !isLoading) { content = <h1>There are no movies yet!</h1>; }
  else if (isLoading) { content = <h1>Loading...</h1>; }
  else { content = <User people={people} />; }

  return (
    <>
      <div className="PageContentTitle">Users <Icon.ArrowDownLeftSquareFill className='FontAwesomeIcon' /></div>
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
              {people
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((person, index) =>
                {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) =>
                      {
                        const value = person[column.id];
                        return (
                          <TableCell key={index} align={column.align}>
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
          count={people.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Itens por página"}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Paper>
      {/* <React.Fragment>
        <section>
          {isLoading ? <h1>No button for now</h1> : <button onClick={fetchPeopleHandler}>Fetch Users</button>}
        </section>
        <section>
          {parsePeople()}
        </section>
        <section>
          {content}
        </section>
      </React.Fragment> */}
    </>
  );
};

// const getUsers = () =>
// {
//   const url = 'https://localhost:7060/api/';
//   const getAllUsers = () =>
//   {
//     axios.get('https://localhost:7060/api/User/GetUsers')
//   }
//   axios.get(`${url}User/GetUsers`)
//     .then(response =>
//     {
//       const allUsers = response.data;
//     }
//     )
//     .catch(error => console.error(`Error: ${error}`));
// }

export default Users;