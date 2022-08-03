import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useChargesActions } from '../../_actions';

function ChargesList()
{
    //const { path } = match;
    const path = '/Admin/Charges';
    const baseUrl = `${process.env.REACT_APP_API_URL}/charges`;
    const [charges, setCharges] = useState(null);

    const chargesActions = useChargesActions();

    useEffect(() =>
    {
        chargesActions.getAll().then(x => setCharges(x));
    }, []);

    function deleteCharges(id)
    {
        setCharges(charges.map(x =>
        {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        chargesActions.delete(id).then(() =>
        {
            setCharges(charges => charges.filter(x => x.id !== id));
        });
    }


    return (
        <div>
            <h1>Charges</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Charges</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '45%' }}>Charges</th>
                        <th style={{ width: '45%' }}></th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {charges && charges.map(charges =>
                        <tr key={charges.id}>
                            <td>{charges.value}</td>
                            <td>{charges.description}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${charges.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteCharges(charges.id)} className="btn btn-sm btn-danger btn-delete-charges" disabled={charges.isDeleting}>
                                    {charges.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!charges &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {charges && !charges.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Charges To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { ChargesList };