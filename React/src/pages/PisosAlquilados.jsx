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

import { useSelector } from 'react-redux';

import { useRegisterActions, useZoneActions, useFilterActions } from '../_actions';

const columns = [
    //{ id: 'id', label: 'Id', minWidth: 50 },
    { id: 'address', label: 'Address', minWidth: 170 },
    { id: 'number', label: 'Number', minWidth: 100 },
    { id: 'zoneId', label: 'Zone', minWidth: 100 }
];

const PisosAlquilados = () =>
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

    const zoneStore = useSelector(state => state.zone);

    const filterId = 4;

    useEffect(() =>
    {
        registerActions.getAllByFilter(filterId).then(x => setRegisters(x.filter(x => zoneStore != 0 ? x.zoneId == zoneStore : x.zoneId > 0)));
        zoneActions.getAll().then(x => { setZoneList(x); });
    }, [zoneStore]);


    const handleChangePage = (event, newPage) => { setPage(newPage); };

    const handleChangeRowsPerPage = (event) =>
    {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let content;

    if (error) { content = <h1>{error}</h1>; }
    else if (registers.length === 0 && !isLoading) { content = <h1>There are no movies yet!</h1>; }
    else if (isLoading) { content = <h1>Loading...</h1>; }

    return (
        <>
            <div className="PageContentTitle">Pisos Alquilados <Icon.ArrowDownLeftSquareFill className='FontAwesomeIcon' /></div>
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
                    count={registers.length}
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

export default PisosAlquilados;