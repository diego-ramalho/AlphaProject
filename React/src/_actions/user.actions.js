import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';

import { history, useFetchWrapper } from '../_helpers';
import { authAtom, usersAtom, userAtom } from '../_state';

export { useUserActions };

function useUserActions()
{
    const baseUrl = `${process.env.REACT_APP_API_URL}/user`;
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);
    const setUsers = useSetRecoilState(usersAtom);
    const setUser = useSetRecoilState(userAtom);

    return {
        login,
        logout,
        create,
        getAll,
        getUsersRoles,
        getById,
        update,
        delete: _delete,
        resetUsers: useResetRecoilState(usersAtom),
        resetUser: useResetRecoilState(userAtom)
    }

    function login({ email, password })
    {
        return fetchWrapper.post(`${baseUrl}/login`, { email, password })
            .then(user =>
            {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                setAuth(user);

                // get return url from location state or default to home page
                const { from } = history.location.state || { from: { pathname: '/' } };
                window.location.href = '/AlphaProject/home';
                history.push(from);
            });
    }

    function logout()
    {
        // remove user from local storage, set auth state to null and redirect to login page
        localStorage.removeItem('user');
        setAuth(null);
        history.push('/AlphaProject/');
        window.location.href = '/AlphaProject/';
    }

    function create(user)
    {
        return fetchWrapper.post(`${baseUrl}/create`, user);
    }

    function getAll()
    {
        //return fetchWrapper.get(`${baseUrl}/GetUsers`).then(setUsers);
        return fetchWrapper.get(`${baseUrl}/GetUsers`);
    }

    function getUsersRoles()
    {
        return fetchWrapper.get(`${baseUrl}/GetUserRoles`);
    }

    function getById(id)
    {
        //return fetchWrapper.get(`${baseUrl}/${id}`).then(setUser);
        return fetchWrapper.get(`${baseUrl}/${id}`);
    }

    function update(id, params)
    {
        return fetchWrapper.put(`${baseUrl}?id=${id}`, params);
        // return fetchWrapper.put(`${baseUrl}/${id}`, params)
        //     .then(x => {
        //         // update stored user if the logged in user updated their own record
        //         if (id === auth?.id) {
        //             // update local storage
        //             const user = { ...auth, ...params };
        //             localStorage.setItem('user', JSON.stringify(user));

        //             // update auth user in recoil state
        //             setAuth(user);
        //         }
        //         return x;
        //     });
    }

    // prefixed with underscored because delete is a reserved word in javascript
    function _delete(id)
    {
        return fetchWrapper.delete(`${baseUrl}?id=${id}`);
        // setUsers(users => users.map(x => {
        //     // add isDeleting prop to user being deleted
        //     if (x.id === id) 
        //         return { ...x, isDeleting: true };

        //     return x;
        // }));

        // return fetchWrapper.delete(`${baseUrl}/${id}`)
        //     .then(() => {
        //         // remove user from list after deleting
        //         setUsers(users => users.filter(x => x.id !== id));

        //         // auto logout if the logged in user deleted their own record
        //         if (id === auth?.id) {
        //             logout();
        //         }
        //     });
    }
}
