import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { history } from '../../_helpers';
import { useZoneActions, useAlertActions } from '../../_actions';

function ZonesAddEdit({ match })
{
    const { id } = useParams();
    const isAddMode = !id;

    const navigate = useNavigate();

    const zoneActions = useZoneActions();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        zoneName: Yup.string()
            .required('Nombre de la zona obligatorio')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, formState: { errors }, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data)
    {
        return isAddMode
            ? createZone(data)
            : updateZone(id, data);
    }

    function createZone(data)
    {
        return zoneActions.create(data)
            .then(() =>
            {
                useAlertActions.success('Zona agregada', { keepAfterRouteChange: true });
                navigate('/Admin/Zones/');
            })
            .catch(useAlertActions.error);
    }

    function updateZone(id, data)
    {
        return zoneActions.update(id, data)
            .then(() =>
            {
                useAlertActions.success('Zona actualizada', { keepAfterRouteChange: true });
                navigate("/Admin/Zones/");
            })
            .catch(useAlertActions.error);
    }

    const [zoneItem, setZone] = useState({});
    const [options, setOptions] = useState([]);

    useEffect(() =>
    {
        zoneActions.getAll().then(x => setOptions(x));

        if (!isAddMode)
        {
            // get user and set form fields
            zoneActions.getById(id).then(zoneItem =>
            {
                const fields = ['zoneName'];
                fields.forEach(field => setValue(field, zoneItem[field], false));
                setZone(zoneItem);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Agregar Zona' : 'Editar Zona'}</h1>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Nombre de Zona</label>
                    <input name="zoneName" type="text" {...register('zoneName')} className={'form-control' + (errors.zoneName ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.zoneName?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Guardar
                </button>
                <Link to={isAddMode ? '/Admin/Zones' : '/Admin/Zones'} className="btn btn-link">Cancelar</Link>
            </div>
        </form>
    );
}

export { ZonesAddEdit };