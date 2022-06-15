import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useUserActions } from '../_actions';

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
//       <Typography variant="h3">Login</Typography>
//     </Box>
//   );
// };

// export default Login;



export default function Login()
{

    const userActions = useUserActions();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

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
        <div className="card m-3">
            <h4 className="card-header">Login</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(userActions.login)}>
                    <div className="form-group">
                        <label>Email</label>
                        <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                    </button>
                    {/* <Link to="register" className="btn btn-link">Register</Link> */}
                </form>
            </div>
        </div>
    )
}