import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateZone } from '../store/zoneSlice';

import { useUserActions, useAlertActions } from '../_actions';

import { useRecoilValue } from 'recoil';

import { authAtom } from '../_state';

import * as Icon from 'react-bootstrap-icons';

// lang config
import appLang from '../lang/resources.json';

// http get request
import * as Api from '../api/call';

export default function Recover()
{
    const navigate = useNavigate();

    const auth = useRecoilValue(authAtom);

    if (auth) window.location.href = '/taraturas';

    const [forgotPass, setForgotPass] = useState(false);

    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const zones = useSelector((state) => state.zones);

    const userActions = useUserActions();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState: { errors }, formState } = useForm(formOptions);
    const onSubmit = async (data) =>
    {
        await userActions.recoverPass(data)
            .then(() =>
            {
                useAlertActions.success('pass recovered', { keepAfterRouteChange: true });
                navigate("/Login");
            })
            .catch(() =>
            {
                useAlertActions.error('email not found', { keepAfterRouteChange: true });
            });
    };
    //const { errors, isSubmitting } = formState;

    // useEffect(() => {
    //     alert(register);
    // }, [register]);

    return (
        <>
            <div className="card m-3 forgot-pass-form">
                <h4 className="card-header">Recover Password</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Recover
                        </button>
                        <Link to="Login" className="btn btn-link">Back to Login</Link>
                    </form>
                </div>
            </div>
        </>
    )
}