import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import * as Icon from 'react-bootstrap-icons';

import { history } from '../../_helpers';
import { useUserActions, useAlertActions } from '../../_actions';


function Profile()
{
    //const { id } = useParams();
    const isAddMode = false;

    const navigate = useNavigate();

    const userActions = useUserActions();
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Nombre obligatorio'),
        email: Yup.string()
            .email('El correo electrónico es invalido')
            .required('Correo electrónico obligatorio'),
        roleId: Yup.string()
            .required('Rol obligatorio'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .concat(isAddMode ? Yup.string().required('Contraseña obligatoria') : null)
            .min(6, 'La contraseña debe tener al menos 6 caracteres'),
        confirmPassword: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .when('password', (password, schema) =>
            {
                if (password || isAddMode) return schema.required('Contraseña obligatoria');
            })
            .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'),
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
                useAlertActions.success('Usuario agregado', { keepAfterRouteChange: true });
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
                useAlertActions.success('Usuario actualizado', { keepAfterRouteChange: true });
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
                const fields = ['name', 'email', 'roleId', 'password', 'confirmPassword'];
                fields.forEach(field => setValue(field, user[field], false));
                setUser(user);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Agregar Usuario' : 'Editar Usuario'}</h1>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Nombre</label>
                    <input name="name" type="text" {...register('name')} className={'form-control' + (errors.name ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-8 col-sm-12">
                    <label>Correo electrónico</label>
                    <input name="email" type="text" {...register('email')} className={'form-control' + (errors.email ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col-md-4 col-sm-12">
                    <label>Rol</label>
                    <select name="roleId" {...register('roleId')} className={'form-control' + (errors.roleId ? ' is-invalid' : '')}>
                        {isAddMode ? <option value="">- Seleccione una opción -</option> : ''}
                        {options.map(option => (
                            <option key={option.roleName} value={option.id}>
                                {option.roleName}
                            </option>
                        ))}
                    </select>
                    <div className="invalid-feedback">{errors.roleId?.message}</div>
                </div>

                {!isAddMode &&
                    <div>
                        <h3 className="pt-3">Cambia la contraseña</h3>
                        <p>Dejar en blanco para mantener la misma contraseña</p>
                    </div>
                }
                <div className="form-row">
                    <div className="form-group col-md-6 col-sm-12">
                        <label>
                            Contraseña
                            {!isAddMode &&
                                (!showPassword
                                    ? <span> <a onMouseDown={() => setShowPassword(!showPassword)} className="text-primary" style={{ cursor: 'pointer' }}><Icon.EyeFill className='FontAwesomeIcon' /></a></span>
                                    : <span> <a onMouseUp={() => setShowPassword(!showPassword)} onMouseLeave={() => setShowPassword(!showPassword)} className="text-primary" style={{ cursor: 'pointer' }}><Icon.EyeSlash className='FontAwesomeIcon' /></a></span>
                                )
                            }
                        </label>
                        <input name="password" type={showPassword ? "text" : "password"} {...register('password')} className={'form-control' + (errors.password ? ' is-invalid' : '')} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <label>Confirmar contraseña</label>
                        <input name="confirmPassword" type="password" {...register('confirmPassword')} className={'form-control' + (errors.confirmPassword ? ' is-invalid' : '')} />
                        <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                    </div>
                </div>

            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Guardar
                </button>
                <Link to={isAddMode ? '/Admin/Users' : '/Admin/Users'} className="btn btn-link">Cancelar</Link>
            </div>
        </form>
    );
};

export default Profile;