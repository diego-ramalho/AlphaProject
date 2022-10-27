import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useNewsActions } from '../../_actions';

function NewsList()
{
    //const { path } = match;
    const path = '/Admin/News';
    const baseUrl = `${process.env.REACT_APP_API_URL}/news`;
    const [news, setNews] = useState(null);

    const newsActions = useNewsActions();

    useEffect(() =>
    {
        newsActions.getAll().then(x => setNews(x));
    }, []);

    function deleteNews(id)
    {
        setNews(news.map(x =>
        {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        newsActions.delete(id).then(() =>
        {
            setNews(news => news.filter(x => x.id !== id));
        });
    }


    return (
        <div>
            <h1>Noticias</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Agregar Noticias</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '90%' }}>Noticias</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {news && news.map(news =>
                        <tr key={news.id}>
                            <td>{news.link}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${news.id}`} className="btn btn-sm btn-primary mr-1">Editar</Link>
                            <button onClick={() => deleteNews(news.id)} className="btn btn-sm btn-danger btn-delete-news" disabled={news.isDeleting}>
                                {news.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>Eliminar</span>
                                }
                            </button>
                        </td>
                        </tr>
                    )}
                {!news &&
                    <tr>
                        <td colSpan="4" className="text-center">
                            <div className="spinner-border spinner-border-lg align-center"></div>
                        </td>
                    </tr>
                }
                {news && !news.length &&
                    <tr>
                        <td colSpan="4" className="text-center">
                            <div className="p-2">Sin noticias para mostrar</div>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
        </div >
    );
}

export { NewsList };