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
import { searchRegisterDireccion } from '../store/searchRegisterDireccionSlice';
import { searchRegisterNombre } from '../store/searchRegisterNombreSlice';
import { searchRegisterPuerta } from '../store/searchRegisterPuertaSlice';
import { searchRegisterDni } from '../store/searchRegisterDniSlice';
import { searchRegisterCorreo } from '../store/searchRegisterCorreoSlice';
import { searchRegisterTelefono } from '../store/searchRegisterTelefonoSlice';

import { previousPageCode } from '../store/previousPageCodeSlice';
import { previousPagePath } from '../store/previousPagePathSlice';

import { useRegisterActions, useZoneActions, useFilterActions, useUserActions } from '../_actions';

const pageCode = "PVa";

const path = '/Admin/Registers';

const columns = [
  //{ id: 'id', label: 'Id', minWidth: 50 },
  { id: 'name', label: 'Nombre', minWidth: 60, align: 'center' },
  { id: 'address', label: 'Direccion', minWidth: 60 },
  { id: 'number', label: 'Puerta', minWidth: 60, align: 'center' },
  { id: 'email', label: 'Correo', minWidth: 60, align: 'center' },
  { id: 'phone', label: 'Telefono', minWidth: 60, align: 'center' },
  { id: 'dni', label: 'Dni', minWidth: 60, align: 'center' },
  { id: 'zoneId', label: 'Zona', minWidth: 40, align: 'center' }
];

const PisosVacios = () =>
{
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const [registers, setRegisters] = useState(null);
  const [zoneList, setZoneList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [user, setUser] = useState(null);

  const registerActions = useRegisterActions();
  const zoneActions = useZoneActions();
  const filterActions = useFilterActions();
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

  const filterId = 1;

  useEffect(() =>
  {
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
    registerActions.getAllByFilter(filterId).then(x => setRegisters(x.filter(x => zoneStore != 0 ? x.zoneId == zoneStore : x.zoneId > 0)));
    zoneActions.getAll().then(x => { setZoneList(x); });
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


  // useEffect(() => { fetchPeopleHandler(); }, []);

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
  //     const response = registerActions.getAll().then(x => setRegisters(x));
  //     const responseZone = zoneActions.getAll().then(x => setZoneList(x));
  //     const responseFilter = filterActions.getAll().then(x => setFilterList(x));

  //     setIsLoading(false);
  //   } catch (error)
  //   {
  //     console.log(error);
  //     setError(error.message);
  //   }
  // }

  //let content;

  // if (error) { content = <h1>{error}</h1>; }
  // else if (registers.length === 0 && !isLoading) { content = <h1>¡No hay registros!</h1>; }
  // else if (isLoading) { content = <h1>Cargando...</h1>; }
  // if (error) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>{error}</div></TableCell></TableRow>; }
  // else if (registers.filter(x => x.address.includes(searchRegisterDireccionStore)).length === 0 && !isLoading) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>¡No hay registros!</div></TableCell></TableRow>; }
  // else if (isLoading) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>Cargando...</div></TableCell></TableRow>; }

  return (
    <>
      <div className="PageContentTitle">Pisos Vacios <Icon.ArrowDownLeftSquareFill className='FontAwesomeIcon' /></div>

      {/* <Link to={`${path}/add`} onClick={() => { dispatch(previousPageCode(pageCode)); dispatch(previousPagePath(location.pathname)); }} className="btn btn-sm btn-success mb-2">Agregar Pisos Vacios</Link>

      <div class="input-group">
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
                .filter(x => searchRegisterNombreStore.split(" ").every(t => toLowCaseAndSpecChars(x.name).includes(toLowCaseAndSpecChars(t))))
                .filter(x => searchRegisterDireccionStore.split(" ").every(t => toLowCaseAndSpecChars(x.address).includes(toLowCaseAndSpecChars(t))))
                .filter(x => searchRegisterPuertaStore.split(" ").every(t => toLowCaseAndSpecChars(x.number).includes(toLowCaseAndSpecChars(t))))
                .filter(x => searchRegisterCorreoStore.split(" ").every(t => x.email?.toLowerCase().includes(t)))
                .filter(x => searchRegisterTelefonoStore.split(" ").every(t => toLowCaseAndSpecChars(x.phone).includes(toLowCaseAndSpecChars(t))))
                .filter(x => searchRegisterDniStore.split(" ").every(t => toLowCaseAndSpecChars(x.dni).includes(toLowCaseAndSpecChars(t))))
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
                          <TableCell key={index} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
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
                .filter(x => searchRegisterDniStore.split(" ").every(t => toLowCaseAndSpecChars(x.dni).includes(toLowCaseAndSpecChars(t)))).length &&
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
          count={registers && registers
            .filter(x => searchRegisterNombreStore.split(" ").every(t => toLowCaseAndSpecChars(x.name).includes(toLowCaseAndSpecChars(t))))
            .filter(x => searchRegisterDireccionStore.split(" ").every(t => toLowCaseAndSpecChars(x.address).includes(toLowCaseAndSpecChars(t))))
            .filter(x => searchRegisterPuertaStore.split(" ").every(t => toLowCaseAndSpecChars(x.number).includes(toLowCaseAndSpecChars(t))))
            .filter(x => searchRegisterCorreoStore.split(" ").every(t => x.email?.toLowerCase().includes(t)))
            .filter(x => searchRegisterTelefonoStore.split(" ").every(t => toLowCaseAndSpecChars(x.phone).includes(toLowCaseAndSpecChars(t))))
            .filter(x => searchRegisterDniStore.split(" ").every(t => toLowCaseAndSpecChars(x.dni).includes(toLowCaseAndSpecChars(t)))).length}
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

export default PisosVacios;