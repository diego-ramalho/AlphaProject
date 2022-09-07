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
import { searchRegister } from '../store/searchRegisterSlice';

import { useRegisterActions, useZoneActions, useFilterActions } from '../_actions';

const columns = [
    //{ id: 'id', label: 'Id', minWidth: 50 },
    { id: 'address', label: 'Direccion', minWidth: 170 },
    { id: 'number', label: 'Puerta', minWidth: 100 },
    { id: 'zoneId', label: 'Zona', minWidth: 100 }
];

const PisosVendidos = () =>
{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const [registers, setRegisters] = useState([]);
    const [zoneList, setZoneList] = useState([]);
    const [filterList, setFilterList] = useState([]);

    const registerActions = useRegisterActions();
    const zoneActions = useZoneActions();
    const filterActions = useFilterActions();

    const dispatch = useDispatch();

    const zoneStore = useSelector(state => state.zone);
    const searchRegisterStore = useSelector(state => state.searchRegister);

    const pathView = '/Registers/view';

    const filterId = 3;

    useEffect(() =>
    {
        if (document.querySelector('#search').value === "")
        {
            dispatch(searchRegister(""));
        }
    }, []);

    useEffect(() =>
    {
        registerActions.getAllByFilter(filterId).then(x => setRegisters(x.filter(x => zoneStore != 0 ? x.zoneId == zoneStore : x.zoneId > 0)));
        zoneActions.getAll().then(x => { setZoneList(x); });
    }, [zoneStore]);


    const handleChangePage = (event, newPage) => { setPage(newPage); };

    const handleSearch = (event) =>
    {
        let inputValue = event.target.value;
        dispatch(searchRegister(inputValue));
    };

    const handleChangeRowsPerPage = (event) =>
    {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let content;

    if (error) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>{error}</div></TableCell></TableRow>; }
    else if (registers.filter(x => x.address.includes(searchRegisterStore)).length === 0 && !isLoading) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>¡No hay registros!</div></TableCell></TableRow>; }
    else if (isLoading) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>Cargando...</div></TableCell></TableRow>; }

    return (
        <>
            <div className="PageContentTitle">Pisos Vendidos <Icon.ArrowDownLeftSquareFill className='FontAwesomeIcon' /></div>

            <div class="input-group">
                <input id="search" type="text" class="form-control" name="search" placeholder="buscar por direccion" onChange={handleSearch} />
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
                            {registers
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
                    count={registers.filter(x => x.address.includes(searchRegisterStore)).length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={"Ítems por página"}
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                />
            </Paper>
        </>
    );
}

export default PisosVendidos;