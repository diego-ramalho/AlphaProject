import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useFilterActions } from '../../_actions';

function FiltersList()
{
    //const { path } = match;
    const path = '/Admin/Filters';
    const baseUrl = `${process.env.REACT_APP_API_URL}/filter`;
    const [filters, setFilters] = useState(null);

    const filterActions = useFilterActions();

    useEffect(() =>
    {
        filterActions.getAll().then(x => setFilters(x));
    }, []);

    function deleteFilter(id)
    {
        setFilters(filters.map(x =>
        {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        filterActions.delete(id).then(() =>
        {
            setFilters(filters => filters.filter(x => x.id !== id));
        });
    }


    return (
        <div>
            <h1>Filters</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Agregar Filter</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '90%' }}>Filter Name</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {filters && filters.map(filter =>
                        <tr key={filter.id}>
                            <td>{filter.filterName}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${filter.id}`} className="btn btn-sm btn-primary mr-1">Editar</Link>
                                <button onClick={() => deleteFilter(filter.id)} className="btn btn-sm btn-danger btn-delete-filter" disabled={filter.isDeleting}>
                                    {filter.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Eliminar</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!filters &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {filters && !filters.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">Sin filtros para mostrar</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { FiltersList };