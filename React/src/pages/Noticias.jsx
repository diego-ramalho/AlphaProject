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
import { searchNews } from '../store/searchNewsSlice';

import { useNewsActions } from '../_actions';

const columns = [
    { id: 'title', label: 'Title', minWidth: 100 },
    { id: 'link', label: 'Link', minWidth: 100 }
];

const Noticias = () =>
{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const [newsList, setNewsList] = useState([]);

    const newsActions = useNewsActions();

    const dispatch = useDispatch();

    const searchNewsStore = useSelector(state => state.searchNews);

    const pathView = '/Noticias/view';

    useEffect(() =>
    {
        if (document.querySelector('#search').value === "")
        {
            dispatch(searchNews(""));
        }
    }, []);

    useEffect(() =>
    {
        newsActions.getAll().then(x => { setNewsList(x); });
    }, []);

    const handleSearch = (event) =>
    {
        let inputValue = event.target.value;
        dispatch(searchNews(inputValue));
    };


    const handleChangePage = (event, newPage) => { setPage(newPage); };

    const handleChangeRowsPerPage = (event) =>
    {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // let content;

    // if (error) { content = <h1>{error}</h1>; }
    // else if (registers.length === 0 && !isLoading) { content = <h1>There are no movies yet!</h1>; }
    // else if (isLoading) { content = <h1>Loading...</h1>; }

    let content;

    if (error) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>{error}</div></TableCell></TableRow>; }
    else if (newsList.filter(x => x.title.includes(searchNewsStore)).length === 0 && !isLoading) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>There are no news!</div></TableCell></TableRow>; }
    else if (isLoading) { content = <TableRow><TableCell colSpan={3}><div className='no-data'>Loading...</div></TableCell></TableRow>; }

    return (
        <>
            <div className="PageContentTitle">Notícias <Icon.ArrowDownLeftSquareFill className='FontAwesomeIcon' /></div>

            <div className="input-group">
                <input id="search" type="text" className="form-control" name="search" placeholder="search by title" onChange={handleSearch} />
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

                            {newsList
                                .filter(x => x.title.includes(searchNewsStore))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((person, index) =>
                                {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column) =>
                                            {
                                                let value = person[column.id];

                                                if (column.id == 'title')
                                                {
                                                    value = <Link to={`${pathView}/${person.id}`} className="link-to-view">{person.title}</Link>
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
                    count={newsList.filter(x => x.title.includes(searchNewsStore)).length}
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
}

export default Noticias;