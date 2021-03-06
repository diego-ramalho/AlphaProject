import React, { ReactElement, FC, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
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

import { useDispatch, useSelector } from 'react-redux';
import { updateZone } from '../store/zoneSlice';
import { searchRegister } from '../store/searchRegisterSlice';

import { useRegisterActions, useZoneActions } from '../_actions';

const columns = [
  // { id: 'id', label: 'Id', minWidth: 50 },
  { id: 'address', label: 'Address', minWidth: 170 },
  { id: 'number', label: 'Number', minWidth: 100 },
  { id: 'zoneId', label: 'Zone', minWidth: 100 }
];

const Taraturas = () =>
{
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //const [people, setPeople] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const [people, setPeople] = useState([]);
  const [zoneList, setZoneList] = useState([]);

  const userActions = useRegisterActions();
  const zoneActions = useZoneActions();

  const dispatch = useDispatch();

  const zoneStore = useSelector(state => state.zone);
  const searchRegisterStore = useSelector(state => state.searchRegister);

  const pathView = '/AlphaProject/Registers/view';

  // useEffect(() => {
  //   userActions.getAll().then(x => setUsers(x));
  // }, []);

  useEffect(() =>
  {
    //userActions.getAll().then(x => setUsers(x));
    //userActions.getAll().then(x => setPeople(x)).filter(r => r.zoneId == zoneStore);
    //alert(zoneStore);
    //setTimeout(userActions.getAll().then(x => setPeople(x)), 3000)
    setIsLoading(true);
    userActions.getAll().then(x => setPeople(x.filter(x => zoneStore != 0 ? x.zoneId == zoneStore : x.zoneId > 0)));
    zoneActions.getAll().then(x => { setZoneList(x); });
    setIsLoading(false);
  }, [zoneStore]);

  //useEffect(() => { fetchPeopleHandler(); }, []);

  const handleChangePage = (event, newPage) => { setPage(newPage); };

  const handleSearch = (event) =>
  {
    let inputValue = event.target.value;

    // if (inputValue.length >= 3)
    // {
    //testeee = {...people.filter(x => x.address.includes(inputValue))};
    dispatch(searchRegister(inputValue))
    //alert(inputValue);
    // userActions.getAll()
    //   .then(x => setPeople(x
    //     .filter(x => zoneStore != 0 ? x.zoneId == zoneStore : x.zoneId > 0)
    //     .filter(x => x.address.includes(inputValue))));
    //}
  };

  const handleChangeRowsPerPage = (event) =>
  {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const fetchPeopleHandler = async () =>
  // {
  //   if (isLoading) return;
  //   try
  //   {
  //     setError(null);
  //     setIsLoading(true);
  //     //const response = userActions.getAll().then(x => setPeople(x));
  //     const response = setTimeout(userActions.getAll().then(x => setPeople(x)), 3000);
  //     const responseZone = zoneActions.getAll().then(x => setZoneList(x));

  //     setIsLoading(false);
  //   } catch (error)
  //   {
  //     console.log(error);
  //     setError(error.message);
  //   }
  // }

  // const parsePeople = () =>
  // {
  //   return people.map((person) => { return <User name={person.name} /> })
  // }

  let content;

  if (error) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>{error}</div></TableCell></TableRow>; }
  else if (people.filter(x => x.address.includes(searchRegisterStore)).length === 0 && !isLoading) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>There are no registers!</div></TableCell></TableRow>; }
  else if (isLoading) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>Loading...</div></TableCell></TableRow>; }
  // else { content = <User people={people} />; }

  //const zone = useSelector(state => state.zone);

  return (
    <>
      <div className="PageContentTitle">Taratura <Icon.ArrowDownLeftSquareFill className='FontAwesomeIcon' /></div>


      <div class="input-group">
        {/* <Icon.Search className='Input-FontAwesomeIcon' /> */}
        <input id="search" type="text" class="form-control" name="search" placeholder="search by address" onChange={handleSearch} />
      </div><br />


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

              {content}

              {people
                //.filter(x => zoneStore != 0 ? x.zoneId == zoneStore : x.zoneId > 0)
                .filter(x => x.address.includes(searchRegisterStore))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((person, index) =>
                {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) =>
                      {
                        let value = person[column.id];
                        if (column.id == 'zoneId')
                        {
                          value = zoneList.filter(x => x.id === person.zoneId).map(x => x.zoneName);
                        }
                        if (column.id == 'address')
                        {
                          // value = person.id + " - " + person.address;
                          value = <Link to={`${pathView}/${person.id}`} className="link-to-view">{person.address}</Link>
                        }
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
          count={people.filter(x => x.address.includes(searchRegisterStore)).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Itens por p??gina"}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Paper>
    </>
  );
}

export default Taraturas;