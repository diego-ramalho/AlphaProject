import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';

import { useLogActions } from '../../_actions';

function LogsList()
{
    //const { path } = match;
    const path = '/Admin/Logs';
    const baseUrl = `${process.env.REACT_APP_API_URL}/log`;
    const [logs, setLogs] = useState(null);

    const dispatch = useDispatch();

    const logActions = useLogActions();

    useEffect(() =>
    {
        logActions.getAll().then(x => setLogs(x));
    }, []);

    function deleteLog(id)
    {
        setLogs(logs.map(x =>
        {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        logActions.delete(id).then(() =>
        {
            setLogs(logs => logs.filter(x => x.id !== id));
        });
    }


    return (
        <div>
            <h1>Logs</h1>
            {/* <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Agregar Log</Link> */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>UserName</th>
                        <th>Type</th>
                        <th>Method</th>
                        <th>Result</th>
                        <th>Date</th>
                        <th></th>
                        {/* <th style={{ width: '10%' }}></th> */}
                    </tr>
                </thead>
                <tbody>
                    {logs && logs.slice(0, 100).map(log =>
                        <tr key={log.id}>
                            <td>{log.userName}</td>
                            <td>{log.eventType}</td>
                            <td>{log.eventMethod}</td>
                            <td>{log.eventResult}</td>
                            <td>{log.updateTime}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${log.id}`} className="btn btn-sm btn-primary mr-1">Ver</Link>
                            </td>
                            {/* <td>
                                <Link to={`${pathView}/${logs.id}`} onClick={() => { dispatch(previousPageCode(pageCode)); dispatch(previousPagePath(location.pathname)); }} className="link-to-view"><Icon.TrashFill className='FontAwesomeIcon' /></Link>
                            </td> */}
                            {/* <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${log.id}`} className="btn btn-sm btn-primary mr-1">Editar</Link>
                                <button onClick={() => deleteLog(log.id)} className="btn btn-sm btn-danger btn-delete-log" disabled={log.isDeleting}>
                                    {log.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Eliminar</span>
                                    }
                                </button>
                            </td> */}
                        </tr>
                    )}
                    {!logs &&
                        <tr>
                            <td colSpan="6" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {logs && !logs.length &&
                        <tr>
                            <td colSpan="6" className="text-center">
                                <div className="p-2">Sin logs para mostrar</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { LogsList };