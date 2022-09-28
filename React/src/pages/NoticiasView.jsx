import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//import { history } from '../../_helpers';
import { useNewsActions, useAlertActions } from '../_actions';

function NoticiasView({ match })
{
    const { id } = useParams();
    const isAddMode = !id;

    const navigate = useNavigate();

    const chargesActions = useNewsActions();

    const [newsItem, setNews] = useState({});

    useEffect(() =>
    {
        if (!isAddMode)
        {
            // get user and set form fields
            chargesActions.getById(id).then(newsItem =>
            {
                setNews(newsItem);
            });
        }
    }, []);

    return (
        <form>
            <h1>{isAddMode ? 'Agregar Noticias' : 'Noticias'}</h1>
            <div className="form-row">
                <div className="form-group col-12">
                    <div className="page-view-item-label col-md-12 col-sm-12">Titulo</div>
                    <div className="page-view-item-value col-md-12 col-sm-12">{newsItem.title}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <div className="page-view-item-label col-md-12 col-sm-12">Enlace</div>
                    <div className="page-view-item-value col-md-12 col-sm-12"><a href={newsItem.link} target="_blank">{newsItem.link}</a></div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-8 col-sm-12">
                    <div className="page-view-item-label col-md-12 col-sm-12">Descripción</div>
                    <div className="page-view-item-value col-md-12 col-sm-12">{newsItem.description}</div>
                </div>
            </div>
            <div className="form-group">
                <button class="btn btn-primary" onClick={(evt) => { evt.preventDefault(); navigate(-1); }}>Retroceder</button>
            </div>
        </form>
    );
}

export { NoticiasView };