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

import { useRegisterActions, useZoneActions, useFilterActions } from '../_actions';

import { previousPageCode } from '../store/previousPageCodeSlice';
import { previousPagePath } from '../store/previousPagePathSlice';

const pageCode = "IN";

const path = '/Admin/Registers';

const columns = [
    //{ id: 'id', label: 'Id', minWidth: 50 },
    { id: 'address', label: 'Informadores', minWidth: 200 },
    { id: 'number', label: 'Puerta', minWidth: 100, align: 'center' },
    { id: 'zoneId', label: 'Zona', minWidth: 50, align: 'center' }
];

const Informadores = () =>
{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const [registers, setRegisters] = useState(null);
    const [zoneList, setZoneList] = useState([]);
    const [filterList, setFilterList] = useState([]);

    const registerActions = useRegisterActions();
    const zoneActions = useZoneActions();
    const filterActions = useFilterActions();

    const dispatch = useDispatch();

    // dispatch(previousPage(useSelector(state => state.currentPage)));
    // dispatch(currentPage(pageCode));

    let location = useLocation();

    const zoneStore = useSelector(state => state.zone);
    const searchRegisterDireccionStore = useSelector(state => state.searchRegisterDireccion);

    //const pathView = '/Registers/view';
    const pathView = '/Admin/Registers/edit';

    const filterId = 5;

    useEffect(() =>
    {
        // if (document.querySelector('#search').value === "")
        // {
        //   dispatch(searchRegister(""));
        // }
        if (searchRegisterDireccionStore !== "")
        {
            document.querySelector('#search').value = searchRegisterDireccionStore;
        }
    }, []);

    useEffect(() =>
    {
        registerActions.getAllByFilter(filterId).then(x => setRegisters(x.filter(x => zoneStore != 0 ? x.zoneId == zoneStore : x.zoneId > 0)));
        zoneActions.getAll().then(x => { setZoneList(x); });
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


    const handleChangePage = (event, newPage) => { setPage(newPage); };

    const handleSearch = (event) =>
    {
        let inputValue = event.target.value;
        dispatch(searchRegisterDireccion(inputValue));
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

    // let content;

    // if (error) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>{error}</div></TableCell></TableRow>; }
    // else if (registers.filter(x => x.address.includes(searchRegisterDireccionStore)).length === 0 && !isLoading) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>¡No hay registros!</div></TableCell></TableRow>; }
    // else if (isLoading) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>Cargando...</div></TableCell></TableRow>; }

    return (
        <>
            <div className="PageContentTitle">Informadores <Icon.ArrowDownLeftSquareFill className='FontAwesomeIcon' /></div>

            {/* <Link to={`${path}/add`} onClick={() => { dispatch(previousPageCode(pageCode)); dispatch(previousPagePath(location.pathname)); }} className="btn btn-sm btn-success mb-2">Agregar Informadores</Link>

            <div class="input-group">
                <input id="search" type="text" class="form-control" name="search" placeholder="buscar por informadores" onChange={handleSearch} />
            </div><br /> */}

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <input id="search" type="text" class="form-control" name="search" placeholder="buscar por informadores" onChange={handleSearch} />
                                </TableCell>
                            </TableRow>

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

                            {/* {content} */}

                            {registers && registers
                                //.filter(x => x.address.includes(searchRegisterDireccionStore))
                                .filter(x => toLowCaseAndSpecChars(x.address).includes(toLowCaseAndSpecChars(searchRegisterDireccionStore)))
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

                                            <TableCell key={index} align='center' minWidth='60px'>
                                                <button onClick={() => { if (window.confirm('¿eliminar este registro?')) deleteRegister(person.id); }} className="btn btn-md btn-danger btn-delete-register" disabled={person.isDeleting}>
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
                            {registers && !registers.filter(x => toLowCaseAndSpecChars(x.address).includes(toLowCaseAndSpecChars(searchRegisterDireccionStore))).length &&
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
                    count={registers && registers.filter(x => toLowCaseAndSpecChars(x.address).includes(toLowCaseAndSpecChars(searchRegisterDireccionStore))).length}
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

export default Informadores;