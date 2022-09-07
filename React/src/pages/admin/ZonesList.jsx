import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useZoneActions } from '../../_actions';

function ZonesList()
{
    //const { path } = match;
    const path = '/Admin/Zones';
    const baseUrl = `${process.env.REACT_APP_API_URL}/zone`;
    const [zones, setZones] = useState(null);

    const zoneActions = useZoneActions();

    useEffect(() =>
    {
        zoneActions.getAll().then(x => setZones(x));
    }, []);

    function deleteZone(id)
    {
        setZones(zones.map(x =>
        {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        zoneActions.delete(id).then(() =>
        {
            setZones(zones => zones.filter(x => x.id !== id));
        });
    }


    return (
        <div>
            <h1>Zonas</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Agregar Zona</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '90%' }}>Nombre de Zona</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {zones && zones.map(zone =>
                        <tr key={zone.id}>
                            <td>{zone.zoneName}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${zone.id}`} className="btn btn-sm btn-primary mr-1">Editar</Link>
                                <button onClick={() => deleteZone(zone.id)} className="btn btn-sm btn-danger btn-delete-zone" disabled={zone.isDeleting}>
                                    {zone.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Eliminar</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!zones &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {zones && !zones.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">Sin zonas para mostrar</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { ZonesList };