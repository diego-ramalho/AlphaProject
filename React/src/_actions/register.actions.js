import { history, useFetchWrapper } from '../_helpers';

import { useDispatch, useSelector } from 'react-redux';

export { useRegisterActions };

function useRegisterActions()
{
    const baseUrl = `${process.env.REACT_APP_API_URL}/register`;
    const fetchWrapper = useFetchWrapper();
    const count = useSelector(state => state.zone);

    return {
        create,
        getAll,
        getAllByFilter,
        getById,
        update,
        delete: _delete
    }

    function create(Register)
    {
        return fetchWrapper.post(`${baseUrl}/create`, Register);
    }

    function getAll()
    {
        return fetchWrapper.get(`${baseUrl}/GetAll`);
    }

    function getAllByFilter(id)
    {
        return fetchWrapper.get(`${baseUrl}/GetAllByFilter?filterId=${id}`);
    }

    function getById(id)
    {
        return fetchWrapper.get(`${baseUrl}/GetById/${id}`);
    }

    function update(id, params)
    {
        return fetchWrapper.put(`${baseUrl}?id=${id}`, params);
    }

    // prefixed with underscored because delete is a reserved word in javascript
    function _delete(id)
    {
        return fetchWrapper.delete(`${baseUrl}?id=${id}`);
    }
}
