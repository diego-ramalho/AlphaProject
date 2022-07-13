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

import User from '../components/User';
import { useUserActions } from '../_actions';

const columns = [
  //{ id: 'id', label: 'Id', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 }
];

const About = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //const [people, setPeople] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const [people, setPeople] = useState([]);

  const userActions = useUserActions();

  // useEffect(() => {
  //   userActions.getAll().then(x => setUsers(x));
  // }, []);

  useEffect(() => { fetchPeopleHandler(); }, []);

  const handleChangePage = (event, newPage) => { setPage(newPage); };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchPeopleHandler = async () => {
    if (isLoading) return;
    try {
      setError(null);
      setIsLoading(true);
      const response = userActions.getAll().then(x => setPeople(x));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  const parsePeople = () => {
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
                .map((person, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
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
    </>
  );
};

export default About;