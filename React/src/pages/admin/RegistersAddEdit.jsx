import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useUserActions, useAlertActions } from '../../_actions';

import UserRolesDropdown from '../../components/atoms/UserRolesDropdown';

function UsersAddEdit({ history, match = '/AlphaProject/Admin/Users' })
{
    //const { id } = match.params;
    const { id } = useParams();
    const isAddMode = !id;

    const userActions = useUserActions();
    const userAlerts = useAlertActions();

    const initialValues = {
        name: '',
        email: '',
        roleid: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('First Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        roleid: Yup.string()
            .required('Role is required')
    });

    function onSubmit(fields, { setStatus, setSubmitting })
    {
        setStatus();
        if (isAddMode)
        {
            createUser(fields, setSubmitting);
        } else
        {
            updateUser(id, fields, setSubmitting);
        }
    }

    function createUser(fields, setSubmitting)
    {
        userActions.create(fields)
            .then(() =>
            {
                userAlerts.success('User added', { keepAfterRouteChange: true });
                window.location.href = '/AlphaProject/Admin/Users/';
                //history.push('.');
            })
            .catch((error) =>
            {
                setSubmitting(false);
                userAlerts.error(error);
            });
    }

    function updateUser(id, fields, setSubmitting)
    {
        userActions.update(id, fields)
            .then(() =>
            {
                userAlerts.success('User updated', { keepAfterRouteChange: true });
                window.location.href = '/AlphaProject/Admin/Users/';
                //history.push('..');
            })
            .catch(error =>
            {
                setSubmitting(false);
                userAlerts.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {function Render({ errors, touched, isSubmitting, setFieldValue })
            {

                const [user, setUser] = useState({});
                const [showPassword, setShowPassword] = useState(false);

                useEffect(() =>
                {
                    if (!isAddMode)
                    {
                        // get user and set form fields
                        userActions.getById(id).then(user =>
                        {
                            const fields = ['name', 'email', 'roleid'];
                            fields.forEach(field => setFieldValue(field, user[field], false));
                            setUser(user);
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
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
                                <label>First Name</label>
                                <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                            </div>
                            {/* <div className="form-group col-5">
                                <label>Last Name</label>
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div> */}
                        </div>
                        <div className="form-row">
                            <div className="form-group col-7">
                                <label>Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col">
                                <label>Role</label>
                                {/* <Field name="role" as="select" className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}>
                                    <option value=""></option>
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </Field> */}
                                <Field name="roleid" as="select" className={'form-control' + (errors.roleid && touched.roleid ? ' is-invalid' : '')}>
                                    <UserRolesDropdown />
                                </Field>
                                <ErrorMessage name="roleid" component="div" className="invalid-feedback" />
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
                                            : <span> - {user.password}</span>
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
                            <Link to={isAddMode ? '/AlphaProject/Admin/Users' : '/AlphaProject/Admin/Users'} className="btn btn-link">Cancel</Link>
                        </div>
                    </Form>
                );
            }}
        </Formik >
    );
}

export { UsersAddEdit };