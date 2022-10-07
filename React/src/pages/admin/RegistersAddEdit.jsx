import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import * as Icon from 'react-bootstrap-icons';

import { history } from '../../_helpers';
import { useRegisterActions, useZoneActions, useFilterActions, useAlertActions } from '../../_actions';
import { color } from '@mui/system';

function RegistersAddEdit({ match })
{
    const { id } = useParams();
    const isAddMode = !id;

    const navigate = useNavigate();

    const registerActions = useRegisterActions();
    const zoneActions = useZoneActions();
    const filterActions = useFilterActions();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        address: Yup.string()
            .required('Direccion obligatoria'),
        name: Yup.string()
            .required('Puerta obligatoria'),
        number: Yup.string()
            .required('Puerta obligatoria'),
        observation: Yup.string(),
        phone: Yup.string(),
        dni: Yup.string(),
        lastContact: Yup.string(),
        email: Yup.string(),
        saleDate: Yup.string(),
        adviser: Yup.string(),
        finalSalePrice: Yup.string(),
        reduction: Yup.string(),
        particular: Yup.string(),
        realEstate: Yup.string(),
        fee: Yup.string(),
        tracing: Yup.string(),
        zoneId: Yup.string()
            .required('Zona obligatoria'),
        filterList: Yup.array()
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, formState: { errors }, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data)
    {
        return isAddMode
            ? createRegister(data)
            : updateRegister(id, data);
    }

    function createRegister(data)
    {
        return registerActions.create(data)
            .then(() =>
            {
                useAlertActions.success('Registro agregado', { keepAfterRouteChange: true });
                //navigate('/Admin/Registers/');
                navigate('/Taraturas');
            })
            .catch(useAlertActions.error);
    }

    function updateRegister(id, data)
    {
        return registerActions.update(id, data)
            .then(() =>
            {
                useAlertActions.success('Registro actualizado', { keepAfterRouteChange: true });
                //navigate('/Admin/Registers/');
                navigate('/Taraturas');
            })
            .catch(useAlertActions.error);
    }

    const [isPageInitialLoad, setIsPageInitialLoad] = useState(true);
    const [registerItem, setRegister] = useState({});
    const [filterOptions, setFilterOptions] = useState([]);
    const [filterChecked, setFilterChecked] = useState([]);
    const [initialFilters, setInitialFilters] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [zoneoptions, setZoneOptions] = useState([]);


    const handleChkboxChange = (event) =>
    {
        const target = event.target;
        var value = target.value;
        if (!target.checked)
        {
            const name = event.target.getAttribute("filterList")
            setSelectedFilters(selectedFilters.filter(item => item !== value));
            //setInitialFilters(initialFilters.filter(item => item !== value));
        } else
        {
            const name = event.target.getAttribute("filterList")
            setSelectedFilters(...selectedFilters, value);
            //setInitialFilters(...initialFilters, value);
        }
    }

    useEffect(() =>
    {
        filterActions.getAll().then(x => { setFilterOptions(x); console.log(x); });
        zoneActions.getAll().then(x => setZoneOptions(x));

        if (!isAddMode)
        {
            filterActions.getByRegisterId(id).then(x => { setInitialFilters(x); setSelectedFilters(x); console.log(x); });

            // get user and set form fields
            registerActions.getById(id).then(registerItem =>
            {
                const fields = ['address', 'name', 'number', 'observation', 'phone', 'dni', 'lastContact', 'email', 'saleDate', 'adviser', 'finalSalePrice', 'reduction', 'particular', 'realEstate', 'fee', 'tracing', 'zoneId'];
                fields.forEach(field => setValue(field, registerItem[field], false));
                setRegister(registerItem);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Agregar Taratura' : 'Editar Taratura'}</h1>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Direccion</label>
                    <input name="address" type="text" {...register('address')} className={'form-control' + (errors.address ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.address?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Nombre y Apellidos</label>
                    <input name="name" type="text" {...register('name')} className={'form-control' + (errors.name ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-4 col-sm-12">
                    <label>Puerta</label>
                    <input name="number" type="text" {...register('number')} className={'form-control' + (errors.number ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.number?.message}</div>
                </div>
                <div className="form-group col-md-8 col-sm-12">
                    <label>Telefono</label>
                    <input name="phone" type="text" {...register('phone')} className={'form-control' + (errors.phone ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.phone?.message}</div>
                </div>
            </div>



            <div className="form-row">
                <div className="form-group col-md-4 col-sm-12">
                    <label>DNI</label>
                    <input name="dni" type="text" {...register('dni')} className={'form-control' + (errors.dni ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.dni?.message}</div>
                </div>
                <div className="form-group col-md-8 col-sm-12">
                    <label>Fecha Último Contacto</label>
                    <input name="lastContact" type="text" {...register('lastContact')} className={'form-control' + (errors.lastContact ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.lastContact?.message}</div>
                </div>
                <div className="form-group col-md-12 col-sm-12">
                    <label>Email</label>
                    <input name="email" type="text" {...register('email')} className={'form-control' + (errors.email ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>




            <div className="form-row">
                <div className="form-group col-md-6 col-sm-12">
                    <label>Fecha Venta</label>
                    <input name="saleDate" type="text" {...register('saleDate')} className={'form-control' + (errors.saleDate ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.saleDate?.message}</div>
                </div>
                <div className="form-group col-md-6 col-sm-12">
                    <label>Precio Final Venta</label>
                    <input name="finalSalePrice" type="text" {...register('finalSalePrice')} className={'form-control' + (errors.finalSalePrice ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.finalSalePrice?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-4 col-sm-12">
                    <label>Particular</label>
                    <input name="particular" type="text" {...register('particular')} className={'form-control' + (errors.particular ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.particular?.message}</div>
                </div>
                <div className="form-group col-md-4 col-sm-12">
                    <label>Inmobiliaria</label>
                    <input name="realEstate" type="text" {...register('realEstate')} className={'form-control' + (errors.realEstate ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.realEstate?.message}</div>
                </div>
                <div className="form-group col-md-4 col-sm-12">
                    <label>Rebaja</label>
                    <input name="reduction" type="text" {...register('reduction')} className={'form-control' + (errors.reduction ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.reduction?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6 col-sm-12">
                    <label>Asesor</label>
                    <input name="adviser" type="text" {...register('adviser')} className={'form-control' + (errors.adviser ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.adviser?.message}</div>
                </div>
                <div className="form-group col-md-6 col-sm-12">
                    <label>Honorarios</label>
                    <input name="fee" type="text" {...register('fee')} className={'form-control' + (errors.fee ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.fee?.message}</div>
                </div>
            </div>






            <div className="form-row">
                <div className="form-group col-12">
                    <label>Observaciones</label>
                    <textarea name="observation" rows={5} {...register('observation')} className={'form-control' + (errors.observation ? ' is-invalid' : '')} wrap="soft"></textarea>
                    {/* <input name="observation" type="text" {...register('observation')} className={'form-control' + (errors.observation ? ' is-invalid' : '')} /> */}
                    <div className="invalid-feedback">{errors.observation?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Seguimiento</label>
                    <textarea name="tracing" rows={5} {...register('tracing')} className={'form-control' + (errors.tracing ? ' is-invalid' : '')} wrap="soft"></textarea>
                    <div className="invalid-feedback">{errors.tracing?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-4 col-sm-12">
                    <label>Zona</label>
                    <select name="zoneId" {...register('zoneId')} className={'form-control' + (errors.zoneId ? ' is-invalid' : '')}>
                        {isAddMode ? <option value="">- Seleccione una opción -</option> : ''}
                        {zoneoptions.map(option => (
                            <option key={option.zoneName} value={option.id}>
                                {option.zoneName}
                            </option>
                        ))}
                    </select>
                    <div className="invalid-feedback">{errors.zoneId?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-sm-12 checkbox-group">
                    {/* <select name="filterId" {...register('filterId')} className={'form-control' + (errors.filterId ? ' is-invalid' : '')}>
                        {Array.from(filteroptions).map(option => (
                            <option key={option.filterName} value={option.id}>
                                {option.filterName}
                            </option>
                        ))}
                    </select> */}
                    <label>Filtros</label><br />
                    {filterOptions.map(option => (
                        <>
                            {/* <input type="checkbox" checked={initialFilters.indexOf(option.filterName) > 0 || selectedFilters.indexOf(option.filterName) > 0 ? true : false} {...register('filterList')} id={option.id} name="filterList" onChange={handleChkboxChange} key={"filter-" + option.id} value={option.id}></input> */}
                            <input type="checkbox" {...register('filterList')} id={option.id} name="filterList" onChange={handleChkboxChange} key={"filter-" + option.id} value={option.id}></input>
                            <label for={"filter-" + option.id}>{option.filterName}</label>
                            {initialFilters.map(initial => (initial === option.filterName ? <Icon.CheckSquareFill style={{ color: "#50C878" }} className='FontAwesomeIcon' /> : ""))}
                            <br />
                        </>
                    ))}
                    <Icon.InfoCircleFill style={{ color: "#2554C7" }} className='FontAwesomeIcon' /> Los filtros actuales están marcados con <Icon.CheckSquareFill style={{ color: "#50C878" }} className='FontAwesomeIcon' /> . Deje todo sin marcar para mantenerlos o elija filtros nuevamente.
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Guardar
                </button>
                {/* <Link to={isAddMode ? '/Admin/Registers' : '/Admin/Registers'} className="btn btn-link">Cancelar</Link> */}
                <Link to={isAddMode ? '/Taraturas' : '/Taraturas'} className="btn btn-link">Cancelar</Link>
            </div>
        </form>
    );
}

export { RegistersAddEdit };