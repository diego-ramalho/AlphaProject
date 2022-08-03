import { history, useFetchWrapper } from '../_helpers';

export { useNewsActions };

function useNewsActions()
{
    const baseUrl = `${process.env.REACT_APP_API_URL}/news`;
    const fetchWrapper = useFetchWrapper();

    return {
        create,
        getAll,
        getById,
        update,
        delete: _delete
    }

    function create(News)
    {
        return fetchWrapper.post(`${baseUrl}/create`, News);
    }

    function getAll()
    {
        return fetchWrapper.get(`${baseUrl}/GetAll`);
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
