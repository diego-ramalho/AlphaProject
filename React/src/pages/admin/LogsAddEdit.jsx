import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { history } from '../../_helpers';
import { useLogActions, useAlertActions } from '../../_actions';

function LogsAddEdit({ match })
{
    const { id } = useParams();
    const isAddMode = !id;

    const navigate = useNavigate();

    const logActions = useLogActions();

    const [inputBase64, setInputBase64] = useState('');
    const [decodedString, setDecodedString] = useState('');

    const handleDecode = () =>
    {
        try
        {
            const decoded = atob(inputBase64); // Decodificando de base64
            setDecodedString(decoded);
        } catch (e)
        {
            setDecodedString('Erro ao decodificar');
        }
    };

    // form validation rules 
    const validationSchema = Yup.object().shape({
        userId: Yup.number(),
        userName: Yup.string(),
        eventType: Yup.string(),
        eventMethod: Yup.string(),
        eventResult: Yup.string(),
        previousData: Yup.string(),
        updatedData: Yup.string(),
        updateTime: Yup.date(),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, formState: { errors }, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data)
    {
        return isAddMode
            ? createLog(data)
            : updateLog(id, data);
    }

    function createLog(data)
    {
        return logActions.create(data)
            .then(() =>
            {
                useAlertActions.success('Zona agregada', { keepAfterRouteChange: true });
                navigate('/Admin/Logs/');
            })
            .catch(useAlertActions.error);
    }

    function updateLog(id, data)
    {
        return logActions.update(id, data)
            .then(() =>
            {
                useAlertActions.success('Zona actualizada', { keepAfterRouteChange: true });
                navigate("/Admin/Logs/");
            })
            .catch(useAlertActions.error);
    }

    const [logItem, setLog] = useState({});
    const [options, setOptions] = useState([]);

    useEffect(() =>
    {
        logActions.getAll().then(x => setOptions(x));

        if (!isAddMode)
        {
            // get user and set form fields
            logActions.getById(id).then(logItem =>
            {
                const fields = ['userId', 'userName', 'eventType', 'eventMethod', 'eventResult', 'updateTime'];
                fields.forEach(field => setValue(field, logItem[field], false));
                setLog(logItem);
            });
        }
    }, []);

    return (
        <div>
            {/* <h2>Valores de logItem:</h2>
            {Object.keys(logItem).map((key) => (
                <div key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {logItem[key]}
                </div>
            ))} */}

            <h1>Log Info</h1>
            {
                <div>
                    <table className='LogInfo'>
                        <tr><td className='LogInfoPropName'>User:</td><td className='LogInfoPropValue'>{logItem.userName} [{logItem.userId}]</td></tr>
                        <tr><td className='LogInfoPropName'>Event Type:</td><td className='LogInfoPropValue'>{logItem.eventType}</td></tr>
                        <tr><td className='LogInfoPropName'>Event Method:</td><td className='LogInfoPropValue'>{logItem.eventMethod}</td></tr>
                        <tr><td className='LogInfoPropName'>Event Result:</td><td className='LogInfoPropValue'>{logItem.eventResult}</td></tr>
                        <tr><td className='LogInfoPropName'>Last Change:</td><td className='LogInfoPropValue'>{logItem.updateTime}</td></tr>

                        {logItem.updatedData && <>
                            <tr><td colSpan={2} className='LogInfoPropNameLine'>Updated Data [{logItem.updatedData.lastUpdate}]</td></tr>
                            <tr><td className='LogInfoPropName'>Id:</td><td className='LogInfoPropValue'>{logItem.updatedData.id}</td></tr>
                            <tr><td className='LogInfoPropName'>Address:</td><td className='LogInfoPropValue'>{logItem.updatedData.address}</td></tr>
                            <tr><td className='LogInfoPropName'>Name:</td><td className='LogInfoPropValue'>{logItem.updatedData.name}</td></tr>
                            <tr><td className='LogInfoPropName'>Number:</td><td className='LogInfoPropValue'>{logItem.updatedData.number}</td></tr>
                            <tr><td className='LogInfoPropName'>Phone:</td><td className='LogInfoPropValue'>{logItem.updatedData.phone}</td></tr>
                            <tr><td className='LogInfoPropName'>Dni:</td><td className='LogInfoPropValue'>{logItem.updatedData.dni}</td></tr>
                            <tr><td className='LogInfoPropName'>Last Contact:</td><td className='LogInfoPropValue'>{logItem.updatedData.lastContact}</td></tr>
                            <tr><td className='LogInfoPropName'>Email:</td><td className='LogInfoPropValue'>{logItem.updatedData.email}</td></tr>
                            <tr><td className='LogInfoPropName'>Sale Date:</td><td className='LogInfoPropValue'>{logItem.updatedData.saleDate}</td></tr>
                            <tr><td className='LogInfoPropName'>Adviser:</td><td className='LogInfoPropValue'>{logItem.updatedData.adviser}</td></tr>
                            <tr><td className='LogInfoPropName'>Final Sale Price:</td><td className='LogInfoPropValue'>{logItem.updatedData.finalSalePrice}</td></tr>
                            <tr><td className='LogInfoPropName'>Reduction:</td><td className='LogInfoPropValue'>{logItem.updatedData.reduction}</td></tr>
                            <tr><td className='LogInfoPropName'>Particular:</td><td className='LogInfoPropValue'>{logItem.updatedData.particular}</td></tr>
                            <tr><td className='LogInfoPropName'>Real Estate:</td><td className='LogInfoPropValue'>{logItem.updatedData.realEstate}</td></tr>
                            <tr><td className='LogInfoPropName'>Fee:</td><td className='LogInfoPropValue'>{logItem.updatedData.fee}</td></tr>
                            <tr><td className='LogInfoPropName'>Observation:</td><td className='LogInfoPropValue'>{logItem.updatedData.observation}</td></tr>
                            <tr><td className='LogInfoPropName'>Tracing:</td><td className='LogInfoPropValue'>{logItem.updatedData.tracing}</td></tr>
                            <tr><td className='LogInfoPropName'>Last Update:</td><td className='LogInfoPropValue'>{logItem.updatedData.lastUpdate}</td></tr>
                            <tr><td className='LogInfoPropName'>Zone Id:</td><td className='LogInfoPropValue'>{logItem.updatedData.zoneId}</td></tr>
                        </>
                        }

                        {logItem.previousData && <>
                            <tr><td colSpan={2} className='LogInfoPropNameLine'>Previous Data [{logItem.previousData.lastUpdate}]</td></tr>
                            <tr><td className='LogInfoPropName'>Id:</td><td className='LogInfoPropValue'>{logItem.previousData.id}</td></tr>
                            <tr><td className='LogInfoPropName'>Address:</td><td className='LogInfoPropValue'>{logItem.previousData.address}</td></tr>
                            <tr><td className='LogInfoPropName'>Name:</td><td className='LogInfoPropValue'>{logItem.previousData.name}</td></tr>
                            <tr><td className='LogInfoPropName'>Number:</td><td className='LogInfoPropValue'>{logItem.previousData.number}</td></tr>
                            <tr><td className='LogInfoPropName'>Phone:</td><td className='LogInfoPropValue'>{logItem.previousData.phone}</td></tr>
                            <tr><td className='LogInfoPropName'>Dni:</td><td className='LogInfoPropValue'>{logItem.previousData.dni}</td></tr>
                            <tr><td className='LogInfoPropName'>Last Contact:</td><td className='LogInfoPropValue'>{logItem.previousData.lastContact}</td></tr>
                            <tr><td className='LogInfoPropName'>Email:</td><td className='LogInfoPropValue'>{logItem.previousData.email}</td></tr>
                            <tr><td className='LogInfoPropName'>Sale Date:</td><td className='LogInfoPropValue'>{logItem.previousData.saleDate}</td></tr>
                            <tr><td className='LogInfoPropName'>Adviser:</td><td className='LogInfoPropValue'>{logItem.previousData.adviser}</td></tr>
                            <tr><td className='LogInfoPropName'>Final Sale Price:</td><td className='LogInfoPropValue'>{logItem.previousData.finalSalePrice}</td></tr>
                            <tr><td className='LogInfoPropName'>Reduction:</td><td className='LogInfoPropValue'>{logItem.previousData.reduction}</td></tr>
                            <tr><td className='LogInfoPropName'>Particular:</td><td className='LogInfoPropValue'>{logItem.previousData.particular}</td></tr>
                            <tr><td className='LogInfoPropName'>Real Estate:</td><td className='LogInfoPropValue'>{logItem.previousData.realEstate}</td></tr>
                            <tr><td className='LogInfoPropName'>Fee:</td><td className='LogInfoPropValue'>{logItem.previousData.fee}</td></tr>
                            <tr><td className='LogInfoPropName'>Observation:</td><td className='LogInfoPropValue'>{logItem.previousData.observation}</td></tr>
                            <tr><td className='LogInfoPropName'>Tracing:</td><td className='LogInfoPropValue'>{logItem.previousData.tracing}</td></tr>
                            <tr><td className='LogInfoPropName'>Last Update:</td><td className='LogInfoPropValue'>{logItem.previousData.lastUpdate}</td></tr>
                            <tr><td className='LogInfoPropName'>Zone Id:</td><td className='LogInfoPropValue'>{logItem.previousData.zoneId}</td></tr>
                        </>
                        }
                    </table>


                    <div className="form-group">
                        <Link to={'/Admin/Logs'} className="btn btn-link">Voltar</Link>
                    </div>

                    {/* Id: {logItem.id}<br /> */}
                    {/* User: {logItem.userName} [{logItem.userId}]<br />
                    Event Type: {logItem.eventType}<br />
                    Event Method: {logItem.eventMethod}<br />
                    Event Result: {logItem.eventResult}<br /> */}
                    {/* {logItem.previousData.name}<br /> */}
                    {/* {logItem.previousData}<br />
                    {logItem.updatedData}<br /> */}
                    {/* <ul>
                        {Object.entries(logItem.previousData).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {value}
                            </li>
                        ))}
                    </ul> */}
                </div>
            }
        </div>

        // <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        //     <h1>Ver Log</h1>
        //     <div className="form-row">
        //         <div className="form-group col-12">
        //             <label>User Name</label>
        //             <label>{...register('userName')}</label>
        //             {/* <input name="logName" type="text" {...register('userName')} className={'form-control' + (errors.userName ? ' is-invalid' : '')} /> */}
        //             <div className="invalid-feedback">{errors.userName?.message}</div>
        //         </div>
        //     </div>
        //     <div className="form-group">
        //         <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
        //             {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
        //             Guardar
        //         </button>
        //         <Link to={isAddMode ? '/Admin/Logs' : '/Admin/Logs'} className="btn btn-link">Cancelar</Link>
        //     </div>
        // </form>
    );
}

export { LogsAddEdit };