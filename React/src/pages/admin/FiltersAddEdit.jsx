import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useFilterActions, useAlertActions } from '../../_actions';

function FiltersAddEdit({ history, match = '/AlphaProject/Admin/Filters' })
{
    const { id } = useParams();
    const isAddMode = !id;

    const filterActions = useFilterActions();
    const filterAlerts = useAlertActions();

    const initialValues = {
        filterName: ''
    };

    const validationSchema = Yup.object().shape({
        filterName: Yup.string()
            .required('Filter Name is required')
    });

    function handleSubmit(fields, { setStatus, setSubmitting })
    {
        setStatus();
        if (isAddMode)
        {
            createFilter(fields, setSubmitting);
        } else
        {
            updateFilter(id, fields, setSubmitting);
        }
    }

    function createFilter(fields, setSubmitting)
    {
        filterActions.create(fields)
            .then(() =>
            {
                filterAlerts.success('Filter added', { keepAfterRouteChange: true });
                window.location.href = '/AlphaProject/Admin/Filters/';
            })
            .catch((error) =>
            {
                setSubmitting(false);
                filterAlerts.error(error);
            });
    }

    function updateFilter(id, fields, setSubmitting)
    {
        filterActions.update(id, fields)
            .then(() =>
            {
                filterAlerts.success('Filter updated', { keepAfterRouteChange: true });
                window.location.href = '/AlphaProject/Admin/Filters/';
            })
            .catch(error =>
            {
                setSubmitting(false);
                filterAlerts.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {function Render({ errors, touched, isSubmitting, setFieldValue })
            {

                const [filter, setFilter] = useState({});

                useEffect(() =>
                {
                    if (!isAddMode)
                    {
                        // get Filter and set form fields
                        filterActions.getById(id).then(filter =>
                        {
                            const fields = ['filterName'];
                            fields.forEach(field => setFieldValue(field, filter[field], false));
                            setFilter(filter);
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h1>{isAddMode ? 'Add Filter' : 'Edit Filter'}</h1>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Filter Name</label>
                                <Field name="filterName" type="text" className={'form-control' + (errors.filtername && touched.filtername ? ' is-invalid' : '')} />
                                <ErrorMessage name="filterName" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="Submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                            <Link to={isAddMode ? '/AlphaProject/Admin/Filters' : '/AlphaProject/Admin/Filters'} className="btn btn-link">Cancel</Link>
                        </div>
                    </Form>
                );
            }}
        </Formik >
    );
}

export { FiltersAddEdit };