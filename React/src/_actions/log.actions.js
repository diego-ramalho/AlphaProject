import { history, useFetchWrapper } from '../_helpers';

export { useLogActions };

function useLogActions()
{
    const baseUrl = `${process.env.REACT_APP_API_URL}/logs`;
    const fetchWrapper = useFetchWrapper();

    return {
        getAll,
        getById
    }

    function getAll()
    {
        return fetchWrapper.get(`${baseUrl}/GetAll`);
    }

    function getById(id)
    {
        return fetchWrapper.get(`${baseUrl}/GetById/${id}`);
    }
}
