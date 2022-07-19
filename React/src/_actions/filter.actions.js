import { history, useFetchWrapper } from '../_helpers';

export { useFilterActions };

function useFilterActions()
{
    const baseUrl = `${process.env.REACT_APP_API_URL}/filter`;
    const fetchWrapper = useFetchWrapper();

    return {
        create,
        getAll,
        getAllWithRegisters,
        getById,
        getByRegisterId,
        update,
        delete: _delete
    }

    function create(Filter)
    {
        return fetchWrapper.post(`${baseUrl}/create`, Filter);
    }

    function getAll()
    {
        return fetchWrapper.get(`${baseUrl}/GetAll`);
    }

    function getAllWithRegisters()
    {
        return fetchWrapper.get(`${baseUrl}/GetFilterRegistersAll`);
    }

    function getById(id)
    {
        return fetchWrapper.get(`${baseUrl}/GetById/${id}`);
    }

    function getByRegisterId(id)
    {
        return fetchWrapper.get(`${baseUrl}/GetByRegisterId/${id}`);
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
