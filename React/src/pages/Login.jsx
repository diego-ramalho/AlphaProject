import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateZone } from '../store/zoneSlice';

import { useUserActions, useAlertActions } from '../_actions';

import { useRecoilValue } from 'recoil';

import { authAtom } from '../_state';

import * as Icon from 'react-bootstrap-icons';

// lang config
import appLang from '../lang/resources.json';

// http get request
import * as Api from '../api/call';

// const Login: FC<any> = (): ReactElement => {
//   return (
//     <Box
//       sx={{
//         flexGrow: 1,
//         backgroundColor: "whitesmoke",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Typography variant="h3">Acceso</Typography>
//     </Box>
//   );
// };

// export default Login;



export default function Login()
{
    const navigate = useNavigate();

    const auth = useRecoilValue(authAtom);

    if (auth) window.location.href = '/taraturas';
    //if (auth) navigate("/taraturas");

    // const [value, setValue] = useState('');
    // const dispatch = useDispatch();
    // const zones = useSelector((state) => state.zones);

    // alert(zones);

    // useEffect(() =>
    // {
    //     dispatch(updateZone(3));
    // }, []);

    const userActions = useUserActions();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Correo electrónico obligatorio'),
        password: Yup.string().required('Contraseña obligatoria')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState: { errors }, formState } = useForm(formOptions);
    const onSubmit = async (data) =>
    {
        await userActions.login(data)
            .then(() =>
            {
                useAlertActions.success('successful login', { keepAfterRouteChange: true });
                //navigate("/Login");
            })
            .catch(() =>
            {
                useAlertActions.error('Invalid email or password', { keepAfterRouteChange: true });
            });
    };

    //const { errors, isSubmitting } = formState;

    // const handleSubmit = (event: any) => {
    //     event.preventDefault();
    //     Api.PostTest(emailValue, passwordValue).then(res => {
    //         console.log(res);
    //         //alert(res[0].name);
    //         alert(res.name);

    //         res.map((user: any) => {
    //             if (emailValue === user.email && passwordValue === user.password) {
    //                 alert("Valid User");
    //             }
    //         });
    //     })
    //         .catch(error => {
    //             alert(error.response.status);
    //         });
    // };

    return (
        <>
            <div className="card m-3 login-form">
                <h4 className="card-header">Acceso</h4>
                <div className="card-body">
                    <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Correo electrónico</label>
                            <input autocomplete="false" name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input autocomplete="false" name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Continuar
                        </button>
                        {/* <a onClick={() => setForgotPass(!forgotPass)} className="btn text-primary">
                            Forgot Password?
                        </a> */}
                        <Link to="Recover" className="btn btn-link">Recuperar Contraseña</Link>
                    </form>
                </div>
            </div>
        </>
    )
}