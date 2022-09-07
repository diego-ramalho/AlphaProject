import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { history } from '../../_helpers';
import { useRegisterActions, useZoneActions, useFilterActions, useAlertActions } from '../../_actions';

function RegistersAddEdit({ match })
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
        zoneActions.getAll().then(x => setZoneOptions(x));

        if (!isAddMode)
        {
            // get user and set form fields
            registerActions.getById(id).then(registerItem =>
            {
                const fields = ['address', 'name', 'number', 'observation', 'phone', 'tracing', 'zoneId'];
                fields.forEach(field => setValue(field, registerItem[field], false));
                setRegister(registerItem);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Agregar Taratura' : 'Editar Taratura'}</h1>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Direccion</label>
                    <input name="address" type="text" {...register('address')} className={'form-control' + (errors.address ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.address?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Nombre y Apellidos</label>
                    <input name="name" type="text" {...register('name')} className={'form-control' + (errors.name ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-4 col-sm-12">
                    <label>Puerta</label>
                    <input name="number" type="text" {...register('number')} className={'form-control' + (errors.number ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.number?.message}</div>
                </div>
                <div className="form-group col-md-8 col-sm-12">
                    <label>Telefono</label>
                    <input name="phone" type="text" {...register('phone')} className={'form-control' + (errors.phone ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.phone?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Observaciones</label>
                    <textarea name="observation" rows={5} {...register('observation')} className={'form-control' + (errors.observation ? ' is-invalid' : '')} wrap="soft"></textarea>
                    {/* <input name="observation" type="text" {...register('observation')} className={'form-control' + (errors.observation ? ' is-invalid' : '')} /> */}
                    <div className="invalid-feedback">{errors.observation?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Seguimiento</label>
                    <input name="tracing" type="text" {...register('tracing')} className={'form-control' + (errors.tracing ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.tracing?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-4 col-sm-12">
                    <label>Zona</label>
                    <select name="zoneId" {...register('zoneId')} className={'form-control' + (errors.zoneId ? ' is-invalid' : '')}>
                        {zoneoptions.map(option => (
                            <option key={option.zoneName} value={option.id}>
                                {option.zoneName}
                            </option>
                        ))}
                    </select>
                    <div className="invalid-feedback">{errors.zoneId?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-sm-12 checkbox-group">
                    {/* <select name="filterId" {...register('filterId')} className={'form-control' + (errors.filterId ? ' is-invalid' : '')}>
                        {Array.from(filteroptions).map(option => (
                            <option key={option.filterName} value={option.id}>
                                {option.filterName}
                            </option>
                        ))}
                    </select> */}
                    {filteroptions.map(option => (
                        <>
                            <input type="checkbox" {...register('filterList')} id={option.id} name="filterList" onChange={handleChkboxChange} key={"filter-" + option.id} value={option.id}></input>
                            <label for={"filter-" + option.id}>{option.filterName}</label><br />
                        </>
                    ))}
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Guardar
                </button>
                <Link to={isAddMode ? '/Admin/Registers' : '/Admin/Registers'} className="btn btn-link">Cancelar</Link>
            </div>
        </form>
    );
}

export { RegistersAddEdit };