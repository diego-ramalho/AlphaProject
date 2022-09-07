import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { history } from '../../_helpers';
import { useFilterActions, useAlertActions } from '../../_actions';

function FiltersAddEdit({ match })
{
    const { id } = useParams();
    const isAddMode = !id;

    const navigate = useNavigate();

    const filterActions = useFilterActions();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        filterName: Yup.string()
            .required('Nombre del filtro obligatorio')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, formState: { errors }, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data)
    {
        return isAddMode
            ? createFilter(data)
            : updateFilter(id, data);
    }

    function createFilter(data)
    {
        return filterActions.create(data)
            .then(() =>
            {
                useAlertActions.success('Filtro agregado', { keepAfterRouteChange: true });
                navigate('/Admin/Filters/');
            })
            .catch(useAlertActions.error);
    }

    function updateFilter(id, data)
    {
        return filterActions.update(id, data)
            .then(() =>
            {
                useAlertActions.success('Filtro actualizado', { keepAfterRouteChange: true });
                navigate("/Admin/Filters/");
            })
            .catch(useAlertActions.error);
    }

    const [filterItem, setFilter] = useState({});
    const [options, setOptions] = useState([]);

    useEffect(() =>
    {
        filterActions.getAll().then(x => setOptions(x));

        if (!isAddMode)
        {
            // get user and set form fields
            filterActions.getById(id).then(filterItem =>
            {
                const fields = ['filterName'];
                fields.forEach(field => setValue(field, filterItem[field], false));
                setFilter(filterItem);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Agregar Filtro' : 'Editar Filtro'}</h1>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Filter Name</label>
                    <input name="filterName" type="text" {...register('filterName')} className={'form-control' + (errors.filterName ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.filterName?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Guardar
                </button>
                <Link to={isAddMode ? '/Admin/Filters' : '/Admin/Filters'} className="btn btn-link">Cancelar</Link>
            </div>
        </form>
    );
}

export { FiltersAddEdit };