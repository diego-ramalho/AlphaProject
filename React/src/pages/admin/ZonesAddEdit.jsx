import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useZoneActions, useAlertActions } from '../../_actions';

function ZonesAddEdit({ history, match = '/AlphaProject/Admin/Zones' })
{
    const { id } = useParams();
    const isAddMode = !id;

    const zoneActions = useZoneActions();
    const zoneAlerts = useAlertActions();

    const initialValues = {
        zoneName: ''
    };

    const validationSchema = Yup.object().shape({
        zoneName: Yup.string()
            .required('Zone Name is required')
    });

    function handleSubmit(fields, { setStatus, setSubmitting })
    {
        setStatus();
        if (isAddMode)
        {
            createZone(fields, setSubmitting);
        } else
        {
            updateZone(id, fields, setSubmitting);
        }
    }

    function createZone(fields, setSubmitting)
    {
        zoneActions.create(fields)
            .then(() =>
            {
                zoneAlerts.success('Zone added', { keepAfterRouteChange: true });
                window.location.href = '/AlphaProject/Admin/Zones/';
            })
            .catch((error) =>
            {
                setSubmitting(false);
                zoneAlerts.error(error);
            });
    }

    function updateZone(id, fields, setSubmitting)
    {
        zoneActions.update(id, fields)
            .then(() =>
            {
                zoneAlerts.success('Zone updated', { keepAfterRouteChange: true });
                window.location.href = '/AlphaProject/Admin/Zones/';
            })
            .catch(error =>
            {
                setSubmitting(false);
                zoneAlerts.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {function Render({ errors, touched, isSubmitting, setFieldValue })
            {

                const [zone, setZone] = useState({});

                useEffect(() =>
                {
                    if (!isAddMode)
                    {
                        // get Zone and set form fields
                        zoneActions.getById(id).then(zone =>
                        {
                            const fields = ['zoneName'];
                            fields.forEach(field => setFieldValue(field, zone[field], false));
                            setZone(zone);
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h1>{isAddMode ? 'Add Zone' : 'Edit Zone'}</h1>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Zone Name</label>
                                <Field name="zoneName" type="text" className={'form-control' + (errors.zonename && touched.zonename ? ' is-invalid' : '')} />
                                <ErrorMessage name="zoneName" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="Submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                            <Link to={isAddMode ? '/AlphaProject/Admin/Zones' : '/AlphaProject/Admin/Zones'} className="btn btn-link">Cancel</Link>
                        </div>
                    </Form>
                );
            }}
        </Formik >
    );
}

export { ZonesAddEdit };