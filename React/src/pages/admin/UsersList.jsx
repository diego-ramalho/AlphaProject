import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useUserActions, useRoleActions } from '../../_actions';

import UsersDropdown from '../../components/atoms/UsersDropdown'

// const UsersList = () =>
// {
//     return (
//       <>
//       Admin Users DropDown
//       <UsersDropdown />
//     </>
//     );
// };

// export {UsersList};

function UsersList()
{
    //const { path } = match;
    const path = '/AlphaProject/Admin/Users';
    const baseUrl = `${process.env.REACT_APP_API_URL}/user`;
    const [users, setUsers] = useState(null);

    const [rolesList, setRoles] = useState([]);

    const userActions = useUserActions();
    const roleActions = useRoleActions();

    useEffect(() =>
    {
        userActions.getAll().then(x => setUsers(x));
        userActions.getUsersRoles().then(x => { setRoles(x); console.log(x); });
        // const teste = fetch(`${baseUrl}/GetUserRoles`)
        //     .then(x => setUserRoles(x))
    }, []);

    function deleteUser(id)
    {
        setUsers(users.map(x =>
        {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userActions.delete(id).then(() =>
        {
            setUsers(users => users.filter(x => x.id !== id));
        });
    }





    return (
        <div>
            <h1>Users</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add User</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '35%' }}>Name</th>
                        <th style={{ width: '35%' }}>Email</th>
                        <th style={{ width: '20%' }}>Role</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{rolesList.filter(x => x.id === user.roleId).map(x => x.roleName)}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={user.isDeleting}>
                                    {user.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {users && !users.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { UsersList };