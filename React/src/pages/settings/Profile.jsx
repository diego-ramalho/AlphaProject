import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { history } from '../../_helpers';
import { useUserActions, useAlertActions } from '../../_actions';


const Profile = () =>
{
    //const { id } = useParams();
    const isAddMode = false;

    const navigate = useNavigate();

    const userActions = useUserActions();
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('First Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        roleId: Yup.string()
            .required('Role is required'),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, formState: { errors }, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data)
    {
        return isAddMode
            ? createUser(data)
            : updateUser(data);
    }

    function createUser(data)
    {
        return userActions.create(data)
            .then(() =>
            {
                useAlertActions.success('User added', { keepAfterRouteChange: true });
                //history.push('.');
                //history.push('/Admin/Users/');
                navigate("/Admin/Users/");
                //window.location.href = '/Admin/Users/';
            })
            .catch(useAlertActions.error);
    }

    function updateUser(data)
    {
        return userActions.updateCurrentUser(data)
            .then(() =>
            {
                useAlertActions.success('User updated', { keepAfterRouteChange: true });
                //history.push('..');
                //history.push('/Admin/Users/');
                navigate("/Admin/Users/");
                //window.location.href = '/Admin/Users/';
            })
            .catch(useAlertActions.error);
    }

    const [user, setUser] = useState({});
    const [options, setOptions] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() =>
    {
        userActions.getUsersRoles().then(x => setOptions(x));

        if (!isAddMode)
        {
            // get user and set form fields
            userActions.getCurrentUser().then(user =>
            {
                const fields = ['name', 'email', 'roleId'];
                fields.forEach(field => setValue(field, user[field], false));
                setUser(user);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Name</label>
                    <input name="name" type="text" {...register('name')} className={'form-control' + (errors.name ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-8 col-sm-12">
                    <label>Email</label>
                    <input name="email" type="text" {...register('email')} className={'form-control' + (errors.email ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col-md-4 col-sm-12">
                    <label>Role</label>
                    <select name="roleId" {...register('roleId')} className={'form-control' + (errors.roleId ? ' is-invalid' : '')}>
                        {options.map(option => (
                            <option key={option.roleName} value={option.id}>
                                {option.roleName}
                            </option>
                        ))}
                    </select>
                    <div className="invalid-feedback">{errors.roleId?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '/Admin/Users' : '/Admin/Users'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
};

export default Profile;