import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { history } from '../../_helpers';
import { useUserActions, useZoneActions, useAlertActions } from '../../_actions';

function UsersAddEdit({ match }) {
    //const { id } = match.params;
    const { id } = useParams();
    const isAddMode = !id;

    const navigate = useNavigate();

    const userActions = useUserActions();
    const zoneActions = useZoneActions();
    //const alertActions = useAlertActions();
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        // title: Yup.string()
        //     .required('Título obligatorio'),
        // lastName: Yup.string()
        //     .required('Apellido obligatorio'),
        // password: Yup.string()
        //     .transform(x => x === '' ? undefined : x)
        //     .concat(isAddMode ? Yup.string().required('Contraseña obligatoria') : null)
        //     .min(6, 'Password must be at least 6 characters'),
        // confirmPassword: Yup.string()
        //     .transform(x => x === '' ? undefined : x)
        //     .when('password', (password, schema) => {
        //         if (password || isAddMode) return schema.required('Confirm Contraseña obligatoria');
        //     })
        //     .oneOf([Yup.ref('password')], 'Passwords must match'),
        name: Yup.string()
            .required('Nombre obligatorio'),
        email: Yup.string()
            .email('El correo electrónico es invalido')
            .required('Correo electrónico obligatorio'),
        roleId: Yup.string()
            .required('Rol obligatorio'),
        zoneId: Yup.string()
            .required('Zona obligatoria'),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, formState: { errors }, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(id, data);
    }

    function createUser(data) {
        return userActions.create(data)
            .then(() => {
                useAlertActions.success('Usuario agregado', { keepAfterRouteChange: true });
                //history.push('.');
                //history.push('/Admin/Users/');
                navigate("/Admin/Users/");
                //window.location.href = '/Admin/Users/';
            })
            .catch(useAlertActions.error);
    }

    function updateUser(id, data) {
        return userActions.update(id, data)
            .then(() => {
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
    const [zonesOptions, setZoneOptions] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
        
    useEffect(() => {
        userActions.getUsersRoles().then(x => setOptions(x));
        zoneActions.getAll().then(x => setZoneOptions(x));

        if (!isAddMode) {
            // get user and set form fields
            userActions.getById(id).then(user => {
                const fields = ['name', 'email', 'roleId', 'zoneId'];
                fields.forEach(field => setValue(field, user[field], false));
                setUser(user);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Agregar Usuario' : 'Editar Usuario'}</h1>
            <div className="form-row">
                {/* <div className="form-group col">
                    <label>Titulo</label>
                    <select name="title" className={'form-control' + (errors.title ? ' is-invalid' : '')} >
                        <option value=""></option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms">Ms</option>
                    </select>
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div> */}
                <div className="form-group col-12">
                    <label>Nombre</label>
                    <input name="name" type="text" {...register('name')} className={'form-control' + (errors.name ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                {/* <div className="form-group col-5">
                    <label>Last Name</label>
                    <input name="lastName" type="text" {...register} className={'form-control' + (errors.lastName ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div> */}
            </div>
            <div className="form-row">
                <div className="form-group col-md-12 col-sm-12">
                    <label>Correo electrónico</label>
                    <input name="email" type="text" {...register('email')} className={'form-control' + (errors.email ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6 col-sm-12">
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
                <div className="form-group col-md-6 col-sm-12">
                    <label>Zona</label>
                    <select name="zoneId" {...register('zoneId')} className={'form-control' + (errors.zoneId ? ' is-invalid' : '')}>
                        {isAddMode ? <option value="">- Seleccione una opción -</option> : ''}
                        {zonesOptions.map(option => (
                            <option key={option.zoneName} value={option.id}>
                                {option.zoneName}
                            </option>
                        ))}
                    </select>
                    <div className="invalid-feedback">{errors.zoneId?.message}</div>
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
                                : <em> - {user.password}</em>
                            )
                        }
                    </label>
                    <input name="password" type="password" {...register} className={'form-control' + (errors.password ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Confirm Password</label>
                    <input name="confirmPassword" type="password" {...register} className={'form-control' + (errors.confirmPassword ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                </div>
            </div> */}
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Guardar
                </button>
                <Link to={isAddMode ? '/Admin/Users' : '/Admin/Users'} className="btn btn-link">Cancelar</Link>
            </div>
        </form>
    );
}

export { UsersAddEdit };






// import React, { useEffect, useState, useRef } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// // import Loading from '../../components/atoms/Loading';

// import { useUserActions, useAlertActions } from '../../_actions';

// import { UserRolesListDropDown } from '../../components/atoms/UserRolesDropdown';

// function UsersAddEdit({ history, match = '/Admin/Users' })
// {

//     const [user, setUser] = useState({});

//     const initialValues = {
//         name: '',
//         email: '',
//         roleId: ''
//     };

//     // const [loading, setLoading] = useState(true);

//     // useEffect(() =>
//     // {
//     //     setTimeout(() => setLoading(false), 200);
//     //     //setLoading(false);
//     // }, [{ user }])

//     //const { id } = match.params;
//     const { id } = useParams();
//     const isAddMode = !id;

//     const userActions = useUserActions();
//     const userAlerts = useAlertActions();

//     const validationSchema = Yup.object().shape({
//         name: Yup.string()
//             .required('Nombre obligatorio'),
//         email: Yup.string()
//             .email('El correo electrónico es invalido')
//             .required('Correo electrónico obligatorio'),
//         roleId: Yup.string()
//             .required('Rol obligatorio')
//     });

//     function onSubmit(fields, { setStatus, setSubmitting })
//     {
//         setStatus();
//         if (isAddMode)
//         {
//             createUser(fields, setSubmitting);
//         } else
//         {
//             updateUser(id, fields, setSubmitting);
//         }
//     }

//     function createUser(fields, setSubmitting)
//     {
//         userActions.create(fields)
//             .then(() =>
//             {
//                 userAlerts.success('Usuario agregado', { keepAfterRouteChange: true });
//                 window.location.href = '/Admin/Users/';
//                 //history.push('.');
//             })
//             .catch((error) =>
//             {
//                 setSubmitting(false);
//                 userAlerts.error(error);
//             });
//     }

//     function updateUser(id, fields, setSubmitting)
//     {
//         userActions.update(id, fields)
//             .then(() =>
//             {
//                 userAlerts.success('Usuario actualizado', { keepAfterRouteChange: true });
//                 window.location.href = '/Admin/Users/';
//                 //history.push('..');
//             })
//             .catch(error =>
//             {
//                 setSubmitting(false);
//                 userAlerts.error(error);
//             });
//     }

//     return (
//         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
//             {function Render({ errors, touched, isSubmitting, setFieldValue })
//             {
//                 const [showPassword, setShowPassword] = useState(false);

//                 //const selectValue = useRef(1);

//                 const [options, setOptions] = useState([]);
//                 const [selectedrole, setSelectedRole] = useState(1);
                
//                 useEffect(() =>
//                 {
//                     userActions.getUsersRoles().then(x => setOptions(x));
//                     console.log({ options });
//                 }, []);


//                 useEffect(() =>
//                 {
//                     if (!isAddMode)
//                     {
//                         // get user and set form fields
//                         userActions.getById(id).then(user =>
//                         {
//                             const fields = ['name', 'email', 'roleId'];
//                             fields.forEach(field => setFieldValue(field, user[field], false));
//                             setUser(user);
//                             //selectValue.current = user.roleId;
//                             setSelectedRole(user.roleId);
//                             console.log('User: ' + user.roleId);
//                         });
//                     }
//                 }, []);

//                 const handleChange = event =>
//                 {
//                     setSelectedRole(Number(event.target.value));
//                     //selectValue.current = Number(event.target.value);
//                     console.log('Correct value: ' + event.target.value);
//                     console.log('Changed: ' + selectedrole);
//                     //console.log('Teste: ' + selectValue.current);
//                     //initialValues.roleId = selectValue.current;
//                 };

//                 return (
//                     <Form>
//                         <h1>{isAddMode ? 'Agregar Usuario' : 'Editar Usuario'}</h1>
//                         <div className="form-row">
//                             {/* <div className="form-group col">
//                                 <label>Titulo</label>
//                                 <Field name="title" as="select" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}>
//                                     <option value=""></option>
//                                     <option value="Mr">Mr</option>
//                                     <option value="Mrs">Mrs</option>
//                                     <option value="Miss">Miss</option>
//                                     <option value="Ms">Ms</option>
//                                 </Field>
//                                 <ErrorMessage name="title" component="div" className="invalid-feedback" />
//                             </div> */}
//                             <div className="form-group col-5">
//                                 <label>First Name</label>
//                                 <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
//                                 <ErrorMessage name="name" component="div" className="invalid-feedback" />
//                             </div>
//                             {/* <div className="form-group col-5">
//                                 <label>Last Name</label>
//                                 <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
//                                 <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
//                             </div> */}
//                         </div>
//                         <div className="form-row">
//                             <div className="form-group col-7">
//                                 <label>Correo electrónico</label>
//                                 <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
//                                 <ErrorMessage name="email" component="div" className="invalid-feedback" />
//                             </div>
//                             <div className="form-group col">
//                                 <label>Rol</label>
//                                 {/* <Field name="role" as="select" className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}>
//                                     <option value="2">User</option>
//                                     <option value="1">Admin</option>
//                                 </Field> */}
//                                 {/* <Field name="roleId" as="select" className={'form-control' + (errors.roleId && touched.roleId ? ' is-invalid' : '')}>
//                                     <UserRolesListDropDown />                                    
//                                 </Field> */}
//                                 <Field name="roleId" as="select" value={selectedrole} onChange={handleChange} className={'form-control' + (errors.roleId && touched.roleId ? ' is-invalid' : '')}>
//                                     {/* <option value="1">Admin</option>
//                                     <option value="2">User</option> */}
//                                     {options.map(option => (
//                                         <option key={option.roleName} value={option.id}>
//                                             {option.roleName}
//                                         </option>
//                                     ))}
//                                 </Field>
//                                 <ErrorMessage name="roleId" component="div" className="invalid-feedback" />
//                             </div>
//                         </div>
//                         {/* {!isAddMode &&
//                             <div>
//                                 <h3 className="pt-3">Change Password</h3>
//                                 <p>Leave blank to keep the same password</p>
//                             </div>
//                         }
//                         <div className="form-row">
//                             <div className="form-group col">
//                                 <label>
//                                     Password
//                                     {!isAddMode &&
//                                         (!showPassword
//                                             ? <span> - <a onClick={() => setShowPassword(!showPassword)} className="text-primary">Show</a></span>
//                                             : <span> - {user.password}</span>
//                                         )
//                                     }
//                                 </label>
//                                 <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
//                                 <ErrorMessage name="password" component="div" className="invalid-feedback" />
//                             </div>
//                             <div className="form-group col">
//                                 <label>Confirm Password</label>
//                                 <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
//                                 <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
//                             </div>
//                         </div> */}
//                         <div className="form-group">
//                             <button type="submit" disabled={isSubmitting} className="btn btn-primary">
//                                 {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
//                                 Guardar
//                             </button>
//                             <Link to={isAddMode ? '/Admin/Users' : '/Admin/Users'} className="btn btn-link">Cancelar</Link>
//                         </div>
//                     </Form>
//                 );
//             }}
//         </Formik >
//     );
// }

// export { UsersAddEdit };