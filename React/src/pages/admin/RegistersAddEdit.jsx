import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

// config
import appForm from '../../lang/resources.json';

import { useRegisterActions, useZoneActions, useFilterActions, useAlertActions } from '../../_actions';

import { useSelector } from 'react-redux';

function RegistersAddEdit({ match })
{
    const { id } = useParams();
    const isAddMode = !id;

    const navigate = useNavigate();

    const registerActions = useRegisterActions();
    const zoneActions = useZoneActions();
    const filterActions = useFilterActions();

    // form validation rules 
    // const validationSchema = Yup.object().shape({
    //     address: Yup.string()
    //         .required('Direccion obligatoria'),
    //     name: Yup.string()
    //         .required('Puerta obligatoria'),
    //     number: Yup.string()
    //         .required('Puerta obligatoria'),
    //     observation: Yup.string(),
    //     phone: Yup.string(),
    //     dni: Yup.string(),
    //     lastContact: Yup.string(),
    //     email: Yup.string(),
    //     saleDate: Yup.string(),
    //     adviser: Yup.string(),
    //     finalSalePrice: Yup.string(),
    //     reduction: Yup.string(),
    //     particular: Yup.string(),
    //     realEstate: Yup.string(),
    //     fee: Yup.string(),
    //     tracing: Yup.string(),
    //     zoneId: Yup.string()
    //         .required('Zona obligatoria'),
    //     filterList: Yup.array()
    // });

    // functions to build form returned by useForm() hook
    // const { register, handleSubmit, reset, setValue, formState: { errors }, formState } = useForm({
    //     resolver: yupResolver(validationSchema)
    // });

    const { register, handleSubmit, reset, setValue, formState: { errors }, formState } = useForm();

    var pageCode = useSelector(state => state.previousPageCode);
    var pagePath = useSelector(state => state.previousPagePath);

    function onSubmit(data)
    {
        return isAddMode
            ? createRegister(data)
            : updateRegister(id, data);
    }

    function createRegister(data)
    {
        if (data.filterList === false) data.filterList = [];

        return registerActions.create(data)
            .then(() =>
            {
                useAlertActions.success('Registro agregado', { keepAfterRouteChange: true });
                //navigate('/Admin/Registers/');
                //navigate('/Taraturas');
                let redir = pagePath !== "" ? pagePath : '/Taraturas'
                navigate(redir);
            })
            .catch(useAlertActions.error);
    }

    function updateRegister(id, data)
    {
        if (data.filterList === false) data.filterList = [];

        return registerActions.update(id, data)
            .then(() =>
            {
                useAlertActions.success('Registro actualizado', { keepAfterRouteChange: true });
                //navigate('/Admin/Registers/');
                //navigate('/Taraturas');
                let redir = pagePath !== "" ? pagePath : '/Taraturas'
                navigate(redir);
            })
            .catch(useAlertActions.error);
    }

    const [registerItem, setRegister] = useState({});
    const [filterOptions, setFilterOptions] = useState([]);
    //const [filterChecked, setFilterChecked] = useState([]);
    const [initialFilters, setInitialFilters] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [zoneoptions, setZoneOptions] = useState([]);

    const [isPageInitialLoad, setIsPageInitialLoad] = useState(true);
    const [chkPisosVacios, setChkPisosVacios] = useState(false); //1
    const [chkPisosInvestigados, setChkPisosInvestigados] = useState(false); //2
    const [chkPisosVendidos, setChkPisosVendidos] = useState(false); //3
    const [chkPisosAlquilados, setChkPisosAlquilados] = useState(false); //4
    const [chkInformadores, setChkInformadores] = useState(false); //5
    const [chkNoticias, setChkNoticias] = useState(false); //6
    const [chkEncargos, setChkEncargos] = useState(false); //7

    const handleCheckbox = (event) =>
    {
        const id = event.target.id;
        const isChecked = event.target.checked;

        switch (id)
        {
            case "1": setChkPisosVacios(isChecked); break;
            case "2": setChkPisosInvestigados(isChecked); break;
            case "3": setChkPisosVendidos(isChecked); break;
            case "4": setChkPisosAlquilados(isChecked); break;
            case "5": setChkInformadores(isChecked); break;
            case "6": setChkNoticias(isChecked); break;
            case "7": setChkEncargos(isChecked); break;
            default: break;
        }
    }

    useEffect(() =>
    {
        if (!isAddMode && isPageInitialLoad)
        {
            filterActions.getByRegisterId(id).then(x =>
            {
                setInitialFilters(x);
                setSelectedFilters(x);
                console.log(x);
                setIsPageInitialLoad(false);

                x.forEach(function (item, index)
                {
                    //setCheckboxes(checkboxes => checkboxes.map((it, idx) => idx === it ? !item : item))

                    switch (item.toString())
                    {
                        case "1": setChkPisosVacios(true); break;
                        case "2": setChkPisosInvestigados(true); break;
                        case "3": setChkPisosVendidos(true); break;
                        case "4": setChkPisosAlquilados(true); break;
                        case "5": setChkInformadores(true); break;
                        case "6": setChkNoticias(true); break;
                        case "7": setChkEncargos(true); break;
                        default: break;
                    }
                    //console.log("filters: " + item, index)
                });
            });
        }
    }, [isPageInitialLoad]);

    // const [checkboxes, setCheckboxes] = useState([false, false, false, false, true, false, false]);
    //let checkboxes = [false, false, false, false, false, false, false];

    //let filterChecked = [];
    // let teste = [];
    // filterActions.getByRegisterId(id).then(x => { teste = x; });
    //filterActions.getByRegisterId(id).then(x => { setInitialFilters(x); setSelectedFilters(x); console.log(x); });

    const handleChkboxChange = (event) =>
    {
        const target = event.target;
        var value = target.value;
        if (!target.checked)
        {
            const name = event.target.getAttribute("filterList")
            setSelectedFilters(selectedFilters.filter(item => item !== value));
            //setInitialFilters(initialFilters.filter(value));
            //teste = initialFilters.filter(item => item !== parseInt(value));
            //setInitialFilters(initialFilters.filter(item => item !== parseInt(value)));
            //console.log(parseInt(teste));
        } else
        {
            const name = event.target.getAttribute("filterList")
            setSelectedFilters(...selectedFilters, parseInt(value));
            //setInitialFilters(...initialFilters, parseInt(value));
            //teste.push(value);
            //console.log(teste);
        }
    }

    const [formOption, setFormOption] = useState("");
    // const handlerRadioChange = (event) =>
    // {
    // const target = event.target;
    // var value = target.value;

    let getAddressTitle = () =>
    {
        switch (pageCode)
        {
            case "NO": return "Noticia";
            case "EN": return "Encargo";
            case "IN": return "Informador";
            default: return "Direccion";
        }
    }

    let getTitle = () =>
    {
        switch (pageCode)
        {
            case "NO": return "Noticias";
            case "EN": return "Encargos";
            case "IN": return "Informadores";
            case "PI": return "Pisos Investigados";
            case "PA": return "Pisos Alquilados";
            case "PVa": return "Pisos Vacios";
            case "PVe": return "Pisos Vendidos";
            default: return "Taratura";
        }
    }

    let pageTitle = getTitle(); //"Taratura";

    //setFormOption(value);


    if (document.querySelector('form .form-group .form-control'))
    {
        //document.querySelector('.NO, .EN, .IN, .PI, .PA, .PVa, .PVe').style.display = 'none';
        const matches = document.querySelectorAll("form .form-group .form-control");
        matches.forEach(myFunction);
        function myFunction(item, index)
        {
            //teste += index + ": " + item.getAttribute("name") + "\n";

            //teste += appForm.pt.form.taraturas.address;

            let nameAtt = item.getAttribute("name");

            if (appForm.pt.form.taraturas[item.getAttribute("name")].includes(pageCode) || pageCode === "TA")
            {
                item.style.removeProperty('display');
            } else
            {
                item.parentElement.style.display = 'none';
            }



            // if(appForm.pt.form.taraturas.nameAtt.includes(pageCode)){
            //     teste += item.getAttribute("name") + "\n";
            // }
        }
    }

    useEffect(() =>
    {
        filterActions.getAll().then(x => { setFilterOptions(x); console.log(x); });
        zoneActions.getAll().then(x => setZoneOptions(x));

        if (!isAddMode)
        {
            filterActions.getByRegisterId(id).then(x =>
            {
                setInitialFilters(x);
                setSelectedFilters(x);
                console.log(x);

                // checkboxes.forEach(function (item, index)
                // {
                //     if (x.includes(index + 1))
                //     {
                //         checkboxes[index] = true;
                //     }
                //     //checkboxes.map((item) => it === item-1 ? item : !item)
                //     // var teste = checkboxes[item];
                //     // setCheckboxes(checkboxes => checkboxes.map((it, idx) => idx === item ? item : !item))
                //     // console.log("filters: " + item, index)
                // });

                // x.forEach(function (item, index) {
                //     setCheckboxes(checkboxes => checkboxes.map((it, idx) => idx === it ? !item : item))
                //     console.log("filters: " + item, index)
                //   });

                // x.forEach(function (item, index) {
                //     setCheckboxes(checkboxes => checkboxes.map((item, idx) => idx === index ? !item : item))
                //     console.log("filters: " + item, index)
                //   });
            });

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
        <form onSubmit={ handleSubmit(onSubmit) } onReset={reset}>
            {/* <h1>{isAddMode ? 'Agregar Taratura' : 'Editar Taratura'}</h1> */}
            <h3 className="PageContentTitle">{isAddMode ? 'Agregar ' + pageTitle : 'Editar ' + pageTitle}</h3>

            {/* {teste} */}

            {/* <div className="PageContentTitle" style={{ textAlign: "left" }}>
                <input id="z" onClick={handlerRadioChange} style={{ float: "left;", clear: "none;", marginRight: "5px", marginLeft: "20px" }} type="radio" value="0" name="group2" />
                <label for="a">Nenhum</label>
                <input id="a" onClick={handlerRadioChange} style={{ float: "left;", clear: "none;", marginRight: "5px", marginLeft: "20px" }} type="radio" value="5" name="group2" />
                <label for="z">Informadores</label>
                <input id="x" onClick={handlerRadioChange} style={{ float: "left;", clear: "none;", marginRight: "5px", marginLeft: "20px" }} type="radio" value="6" name="group2" />
                <label for="x">Noticias</label>
                <input id="y" onClick={handlerRadioChange} style={{ float: "left;", clear: "none;", marginRight: "5px", marginLeft: "20px " }} type="radio" value="7" name="group2" />
                <label for="y">Encargos</label>
                <br />
            </div> */}

            <div className="form-row">
                <div className="form-group col-12">
                    <label>{getAddressTitle()}</label>
                    <input name="address" type="text" {...register('address', { required: true })} className={'form-control' + (errors.address ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.address && <p>campo obligatorio</p>}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Nombre y Apellidos</label>
                    <input name="name" type="text" {...register('name', { required: true })} className={'form-control' + (errors.name ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.name && <p>campo obligatorio</p>}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-4 col-sm-12">
                    <label>Puerta</label>
                    <input name="number" type="text" {...register('number', { required: true })} className={'form-control' + (errors.number ? ' is-invalid' : '')} />
                    <div className="invalid-feedback">{errors.number && <p>campo obligatorio</p>}</div>
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
                    <select name="zoneId" {...register('zoneId', { required: true })} className={'form-control' + (errors.zoneId ? ' is-invalid' : '')}>
                        {isAddMode ? <option value="">- Seleccione una opción -</option> : ''}
                        {zoneoptions.map(option => (
                            <option key={option.zoneName} value={option.id}>
                                {option.zoneName}
                            </option>
                        ))}
                    </select>
                    <div className="invalid-feedback">{errors.zoneId && <p>campo obligatorio</p>}</div>
                </div>
            </div>
            <div className="form-row checkbox-group">
                <label className="col-sm-12">Filtros</label>
                {/* <div className="form-group col-sm-12 checkbox-group"> */}
                {/* <select name="filterId" {...register('filterId')} className={'form-control' + (errors.filterId ? ' is-invalid' : '')}>
                        {Array.from(filteroptions).map(option => (
                            <option key={option.filterName} value={option.id}>
                                {option.filterName}
                            </option>
                        ))}
                    </select> */}
                <div className="form-group col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <input type="checkbox" checked={chkPisosVacios} {...register('filterList')} id="1" name="filterList" onChange={handleCheckbox} key={"filter-1"} value={"1"}></input>
                    <label for={"filter-1"}>Pisos Vacios</label>
                </div>
                <div className="form-group col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <input type="checkbox" checked={chkPisosInvestigados} {...register('filterList')} id="2" name="filterList" onChange={handleCheckbox} key={"filter-2"} value={"2"}></input>
                    <label for={"filter-2"}>Pisos Investigados</label>
                </div>
                <div className="form-group col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <input type="checkbox" checked={chkPisosVendidos} {...register('filterList')} id="3" name="filterList" onChange={handleCheckbox} key={"filter-3"} value={"3"}></input>
                    <label for={"filter-3"}>Pisos Vendidos</label>
                </div>
                <div className="form-group col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <input type="checkbox" checked={chkPisosAlquilados} {...register('filterList')} id="4" name="filterList" onChange={handleCheckbox} key={"filter-4"} value={"4"}></input>
                    <label for={"filter-4"}>Pisos Alquilados</label>
                </div>
                <div className="form-group col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <input type="checkbox" checked={chkInformadores} {...register('filterList')} id="5" name="filterList" onChange={handleCheckbox} key={"filter-5"} value={"5"}></input>
                    <label for={"filter-5"}>Informadores</label>
                </div>
                <div className="form-group col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <input type="checkbox" checked={chkNoticias} {...register('filterList')} id="6" name="filterList" onChange={handleCheckbox} key={"filter-6"} value={"6"}></input>
                    <label for={"filter-6"}>Noticias</label>
                </div>
                <div className="form-group col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <input type="checkbox" checked={chkEncargos} {...register('filterList')} id="7" name="filterList" onChange={handleCheckbox} key={"filter-7"} value={"7"}></input>
                    <label for={"filter-7"}>Encargos</label>
                </div>


                {/* {filterOptions.map(option => (
                        <> */}
                {/* <input type="checkbox" checked={initialFilters.indexOf(option.filterName) > 0 || selectedFilters.indexOf(option.filterName) > 0 ? true : false} {...register('filterList')} id={option.id} name="filterList" onChange={handleChkboxChange} key={"filter-" + option.id} value={option.id}></input> */}
                {/* <input type="checkbox" checked={initialFilters.indexOf(option.id) >= 0 || selectedFilters.indexOf(option.id) > 0 ? true : false} {...register('filterList')} id={option.id} name="filterList" onChange={handleChkboxChange} key={"filter-" + option.id} value={option.id}></input> */}
                {/* <input type="checkbox" checked={checkboxes[option.id]} {...register('filterList')} id={option.id} name="filterList" onChange={handleChkboxChange} key={"filter-" + option.id} value={option.id}></input> */}
                {/* <label for={"filter-" + option.id}>{option.filterName}</label> */}
                {/* {initialFilters.map(initial => (initial === option.id ? <Icon.CheckSquareFill style={{ color: "#50C878" }} className='FontAwesomeIcon' /> : ""))}
                            <br />
                        </>
                    ))} */}
                {/* <Icon.InfoCircleFill style={{ color: "#2554C7" }} className='FontAwesomeIcon' /> Los filtros actuales están marcados con <Icon.CheckSquareFill style={{ color: "#50C878" }} className='FontAwesomeIcon' /> . Deje todo sin marcar para mantenerlos o elija filtros nuevamente. */}
                {/* </div> */}
            </div>
            <div className="form-row">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Guardar
                </button>
                {/* <Link to={isAddMode ? '/Admin/Registers' : '/Admin/Registers'} className="btn btn-link">Cancelar</Link> */}
                {/* <Link to={isAddMode ? '/Taraturas' : '/Taraturas'} className="btn btn-link">Cancelar</Link> */}
                <Link to={pagePath !== "" ? pagePath : '/Taraturas'} className="btn btn-link">Cancelar</Link>

            </div>
        </form>
    );
}

export { RegistersAddEdit };