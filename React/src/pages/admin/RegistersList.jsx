import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { searchRegister } from '../../store/searchRegisterSlice';

import { useDispatch, useSelector } from 'react-redux';

import { useRegisterActions, useZoneActions } from '../../_actions';

function RegistersList()
{
    //const { path } = match;
    const path = '/Admin/Registers';
    const pathView = '/Registers';
    const baseUrl = `${process.env.REACT_APP_API_URL}/register`;

    const dispatch = useDispatch();

    const [registers, setRegisters] = useState(null);

    const [zonesList, setZones] = useState([]);

    const zoneStore = useSelector(state => state.zone);
    const searchRegisterStore = useSelector(state => state.searchRegister);

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

    useEffect(() =>
    {
        // if (document.querySelector('#search').value === "")
        // {
        //   dispatch(searchRegister(""));
        // }
        if (searchRegisterStore !== "")
        {
            document.querySelector('#search').value = searchRegisterStore;
        }
    }, []);

    const handleSearch = (event) =>
    {
        let inputValue = event.target.value;

        // if (inputValue.length >= 3)
        // {
        //testeee = {...people.filter(x => x.address.includes(inputValue))};
        dispatch(searchRegister(inputValue))
        //alert(inputValue);
        // userActions.getAll()
        //   .then(x => setPeople(x
        //     .filter(x => zoneStore != 0 ? x.zoneId == zoneStore : x.zoneId > 0)
        //     .filter(x => x.address.includes(inputValue))));
        //}
    };

    const toLowCaseAndSpecChars = (input_text) =>
    {
        var output_text = input_text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,:;ºª]/g, "");
        return output_text;
    };


    return (
        <div>
            <h1>Taratura</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Agregar</Link>

            <div class="input-group">
                {/* <Icon.Search className='Input-FontAwesomeIcon' /> */}
                <input id="search" type="text" class="form-control" name="search" placeholder="buscar por direccion" onChange={handleSearch} />
            </div><br />

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '50%' }}>Direccion</th>
                        <th style={{ width: '25%' }}>Puerta</th>
                        <th style={{ width: '15%' }}>Zona</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {registers && registers
                        .filter(x => zoneStore != 0 ? x.zoneId == zoneStore : x.zoneId > 0)
                        //.filter(x => x.address.includes(searchRegisterStore))
                        .filter(x => toLowCaseAndSpecChars(x.address).includes(toLowCaseAndSpecChars(searchRegisterStore)))
                        .map(register =>
                            <tr key={register.id}>
                                {/* <td>{register.address}</td> */}
                                <td><Link to={`${pathView}/view/${register.id}`} className="link-to-view">{register.address}</Link></td>
                                <td>{register.number}</td>
                                <td>{zonesList.filter(x => x.id === register.zoneId).map(x => x.zoneName.split(" ")[1])}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link to={`${path}/edit/${register.id}`} className="btn btn-sm btn-primary mr-1">Editar</Link>
                                    <button onClick={() => {if(window.confirm('Delete the item?'))deleteRegister(register.id);}} className="btn btn-sm btn-danger btn-delete-register" disabled={register.isDeleting}>
                                        {register.isDeleting
                                            ? <span className="spinner-border spinner-border-sm"></span>
                                            : <span>Eliminar</span>
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
                    {registers && !registers.filter(x => toLowCaseAndSpecChars(x.address).includes(toLowCaseAndSpecChars(searchRegisterStore))).length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">Sin registros para mostrar</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { RegistersList };