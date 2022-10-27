import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//import { history } from '../../_helpers';
import { useRegisterActions, useZoneActions, useFilterActions, useAlertActions } from '../../_actions';

function RegistersView({ match })
{
    const { id } = useParams();
    const isAddMode = !id;

    const navigate = useNavigate();

    const registerActions = useRegisterActions();
    const zoneActions = useZoneActions();
    const filterActions = useFilterActions();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        address: Yup.string()
            .required('Direccion obligatoria'),
        name: Yup.string()
            .required('Puerta obligatoria'),
        number: Yup.string()
            .required('Puerta obligatoria'),
        observation: Yup.string(),
        phone: Yup.string(),
        dni: Yup.string(),
        lastContact: Yup.string(),
        email: Yup.string(),
        tracing: Yup.string(),
        zoneId: Yup.string()
            .required('Zona obligatoria'),
        filterList: Yup.array()
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, formState: { errors }, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data)
    {
        return isAddMode
            ? createRegister(data)
            : updateRegister(id, data);
    }

    function createRegister(data)
    {
        return registerActions.create(data)
            .then(() =>
            {
                useAlertActions.success('Registro agregado', { keepAfterRouteChange: true });
                navigate('/Admin/Registers/');
            })
            .catch(useAlertActions.error);
    }

    function updateRegister(id, data)
    {
        return registerActions.update(id, data)
            .then(() =>
            {
                useAlertActions.success('Registro actualizado', { keepAfterRouteChange: true });
                navigate("/Admin/Registers/");
            })
            .catch(useAlertActions.error);
    }

    const [registerItem, setRegister] = useState({});
    const [filteroptions, setFilterOptions] = useState([]);
    const [filterItems, setFilterItems] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [zoneoptions, setZoneOptions] = useState([]);


    const handleChkboxChange = (event) =>
    {
        const target = event.target;
        var value = target.value;
        if (!target.checked)
        {
            const name = event.target.getAttribute("filterList")
            setSelectedFilters(selectedFilters.filter(item => item !== value));
        } else
        {
            const name = event.target.getAttribute("filterList")
            setSelectedFilters(...selectedFilters, value);
        }
    }

    useEffect(() =>
    {
        filterActions.getAll().then(x => { setFilterOptions(x); console.log(x); });
        filterActions.getByRegisterId(id).then(x => { setFilterItems(x); console.log(x); });
        zoneActions.getAll().then(x => setZoneOptions(x));

        if (!isAddMode)
        {
            // get user and set form fields
            registerActions.getById(id).then(registerItem =>
            {
                const fields = ['address', 'name', 'number', 'observation', 'phone', 'dni', 'lastContact', 'email', 'tracing', 'zoneId'];
                fields.forEach(field => setValue(field, registerItem[field], false));
                setRegister(registerItem);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Agregar Taratura' : 'Taratura'}</h1>
            <div className="form-row">
                <div className="form-group col-12">
                    <div className="page-view-item-label col-md-12 col-sm-12">Direccion</div>
                    <div className="page-view-item-value col-md-12 col-sm-12">{registerItem.address}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <div className="page-view-item-label col-md-12 col-sm-12">Nombre y Apellidos</div>
                    <div className="page-view-item-value col-md-12 col-sm-12">{registerItem.name}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-4 col-sm-12">
                    <div className="page-view-item-label col-md-12 col-sm-12">Puerta</div>
                    <div className="page-view-item-value col-md-12 col-sm-12">{registerItem.number}</div>
                </div>
                <div className="form-group col-md-8 col-sm-12">
                    <div className="page-view-item-label col-md-12 col-sm-12">Telefono</div>
                    <div className="page-view-item-value col-md-12 col-sm-12">{registerItem.phone}</div>
                </div>
            </div>


            <div className="form-row">
                <div className="form-group col-md-4 col-sm-12">
                    <div className="page-view-item-label col-md-12 col-sm-12">DNI</div>
                    <div className="page-view-item-value col-md-12 col-sm-12">{registerItem.dni}</div>
                </div>
                <div className="form-group col-md-8 col-sm-12">
                    <div className="page-view-item-label col-md-12 col-sm-12">Fecha Último Contacto</div>
                    <div className="page-view-item-value col-md-12 col-sm-12">{registerItem.lastContact}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <div className="page-view-item-label col-md-12 col-sm-12">Email</div>
                    <div className="page-view-item-value col-md-12 col-sm-12">{registerItem.email}</div>
                </div>
            </div>


            <div className="form-row">
                <div className="form-group col-12">
                    <div className="page-view-item-label col-md-12 col-sm-12">Observaciones</div>
                    <div className="page-view-item-value col-md-12 col-sm-12">{registerItem.observation}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <div className="page-view-item-label col-md-12 col-sm-12">Seguimiento</div>
                    <div className="page-view-item-value col-md-12 col-sm-12">{registerItem.tracing}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <div className="page-view-item-label col-md-12 col-sm-12">Zona</div>
                    <div className="page-view-item-value col-md-12 col-sm-12">{zoneoptions.filter(z => z.id == registerItem.zoneId).map(x => x.zoneName.split(" ")[1])}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <div className="page-view-item-label col-md-12 col-sm-12">Filters</div>
                    <div className="page-view-item-value col-md-12 col-sm-12">
                        {filterItems.map(option => <div>{option}</div>)}
                    </div>
                </div>
            </div>
            <div className="form-group">
                {/* <Link to={'/Admin/Registers'} className="btn btn-primary">Back</Link> */}
                <button class="btn btn-primary" onClick={(evt) => { evt.preventDefault(); navigate(-1); }}>Retroceder</button>
            </div>
        </form>
    );
}

export { RegistersView };