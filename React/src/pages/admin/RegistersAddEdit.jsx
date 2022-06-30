import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useRegisterActions, useAlertActions } from '../../_actions';

import { ZonesListDropDown } from '../../components/atoms/ZonesDropdown';

function RegistersAddEdit({ history, match = '/AlphaProject/Admin/Registers' })
{
    //const { id } = match.params;
    const { id } = useParams();
    const isAddMode = !id;

    const registerActions = useRegisterActions();
    const registerAlerts = useAlertActions();

    const initialValues = {
        address: '',
        number: '',
        zoneid: ''
    };

    const validationSchema = Yup.object().shape({
        address: Yup.string()
            .required('First Name is required'),
        number: Yup.string()
            .required('Email is required'),
        zoneid: Yup.string()
            .required('Role is required')
    });

    function onSubmit(fields, { setStatus, setSubmitting })
    {
        setStatus();
        if (isAddMode)
        {
            createRegister(fields, setSubmitting);
        } else
        {
            updateRegister(id, fields, setSubmitting);
        }
    }

    function createRegister(fields, setSubmitting)
    {
        registerActions.create(fields)
            .then(() =>
            {
                registerAlerts.success('Register added', { keepAfterRouteChange: true });
                window.location.href = '/AlphaProject/Admin/Registers/';
                //history.push('.');
            })
            .catch((error) =>
            {
                setSubmitting(false);
                registerAlerts.error(error);
            });
    }

    function updateRegister(id, fields, setSubmitting)
    {
        registerActions.update(id, fields)
            .then(() =>
            {
                registerAlerts.success('Register updated', { keepAfterRouteChange: true });
                window.location.href = '/AlphaProject/Admin/Registers/';
                //history.push('..');
            })
            .catch(error =>
            {
                setSubmitting(false);
                registerAlerts.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {function Render({ errors, touched, isSubmitting, setFieldValue })
            {

                const [register, setRegister] = useState({});
                const [showPassword, setShowPassword] = useState(false);

                useEffect(() =>
                {
                    if (!isAddMode)
                    {
                        // get register and set form fields
                        registerActions.getById(id).then(register =>
                        {
                            const fields = ['address', 'number', 'zoneid'];
                            fields.forEach(field => setFieldValue(field, register[field], false));
                            setRegister(register);
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h1>{isAddMode ? 'Add Register' : 'Edit Register'}</h1>
                        <div className="form-row">
                            {/* <div className="form-group col">
                                <label>Title</label>
                                <Field name="title" as="select" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}>
                                    <option value=""></option>
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Miss">Miss</option>
                                    <option value="Ms">Ms</option>
                                </Field>
                                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                            </div> */}
                            <div className="form-group col-5">
                                <label>Address</label>
                                <Field name="address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                                <ErrorMessage name="address" component="div" className="invalid-feedback" />
                            </div>
                            {/* <div className="form-group col-5">
                                <label>Last Name</label>
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div> */}
                        </div>
                        <div className="form-row">
                            <div className="form-group col-7">
                                <label>Number</label>
                                <Field name="number" type="text" className={'form-control' + (errors.number && touched.number ? ' is-invalid' : '')} />
                                <ErrorMessage name="number" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col">
                                <label>Role</label>
                                {/* <Field name="role" as="select" className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}>
                                    <option value=""></option>
                                    <option value="Register">Register</option>
                                    <option value="Admin">Admin</option>
                                </Field> */}
                                <Field name="zoneid" as="select" value={register.zoneId} className={'form-control' + (errors.zoneid && touched.zoneid ? ' is-invalid' : '')}>
                                    <ZonesListDropDown />
                                </Field>
                                <ErrorMessage name="zoneid" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        {/* {!isAddMode &&
                            <div>
                                <h3 className="pt-3">Change Password</h3>
                                <p>Leave blank to keep the same password</p>
                            </div>
                        }
                        <div className="form-row">
                            <div className="form-group col">
                                <label>
                                    Password
                                    {!isAddMode &&
                                        (!showPassword
                                            ? <span> - <a onClick={() => setShowPassword(!showPassword)} className="text-primary">Show</a></span>
                                            : <span> - {register.password}</span>
                                        )
                                    }
                                </label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col">
                                <label>Confirm Password</label>
                                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>
                        </div> */}
                        <div className="form-group">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                            <Link to={isAddMode ? '/AlphaProject/Admin/Registers' : '/AlphaProject/Admin/Registers'} className="btn btn-link">Cancel</Link>
                        </div>
                    </Form>
                );
            }}
        </Formik >
    );
}

export { RegistersAddEdit };