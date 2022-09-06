import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useRegisterActions, useZoneActions } from '../../_actions';

import { useSelector } from 'react-redux';

function RegistersList()
{
    //const { path } = match;
    const path = '/Admin/Registers';
    const pathView = '/Registers';
    const baseUrl = `${process.env.REACT_APP_API_URL}/register`;
    const [registers, setRegisters] = useState(null);

    const [zonesList, setZones] = useState([]);

    const zoneStore = useSelector(state => state.zone);

    const registerActions = useRegisterActions();
    const zoneActions = useZoneActions();

    useEffect(() =>
    {
        registerActions.getAll().then(x => setRegisters(x));
        //var teste = registers?.filter(c => c.ZoneId === zoneStore);
        zoneActions.getAll().then(x => { setZones(x); console.log(x); });
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


    return (
        <div>
            <h1>Taratura</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '70%' }}>Direccion</th>
                        <th style={{ width: '20%' }}>Zone</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {registers && registers.filter(x => zoneStore != 0 ? x.zoneId == zoneStore : x.zoneId > 0).map(register =>
                        <tr key={register.id}>
                            {/* <td>{register.address}</td> */}
                            <td><Link to={`${pathView}/view/${register.id}`} className="link-to-view">{register.address}</Link></td>
                            <td>{zonesList.filter(x => x.id === register.zoneId).map(x => x.zoneName)}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${register.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteRegister(register.id)} className="btn btn-sm btn-danger btn-delete-register" disabled={register.isDeleting}>
                                    {register.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!registers &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {registers && !registers.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Registers To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { RegistersList };