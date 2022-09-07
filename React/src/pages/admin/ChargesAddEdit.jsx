import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { history } from '../../_helpers';
import { useChargesActions, useAlertActions } from '../../_actions';

function ChargesAddEdit({ match })
{
    const { id } = useParams();
    const isAddMode = !id;

    const navigate = useNavigate();

    const chargesActions = useChargesActions();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        value: Yup.string()
            .required('Valor obligatorio'),
        description: Yup.string()
            .required('Descripción obligatorio')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, formState: { errors }, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data)
    {
        return isAddMode
            ? createCharges(data)
            : updateCharges(id, data);
    }

    function createCharges(data)
    {
        return chargesActions.create(data)
            .then(() =>
            {
                useAlertActions.success('Encargo agregado', { keepAfterRouteChange: true });
                navigate('/Admin/Charges/');
            })
            .catch(useAlertActions.error);
    }

    function updateCharges(id, data)
    {
        return chargesActions.update(id, data)
            .then(() =>
            {
                useAlertActions.success('Encargo actualizado', { keepAfterRouteChange: true });
                navigate("/Admin/Charges/");
            })
            .catch(useAlertActions.error);
    }

    const [chargesItem, setCharges] = useState({});
    const [options, setOptions] = useState([]);

    useEffect(() =>
    {
        chargesActions.getAll().then(x => setOptions(x));

        if (!isAddMode)
        {
            // get user and set form fields
            chargesActions.getById(id).then(chargesItem =>
            {
                const fields = ['value', 'description'];
                fields.forEach(field => setValue(field, chargesItem[field], false));
                setCharges(chargesItem);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Agregar Encargo' : 'Editar Encargos'}</h1>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Valor</label>
                    <input name="value" type="text" {...register('value')} className={'form-control' + (errors.value ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.value?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Descripción</label>
                    <input name="description" type="text" {...register('description')} className={'form-control' + (errors.description ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Guardar
                </button>
                <Link to={isAddMode ? '/Admin/Charges' : '/Admin/Charges'} className="btn btn-link">Cancelar</Link>
            </div>
        </form>
    );
}

export { ChargesAddEdit };