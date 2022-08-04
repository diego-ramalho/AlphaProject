import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//import { history } from '../../_helpers';
import { useChargesActions, useAlertActions } from '../_actions';

function EncargosView({ match })
{
    const { id } = useParams();
    const isAddMode = !id;

    const navigate = useNavigate();

    const chargesActions = useChargesActions();

    const [chargeItem, setCharges] = useState({});

    useEffect(() =>
    {
        if (!isAddMode)
        {
            // get user and set form fields
            chargesActions.getById(id).then(chargeItem =>
            {
                setCharges(chargeItem);
            });
        }
    }, []);

    return (
        <form>
            <h1>{isAddMode ? 'Add Charge' : 'Charge'}</h1>
            <div className="form-row">
                <div className="form-group col-12">
                    <div className="page-view-item-label col-md-12 col-sm-12">Charge</div>
                    <div className="page-view-item-value col-md-12 col-sm-12">{chargeItem.description}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-8 col-sm-12">
                    <div className="page-view-item-label col-md-12 col-sm-12">Value</div>
                    <div className="page-view-item-value col-md-12 col-sm-12">{chargeItem.value}</div>
                </div>
            </div>
            <div className="form-group">
                <button class="btn btn-primary" onClick={(evt) => { evt.preventDefault(); navigate(-1); }}>Back</button>
            </div>
        </form>
    );
}

export { EncargosView };