import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { history } from '../../_helpers';
import { useNewsActions, useAlertActions } from '../../_actions';

function NewsAddEdit({ match })
{
    const { id } = useParams();
    const isAddMode = !id;

    const navigate = useNavigate();

    const newsActions = useNewsActions();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        link: Yup.string()
            .required('Link is required'),
        description: Yup.string()
            .required('Link is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, formState: { errors }, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data)
    {
        return isAddMode
            ? createNews(data)
            : updateNews(id, data);
    }

    function createNews(data)
    {
        return newsActions.create(data)
            .then(() =>
            {
                useAlertActions.success('News added', { keepAfterRouteChange: true });
                navigate('/Admin/News/');
            })
            .catch(useAlertActions.error);
    }

    function updateNews(id, data)
    {
        return newsActions.update(id, data)
            .then(() =>
            {
                useAlertActions.success('News updated', { keepAfterRouteChange: true });
                navigate("/Admin/News/");
            })
            .catch(useAlertActions.error);
    }

    const [newsItem, setNews] = useState({});
    const [options, setOptions] = useState([]);

    useEffect(() =>
    {
        newsActions.getAll().then(x => setOptions(x));

        if (!isAddMode)
        {
            // get user and set form fields
            newsActions.getById(id).then(newsItem =>
            {
                const fields = ['link', 'description'];
                fields.forEach(field => setValue(field, newsItem[field], false));
                setNews(newsItem);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add News' : 'Edit News'}</h1>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Link</label>
                    <input name="link" type="text" {...register('link')} className={'form-control' + (errors.link ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.link?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Description</label>
                    <input name="description" type="text" {...register('description')} className={'form-control' + (errors.description ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '/Admin/News' : '/Admin/News'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { NewsAddEdit };