import React from 'react';
import { Route, Routes } from 'react-router-dom';

import UsersDropdown from '../../components/atoms/UsersDropdown'

import { history } from '../../_helpers';

import { UsersList } from './UsersList';
import { UsersAddEdit } from './UsersAddEdit';

function AdminUsers()
{
    return (
        <Routes history={history}>
            {/* <Route exact path={path} element={<UsersList />} />
            <Route path={`${path}/add`} element={<UsersAddEdit />} />
            <Route path={`${path}/edit/:id`} element={<UsersAddEdit />} /> */}

            {/* <Route exact path={path} component={UsersList} />
            <Route path={`${path}/add`} component={UsersAddEdit} />
            <Route path={`${path}/edit/:id`} component={UsersAddEdit} /> */}

            <Route exact path='/Admin/Users' element={<UsersList />} />
            <Route path='/Admin/Users/add' element={<UsersAddEdit />} />
            <Route path='/Admin/Users/edit/:id' element={<UsersAddEdit />} />
        </Routes>
    );
}

export default { AdminUsers };

// import React from 'react'
// import UsersDropdown from '../../components/atoms/UsersDropdown'

// const AdminUsers = () =>
// {
//     return (
//       <>
//       Admin Users DropDown
//       <UsersDropdown />
//     </>
//     );
// };

// export default AdminUsers;