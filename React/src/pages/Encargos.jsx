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
import { searchCharge } from '../store/searchChargeSlice';

import { useChargesActions } from '../_actions';

const columns = [
    { id: 'description', label: 'Descripción', minWidth: 100 },
    { id: 'value', label: 'Valor', minWidth: 100 }
];

const Encargos = () =>
{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const [chargesList, setChargesList] = useState([]);

    const chargesActions = useChargesActions();

    const dispatch = useDispatch();

    const searchChargeStore = useSelector(state => state.searchCharge);

    const pathView = '/Encargos/view';

    useEffect(() =>
    {
        if (document.querySelector('#search').value === "")
        {
            dispatch(searchCharge(""));
        }
    }, []);

    useEffect(() =>
    {
        chargesActions.getAll().then(x => { setChargesList(x); });
    }, []);

    const handleSearch = (event) =>
    {
        let inputValue = event.target.value;
        dispatch(searchCharge(inputValue));
    };


    const handleChangePage = (event, newPage) => { setPage(newPage); };

    const handleChangeRowsPerPage = (event) =>
    {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // let content;

    // if (error) { content = <h1>{error}</h1>; }
    // else if (registers.length === 0 && !isLoading) { content = <h1>¡No hay registros!</h1>; }
    // else if (isLoading) { content = <h1>Cargando...</h1>; }

    let content;

    if (error) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>{error}</div></TableCell></TableRow>; }
    else if (chargesList.filter(x => x.description.includes(searchChargeStore)).length === 0 && !isLoading) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>¡No hay registros!</div></TableCell></TableRow>; }
    else if (isLoading) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>Cargando...</div></TableCell></TableRow>; }

    return (
        <>
            <div className="PageContentTitle">Encargos <Icon.ArrowDownLeftSquareFill className='FontAwesomeIcon' /></div>

            <div className="input-group">
                <input id="search" type="text" className="form-control" name="search" placeholder="buscar por descripción" onChange={handleSearch} />
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

                            {chargesList
                                .filter(x => x.description.includes(searchChargeStore))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((person, index) =>
                                {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column) =>
                                            {
                                                let value = person[column.id];

                                                if (column.id == 'description')
                                                {
                                                    value = <Link to={`${pathView}/${person.id}`} className="link-to-view">{person.description}</Link>
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
                    count={chargesList.filter(x => x.description.includes(searchChargeStore)).length}
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

export default Encargos;