import React, { ReactElement, FC, useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
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
import { searchRegisterDireccion } from '../store/searchRegisterDireccionSlice';
import { searchRegisterNombre } from '../store/searchRegisterNombreSlice';
import { searchRegisterPuerta } from '../store/searchRegisterPuertaSlice';
import { searchRegisterDni } from '../store/searchRegisterDniSlice';
import { searchRegisterCorreo } from '../store/searchRegisterCorreoSlice';
import { searchRegisterTelefono } from '../store/searchRegisterTelefonoSlice';

import { useRegisterActions, useZoneActions, useUserActions } from '../_actions';

import { previousPageCode } from '../store/previousPageCodeSlice';
import { previousPagePath } from '../store/previousPagePathSlice';

const pageCode = "TA";

const path = '/Admin/Registers';

const columns = [
  // { id: 'id', label: 'Id', minWidth: 50 },
  { id: 'name', label: 'Nombre', minWidth: 60, align: 'center' },
  { id: 'address', label: 'Direccion', minWidth: 60 },
  { id: 'number', label: 'Puerta', minWidth: 60, align: 'center' },
  { id: 'email', label: 'Correo', minWidth: 60, align: 'center' },
  { id: 'phone', label: 'Telefono', minWidth: 60, align: 'center' },
  { id: 'dni', label: 'Dni', minWidth: 60, align: 'center' },
  { id: 'zoneId', label: 'Zona', minWidth: 40, align: 'center' }
];

const Taraturas = () =>
{
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //const [people, setPeople] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const [registers, setRegisters] = useState(null);
  const [zoneList, setZoneList] = useState([]);
  const [user, setUser] = useState(null);

  const registerActions = useRegisterActions();
  const zoneActions = useZoneActions();
  const userActions = useUserActions();

  const dispatch = useDispatch();

  let location = useLocation();

  const zoneStore = useSelector(state => state.zone);

  const searchRegisterDireccionStore = useSelector(state => state.searchRegisterDireccion);
  const searchRegisterNombreStore = useSelector(state => state.searchRegisterNombre);
  const searchRegisterPuertaStore = useSelector(state => state.searchRegisterPuerta);
  const searchRegisterDniStore = useSelector(state => state.searchRegisterDni);
  const searchRegisterCorreoStore = useSelector(state => state.searchRegisterCorreo);
  const searchRegisterTelefonoStore = useSelector(state => state.searchRegisterTelefono);

  //const pathView = '/Registers/view';
  const pathView = '/Admin/Registers/edit';

  useEffect(() =>
  {
    // if (document.querySelector('#search').value === "")
    // {
    //   dispatch(searchRegister(""));
    // }
    if (searchRegisterNombreStore !== "")
      document.querySelector('#search_nombre').value = searchRegisterNombreStore;
    if (searchRegisterDireccionStore !== "")
      document.querySelector('#search_direccion').value = searchRegisterDireccionStore;
    if (searchRegisterPuertaStore !== "")
      document.querySelector('#search_puerta').value = searchRegisterPuertaStore;
    if (searchRegisterCorreoStore !== "")
      document.querySelector('#search_correo').value = searchRegisterCorreoStore;
    if (searchRegisterTelefonoStore !== "")
      document.querySelector('#search_telefono').value = searchRegisterTelefonoStore;
    if (searchRegisterDniStore !== "")
      document.querySelector('#search_dni').value = searchRegisterDniStore;
  }, []);

  useEffect(() =>
  {
    //userActions.getAll().then(x => setUsers(x));
    //userActions.getAll().then(x => setPeople(x)).filter(r => r.zoneId == zoneStore);
    //alert(zoneStore);
    //setTimeout(userActions.getAll().then(x => setPeople(x)), 3000)
    //setIsLoading(true);
    registerActions.getAll().then(x => setRegisters(x.filter(x => zoneStore != 0 ? x.zoneId == zoneStore : x.zoneId > 0)));
    //registerActions.getAll().then(x => setRegisters(x));
    zoneActions.getAll().then(x => { setZoneList(x); });
    //setIsLoading(false);
    userActions.getCurrentUser().then(x => { setUser(x); });
  }, [zoneStore]);

  function deleteRegister(id)
  {
    setRegisters(registers.map(x =>
    {
      if (x.id === id) { x.isDeleting = true; }
      return x;
    }));
    registerActions.delete(id).then(() =>
    {
      setRegisters(registers => registers.filter(x => x.id !== id));
    });
  }

  //useEffect(() => { fetchPeopleHandler(); }, []);

  const handleChangePage = (event, newPage) => { setPage(newPage); };

  const handleSearch = (event) =>
  {
    let inputDireccionValue;
    let inputNombreValue;
    let inputPuertaValue;
    let inputDniValue;
    let inputCorreoValue;
    let inputTelefonoValue;

    switch (event.target.name)
    {
      case 'search_direccion':
        inputDireccionValue = event.target.value; console.log(event.target.name + ": " + event.target.value);
        dispatch(searchRegisterDireccion(inputDireccionValue)); //alert(searchRegister);
        break;
      case 'search_nombre':
        inputNombreValue = event.target.value; console.log(event.target.name + ": " + event.target.value);
        dispatch(searchRegisterNombre(inputNombreValue)); //alert(searchRegister);
        break;
      case 'search_puerta':
        inputPuertaValue = event.target.value; console.log(event.target.name + ": " + event.target.value);
        dispatch(searchRegisterPuerta(inputPuertaValue)); //alert(searchRegister);
        break;
      case 'search_dni':
        inputDniValue = event.target.value; console.log(event.target.name + ": " + event.target.value);
        dispatch(searchRegisterDni(inputDniValue)); //alert(searchRegister);
        break;
      case 'search_correo':
        inputCorreoValue = event.target.value; console.log(event.target.name + ": " + event.target.value);
        dispatch(searchRegisterCorreo(inputCorreoValue)); //alert(searchRegister);
        break;
      case 'search_telefono':
        inputTelefonoValue = event.target.value; console.log(event.target.name + ": " + event.target.value);
        dispatch(searchRegisterTelefono(inputTelefonoValue)); //alert(searchRegister);
        break;

      default:
        break;
    }





    // search_direccion
    // search_nombre
    // search_dni
    // search_correo
    // search_telefono

    //alert(event.target.name);

    // if (inputValue.length >= 3)
    // {
    //testeee = {...people.filter(x => x.address.includes(inputValue))};
    //dispatch(searchRegister(inputDireccionValue))
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

  const toLowCaseAndSpecChars = (input_text) =>
  {
    var output_text = input_text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,:;ºª]/g, "");
    return output_text;
  };

  const toLowCase = (input_text) =>
  {
    var output_text = input_text.toLowerCase().normalize("NFD");
    return output_text;
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

  // if (error) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>{error}</div></TableCell></TableRow>; }
  // else if (registers.filter(x => x.address.includes(searchRegisterDireccionStore)).length === 0 && !isLoading) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>¡No hay registros!</div></TableCell></TableRow>; }
  // else if (isLoading) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>Cargando...</div></TableCell></TableRow>; }
  // else { content = <User people={people} />; }

  //const zone = useSelector(state => state.zone);

  return (
    <>
      <div className="PageContentTitle">Taratura <Icon.ArrowDownLeftSquareFill className='FontAwesomeIcon' /></div>


      {/* <div class="input-group">
        <input id="search" type="text" class="form-control" name="search" placeholder="buscar por direccion" onChange={handleSearch} />
      </div><br /> */}


      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={8}>
                  Búsquedas
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <input id="search_nombre" type="text" class="form-control" name="search_nombre" placeholder="nombre y apellidos" onChange={handleSearch} />
                </TableCell>
                <TableCell colSpan={3}>
                  <input id="search_direccion" type="text" class="form-control" name="search_direccion" placeholder="direccion" onChange={handleSearch} />
                </TableCell>
                <TableCell colSpan={2}>
                  <input id="search_puerta" type="text" class="form-control" name="search_puerta" placeholder="puerta" onChange={handleSearch} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={3}>
                  <input id="search_correo" type="text" class="form-control" name="search_correo" placeholder="correo" onChange={handleSearch} />
                </TableCell>
                <TableCell colSpan={3}>
                  <input id="search_telefono" type="text" class="form-control" name="search_telefono" placeholder="teléfono" onChange={handleSearch} />
                </TableCell>
                <TableCell colSpan={2}>
                  <input id="search_dni" type="text" class="form-control" name="search_dni" placeholder="dni" onChange={handleSearch} />
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>


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
                <TableCell align='center'><Link to={`${path}/add`} onClick={() => { dispatch(previousPageCode(pageCode)); dispatch(previousPagePath(location.pathname)); }} className="btn btn-md btn-success"><Icon.PlusCircleFill className='FontAwesomeIcon' /></Link></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {/* {content} */ console.log('searchRegisterPuertaStore:', searchRegisterPuertaStore)}


              {registers && registers
                //.filter(x => zoneStore != 0 ? x.zoneId == zoneStore : x.zoneId > 0)
                //.filter(x => toLowCaseAndSpecChars(x.address).includes(toLowCaseAndSpecChars(searchRegisterDireccionStore)))
                .filter(x => searchRegisterNombreStore.split(" ").every(t => toLowCaseAndSpecChars(x.name).includes(toLowCaseAndSpecChars(t))))
                .filter(x => searchRegisterDireccionStore.split(" ").every(t => toLowCaseAndSpecChars(x.address).includes(toLowCaseAndSpecChars(t))))
                .filter(x => searchRegisterPuertaStore.split(" ").every(t => toLowCaseAndSpecChars(x.number).includes(toLowCaseAndSpecChars(t))))
                //.filter(x => searchRegisterPuertaStore.split(" ").every(t => x.number?.toLowerCase().includes(t)))                
                //.filter(x => searchRegisterCorreoStore.split(" ").every(t => toLowCaseAndSpecChars(x.email).includes(toLowCaseAndSpecChars(t))))
                .filter(x => searchRegisterCorreoStore.split(" ").every(t => x.email?.toLowerCase().includes(t)))
                .filter(x => searchRegisterTelefonoStore.split(" ").every(t => toLowCaseAndSpecChars(x.phone).includes(toLowCaseAndSpecChars(t))))
                .filter(x => searchRegisterDniStore.split(" ").every(t => toLowCaseAndSpecChars(x.dni).includes(toLowCaseAndSpecChars(t))))
                //.filter(x => searchRegisterPuertaStore.split(" ").every(t => x.puerta.includes(t)))
                //.filter(x => !searchRegisterPuertaStore && searchRegisterPuertaStore === undefined ? x : searchRegisterPuertaStore.split(" ").every(t => toLowCaseAndSpecChars(x.number).includes(toLowCaseAndSpecChars(t))))
                //.filter(x => !searchRegisterPuertaStore ? x : toLowCaseAndSpecChars(x.number).includes(toLowCaseAndSpecChars(searchRegisterPuertaStore)))
                //.filter(x => !searchRegisterDniStore || !x.dni ? x : searchRegisterDniStore.split(" ").every(t => x.dni.includes(t)))
                //.filter(x => searchRegisterNombreStore != 0 ? x.number == searchRegisterNombreStore : x.number > 0)
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
                          value = zoneList.filter(x => x.id === person.zoneId).map(x => x.zoneName.split(" ")[1]);
                        }
                        if (column.id == 'address')
                        {
                          // value = person.id + " - " + person.address; 
                          value = <Link to={`${pathView}/${person.id}`} onClick={() => { dispatch(previousPageCode(pageCode)); dispatch(previousPagePath(location.pathname)); }} className="link-to-view">{person.address}</Link>
                        }
                        return (
                          <>
                            <TableCell key={index} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}

                              {/* {columns.indexOf(column) + 1 == columns.length ? " Fim" : " Resta"} */}
                            </TableCell>

                            {/* <TableRow>
                              <TableCell>
                                AaA
                              </TableCell>
                            </TableRow> */}
                          </>
                        );
                      })}

                      <TableCell key={index} align='center'>
                        <button onClick={() => { if (window.confirm('¿eliminar este registro?')) deleteRegister(person.id); }} className="btn btn-md btn-danger btn-delete-register" disabled={person.isDeleting} hidden={user.roleId == 2}>
                          {person.isDeleting
                            ? <span className="spinner-border spinner-border-sm"></span>
                            : <span><Icon.TrashFill className='FontAwesomeIcon' /></span>
                          }
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {!registers &&
                <tr>
                  <td colSpan="4" className="text-center">
                    <div className="spinner-border spinner-border-lg align-center"></div>
                  </td>
                </tr>
              }
              {registers && !registers
                .filter(x => searchRegisterNombreStore.split(" ").every(t => toLowCaseAndSpecChars(x.name).includes(toLowCaseAndSpecChars(t))))
                .filter(x => searchRegisterDireccionStore.split(" ").every(t => toLowCaseAndSpecChars(x.address).includes(toLowCaseAndSpecChars(t))))
                .filter(x => searchRegisterPuertaStore.split(" ").every(t => toLowCaseAndSpecChars(x.number).includes(toLowCaseAndSpecChars(t))))
                .filter(x => searchRegisterCorreoStore.split(" ").every(t => x.email?.toLowerCase().includes(t)))
                .filter(x => searchRegisterTelefonoStore.split(" ").every(t => toLowCaseAndSpecChars(x.phone).includes(toLowCaseAndSpecChars(t))))
                .filter(x => searchRegisterDniStore.split(" ").every(t => toLowCaseAndSpecChars(x.dni).includes(toLowCaseAndSpecChars(t))))

                // .filter(x => toLowCaseAndSpecChars(x.name).includes(toLowCaseAndSpecChars(searchRegisterNombreStore)))
                // .filter(x => toLowCaseAndSpecChars(x.address).includes(toLowCaseAndSpecChars(searchRegisterDireccionStore)))
                // .filter(x => toLowCaseAndSpecChars(x.number).includes(toLowCaseAndSpecChars(searchRegisterPuertaStore)))
                // //.filter(x => toLowCase(x.email).includes(searchRegisterCorreoStore))
                // .filter(x => toLowCaseAndSpecChars(x.phone).includes(toLowCaseAndSpecChars(searchRegisterTelefonoStore)))
                // //.filter(x => toLowCaseAndSpecChars(x.dni).includes(toLowCaseAndSpecChars(searchRegisterDniStore)))
                .length &&

                //.filter(x => toLowCaseAndSpecChars(x.address).includes(toLowCaseAndSpecChars(searchRegisterDireccionStore))).length &&
                <tr>
                  <td colSpan="4" className="text-center">
                    <div className="p-2">¡No hay registros!</div>
                  </td>
                </tr>
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          //count={registers && registers.filter(x => toLowCaseAndSpecChars(x.address).includes(toLowCaseAndSpecChars(searchRegisterDireccionStore))).length}
          count={registers && registers
            .filter(x => searchRegisterNombreStore.split(" ").every(t => toLowCaseAndSpecChars(x.name).includes(toLowCaseAndSpecChars(t))))
            .filter(x => searchRegisterDireccionStore.split(" ").every(t => toLowCaseAndSpecChars(x.address).includes(toLowCaseAndSpecChars(t))))
            .filter(x => searchRegisterPuertaStore.split(" ").every(t => toLowCaseAndSpecChars(x.number).includes(toLowCaseAndSpecChars(t))))
            .filter(x => searchRegisterCorreoStore.split(" ").every(t => x.email?.toLowerCase().includes(t)))
            .filter(x => searchRegisterTelefonoStore.split(" ").every(t => toLowCaseAndSpecChars(x.phone).includes(toLowCaseAndSpecChars(t))))
            .filter(x => searchRegisterDniStore.split(" ").every(t => toLowCaseAndSpecChars(x.dni).includes(toLowCaseAndSpecChars(t))))

            // .filter(x => toLowCaseAndSpecChars(x.name).includes(toLowCaseAndSpecChars(searchRegisterNombreStore)))
            // .filter(x => toLowCaseAndSpecChars(x.address).includes(toLowCaseAndSpecChars(searchRegisterDireccionStore)))
            // // .filter(x => toLowCaseAndSpecChars(x.number).includes(toLowCaseAndSpecChars(searchRegisterPuertaStore)))
            // // .filter(x => toLowCase(x.email).includes(searchRegisterCorreoStore))
            // // .filter(x => toLowCaseAndSpecChars(x.phone).includes(toLowCaseAndSpecChars(searchRegisterTelefonoStore)))
            // // .filter(x => toLowCaseAndSpecChars(x.dni).includes(toLowCaseAndSpecChars(searchRegisterDniStore)))
            .length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Ítems"}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Paper>
    </>
  );
}

export default Taraturas;