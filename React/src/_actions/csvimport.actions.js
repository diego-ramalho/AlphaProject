import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';

import { useDispatch, useSelector } from 'react-redux';
//import { updateZone } from '../store/zoneSlice';

import { history, useFetchWrapper } from '../_helpers';
import { authAtom, usersAtom, userAtom } from '../_state';

export { useCsvImportActions };

function useCsvImportActions()
{
    const baseUrl = `${process.env.REACT_APP_API_URL}/csvimport`;
    const navigate = useNavigate();
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);
    const setUsers = useSetRecoilState(usersAtom);
    const setUser = useSetRecoilState(userAtom);
    const dispatch = useDispatch();

    return {
        importfile
    }

    function importfile({ formData })
    {
        return fetchWrapper.post(`${baseUrl}/importcsv`, { formData })
            .then(user =>
            {

            });
    }
}
